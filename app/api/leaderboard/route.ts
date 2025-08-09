import { NextResponse } from 'next/server';

const POCKETBASE_URL = process.env.POCKETBASE_URL;

export async function GET() {
  try {
    // Get today's date in multiple formats to ensure compatibility
    const now = new Date();
    
    // Try local timezone first (most common case)
    const localToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const localTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
    
    // Also prepare UTC versions as fallback
    const utcToday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
    const utcTomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0, 0));
    
    // PocketBase typically expects ISO format
    const todayISO = localToday.toISOString();
    const tomorrowISO = localTomorrow.toISOString();
    
    // Also try the format that was being used before (space instead of T)
    const todaySpaceFormat = todayISO.replace('T', ' ').replace('.000Z', '');
    const tomorrowSpaceFormat = tomorrowISO.replace('T', ' ').replace('.000Z', '');

    // Debug logging
    console.log('Leaderboard API Debug:', {
      currentTime: now.toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      localToday: localToday.toISOString(),
      localTomorrow: localTomorrow.toISOString(),
      utcToday: utcToday.toISOString(),
      utcTomorrow: utcTomorrow.toISOString(),
      todaySpaceFormat,
      tomorrowSpaceFormat
    });

    // Try with ISO format first
    let todayFilter = `created >= "${todayISO}" && created < "${tomorrowISO}"`;
    let searchQuery = `${POCKETBASE_URL}/api/collections/scores/records?filter=${encodeURIComponent(todayFilter)}&sort=-score,-created&perPage=50`;
    let allScoresRes = await fetch(searchQuery);

    // If that fails, try with space format
    if (!allScoresRes.ok) {
      console.log('ISO format failed, trying space format...');
      todayFilter = `created >= "${todaySpaceFormat}" && created < "${tomorrowSpaceFormat}"`;
      searchQuery = `${POCKETBASE_URL}/api/collections/scores/records?filter=${encodeURIComponent(todayFilter)}&sort=-score,-created&perPage=50`;
      allScoresRes = await fetch(searchQuery);
    }

    if (!allScoresRes.ok) {
      const error = await allScoresRes.json();
      console.error('PocketBase error (all scores):', error);
      console.error('Final filter used:', todayFilter);
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
    const scoresWithNames = (allScoresData.items || []).filter((item: any) => {
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