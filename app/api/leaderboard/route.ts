import { NextResponse } from 'next/server';

const POCKETBASE_URL = process.env.POCKETBASE_URL;

export async function GET() {
  try {
    // Get today's date in ISO format (start of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISO = today.toISOString();
    
    // Get tomorrow's date (end of day)
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowISO = tomorrow.toISOString();

    // Build the filter to get scores from today with names
    const filter = `created >= "${todayISO}" && created < "${tomorrowISO}" && name != ""`;
    
    const res = await fetch(
      `${POCKETBASE_URL}/api/collections/scores/records?filter=${encodeURIComponent(filter)}&sort=-score,-created&perPage=5`
    );

    if (!res.ok) {
      const error = await res.json();
      console.error('PocketBase error:', error);
      return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: res.status });
    }

    const data = await res.json();
    
    // Transform the data to include percentage and format properly
    const leaderboard = data.items.map((item: any) => ({
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