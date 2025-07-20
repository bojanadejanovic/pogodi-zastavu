import { NextResponse } from 'next/server';

const POCKETBASE_URL = process.env.POCKETBASE_URL;

export async function GET() {
  try {
    // Get today's date in UTC (start of day) to ensure consistency across environments
    const now = new Date();
    const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
    const todayISO = today.toISOString().replace('T', ' ').replace('.000Z', '');
    
    // Get tomorrow's date in UTC (end of day)
    const tomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0, 0));
    const tomorrowISO = tomorrow.toISOString().replace('T', ' ').replace('.000Z', '');

    // Debug logging
    console.log('Leaderboard API Debug:', {
      todayISO,
      tomorrowISO,
      currentTime: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });

    // Get all scores from today, then filter for those with names
    const todayFilter = `created >= "${todayISO}" && created < "${tomorrowISO}"`;
    const searchQuery = `${POCKETBASE_URL}/api/collections/scores/records?filter=${todayFilter}&sort=-score,-created&perPage=50`
    const allScoresRes = await fetch(searchQuery);

    if (!allScoresRes.ok) {
      const error = await allScoresRes.json();
      console.error('PocketBase error (all scores):', error);
      return NextResponse.json({ error: 'Failed to fetch scores' }, { status: allScoresRes.status });
    }

    const allScoresData = await allScoresRes.json();
    
    // Debug logging for all scores from today
    const uniqueUsers = allScoresData.items?.reduce((acc: any, item: any) => {
      if (item.name && item.name.trim() !== '') {
        acc[item.name] = true;
      }
      return acc;
    }, {}) || {};
    
    console.log('All scores from today:', {
      totalItems: allScoresData.items?.length || 0,
      uniqueUsers: Object.keys(uniqueUsers).length,
      items: allScoresData.items?.map((item: any) => ({
        id: item.id,
        name: item.name,
        score: item.score,
        created: item.created,
        createdDate: new Date(item.created).toISOString().split('T')[0]
      })) || []
    });

    // Filter scores that have names (all scores from today are already fetched)
    const scoresWithNames = allScoresData.items.filter((item: any) => {
      const hasName = item.name && item.name.trim() !== '';
      
      // Debug each item
      console.log('Checking item:', {
        id: item.id,
        name: item.name,
        score: item.score,
        created: item.created,
        hasName
      });
      
      return hasName;
    });

    console.log('Scores with names:', {
      totalWithNames: scoresWithNames.length,
      items: scoresWithNames.map((item: any) => ({
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
    
    console.log('Final results:', {
      totalWithNames: scoresWithNames.length,
      sortedScores: sortedScores.map((s: any) => ({ id: s.id, name: s.name, score: s.score })),
      topScores: topScores.map((s: any) => ({ id: s.id, name: s.name, score: s.score }))
    });
    
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