import { NextResponse } from 'next/server';

const POCKETBASE_URL = process.env.POCKETBASE_URL;

export async function GET() {
  try {
    // Get today's date in UTC (start of day) to ensure consistency across environments
    const now = new Date();
    const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
    const todayISO = today.toISOString();
    
    // Get tomorrow's date in UTC (end of day)
    const tomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0, 0));
    const tomorrowISO = tomorrow.toISOString();

    // Debug logging
    console.log('Leaderboard API Debug:', {
      todayISO,
      tomorrowISO,
      currentTime: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });

    // Get all recent scores with names from all users (global leaderboard)
    const allScoresRes = await fetch(
      `${POCKETBASE_URL}/api/collections/scores/records?filter=name != ""&sort=-created&perPage=50`
    );

    if (!allScoresRes.ok) {
      const error = await allScoresRes.json();
      console.error('PocketBase error (all scores):', error);
      return NextResponse.json({ error: 'Failed to fetch scores' }, { status: allScoresRes.status });
    }

    const allScoresData = await allScoresRes.json();
    
    // Debug logging for all scores (global leaderboard)
    const uniqueUsers = allScoresData.items?.reduce((acc: any, item: any) => {
      acc[item.name] = true;
      return acc;
    }, {}) || {};
    
    console.log('All scores with names (global):', {
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

    // Filter scores for today on the server side - using simpler date comparison
    const todayScores = allScoresData.items.filter((item: any) => {
      const createdDate = new Date(item.created);
      const createdDateString = createdDate.toISOString().split('T')[0]; // YYYY-MM-DD format
      const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      const isToday = createdDateString === todayString;
      
      // Debug each item
      console.log('Checking item:', {
        id: item.id,
        name: item.name,
        created: item.created,
        createdDateString,
        todayString,
        isToday
      });
      
      return isToday;
    });

    console.log('Filtered today scores:', {
      totalToday: todayScores.length,
      items: todayScores.map((item: any) => ({
        id: item.id,
        name: item.name,
        score: item.score,
        created: item.created
      }))
    });

    // Sort by score (highest first), then by creation time (earliest first for tiebreakers)
    const sortedScores = todayScores.sort((a: any, b: any) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(a.created).getTime() - new Date(b.created).getTime();
    });

    // Take top 5
    const topScores = sortedScores.slice(0, 5);
    
    console.log('Final results:', {
      totalToday: todayScores.length,
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