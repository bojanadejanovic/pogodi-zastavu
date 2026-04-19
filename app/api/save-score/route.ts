import { NextRequest, NextResponse } from 'next/server';
import { REGION_BY_MODE } from '../../data/regions';
import type { GameMode } from '../../types';

const POCKETBASE_URL = process.env.POCKETBASE_URL;

export async function POST(req: NextRequest) {
  const { userId, score, totalQuestions, name, mode } = await req.json();

  if (!userId || typeof score !== 'number' || typeof totalQuestions !== 'number') {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
  if (!name || typeof name !== 'string' || !name.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const region = mode ? REGION_BY_MODE[mode as GameMode] : null;

  const scoreData: Record<string, any> = {
    userId,
    score,
    totalQuestions,
    name: name.trim(),
  };
  if (region) scoreData.region = region.id;

  const res = await fetch(`${POCKETBASE_URL}/api/collections/scores/records`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(scoreData),
    cache: 'no-store',
  });

  if (!res.ok) {
    const error = await res.json();
    console.error('PocketBase save error:', error);
    return NextResponse.json(error, { status: res.status });
  }

  return NextResponse.json({ success: true });
}
