import { NextRequest, NextResponse } from 'next/server';

const POCKETBASE_URL = process.env.POCKETBASE_URL;

export async function POST(req: NextRequest) {
  const { userId, score, totalQuestions, name } = await req.json();
  console.log({ userId, score, totalQuestions, name });

  if (!userId || typeof score !== 'number' || typeof totalQuestions !== 'number') {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  // Prepare the data to send to PocketBase
  const scoreData: any = { userId, score, totalQuestions };
  if (name && typeof name === 'string' && name.trim()) {
    scoreData.name = name.trim();
  }

  const res = await fetch(`${POCKETBASE_URL}/api/collections/scores/records`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(scoreData),
  });

  if (!res.ok) {
    const error = await res.json();
    return NextResponse.json(error, { status: res.status });
  }

  return NextResponse.json({ success: true });
} 