import { NextRequest, NextResponse } from 'next/server';

const POCKETBASE_URL = process.env.POCKETBASE_URL;

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }
  const res = await fetch(`${POCKETBASE_URL}/api/collections/scores/records?filter=userId="${userId}"&sort=-created&perPage=10`);
  if (!res.ok) {
    const error = await res.json();
    return NextResponse.json(error, { status: res.status });
  }
  const data = await res.json();
  const scores = data.items.map((r: any) => ({
    score: r.score,
    totalQuestions: r.totalQuestions,
    createdAt: r.created,
    name: r.name || null,
  }));
  return NextResponse.json({ scores });
}