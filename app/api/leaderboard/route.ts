import { NextResponse } from 'next/server';

const POCKETBASE_URL = process.env.POCKETBASE_URL;

export async function GET() {
  try {
    // Use UTC consistently for date calculations to avoid timezone issues in deployment
    const now = new Date();
    
    // Get today in UTC (start of day)
    const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
    

    // But also consider that scores might be stored in different timezones
    // So let's be more inclusive - go back 24 hours from UTC today to catch scores from any timezone
    const yesterdayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 0, 0, 0, 0));
    
    // Use the broader range to ensure we don't miss scores due to timezone differences
    const todayISO = yesterdayUTC.toISOString();

    // Use standard ISO format that PocketBase expects
    const todayFilter = `created >= "${todayISO}"`;
    const searchQuery = `${POCKETBASE_URL}/api/collections/scores/records?filter=${encodeURIComponent(todayFilter)}&sort=-score,-created&perPage=100`;
    console.log('Search query:', searchQuery);
    const allScoresRes = await fetch(searchQuery);

    if (!allScoresRes.ok) {
      const error = await allScoresRes.json();
      console.error('PocketBase error (all scores):', error);
      console.error('Filter used:', todayFilter);
      return NextResponse.json({ error: 'Failed to fetch scores' }, { status: allScoresRes.status });
    }

    const allScoresData = await allScoresRes.json();
    
    // Debug logging for all scores from the query
    console.log('Fetched scores:', {
      totalItems: allScoresData.items?.length || 0,
      items: allScoresData.items?.map((item: any) => ({
        id: item.id,
        name: item.name,
        score: item.score,
        created: item.created,
        dateOnly: new Date(item.created).toISOString().split('T')[0]
      })) || []
    });

    // Filter scores that have names AND are from today (current UTC date)
    const todayDateString = todayUTC.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    const scoresWithNames = (allScoresData.items || []).filter((item: any) => {
      const hasName = item.name && item.name.trim() !== '';
      
      // Check if the score is from today (UTC date)
      const scoreDate = new Date(item.created).toISOString().split('T')[0];
      const isFromToday = scoreDate === todayDateString;
      
      return hasName && isFromToday;
    });

    console.log('Final filtered scores:', {
      totalWithNames: scoresWithNames.length,
      todayDateString,
      scores: scoresWithNames.map((item: any) => ({
        id: item.id,
        name: item.name,
        score: item.score,
        created: item.created
      }))
    });

    // Sort by score (highest first), then by creation time (earliest first for tiebreakers)
    const sortedScores = scoresWithNames.sort((a: any, b: any) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(a.created).getTime() - new Date(b.created).getTime();
    });

    // Take top 5
    const topScores = sortedScores.slice(0, 5);
    
    // Transform the data to include percentage and format properly
    const leaderboard = topScores.map((item: any) => ({
      id: item.id,
      name: item.name,
      score: item.score,
      totalQuestions: item.totalQuestions,
      percentage: Math.round((item.score / item.totalQuestions) * 100),
      createdAt: item.created,
    }));

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error('Leaderboard API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 