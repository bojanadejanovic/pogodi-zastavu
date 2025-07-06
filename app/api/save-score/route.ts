import { NextRequest, NextResponse } from 'next/server';

const POCKETBASE_URL = process.env.POCKETBASE_URL;

export async function POST(req: NextRequest) {
  const { userId, score, totalQuestions } = await req.json();
  console.log({ userId, score, totalQuestions });

  if (!userId || typeof score !== 'number' || typeof totalQuestions !== 'number') {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  const res = await fetch(`${POCKETBASE_URL}/api/collections/scores/records`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, score, totalQuestions }),
  });

  if (!res.ok) {
    const error = await res.json();
    return NextResponse.json(error, { status: res.status });
  }

  return NextResponse.json({ success: true });
} 