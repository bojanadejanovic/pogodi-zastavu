import { NextRequest, NextResponse } from 'next/server';
import { REGION_BY_MODE } from '../../data/regions';
import type { GameMode } from '../../types';

const POCKETBASE_URL = process.env.POCKETBASE_URL;

export async function GET(req: NextRequest) {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date(Date.UTC(
      now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 7
    ));

    const modeParam = req.nextUrl.searchParams.get('region') as GameMode | null;
    const region = modeParam ? REGION_BY_MODE[modeParam] : null;

    const filter = `created >= "${sevenDaysAgo.toISOString()}"`;

    const res = await fetch(
      `${POCKETBASE_URL}/api/collections/scores/records?filter=${encodeURIComponent(filter)}&sort=-created&perPage=500`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      console.error('PocketBase error:', await res.text());
      return NextResponse.json({ error: 'Failed to fetch scores' }, { status: res.status });
    }

    const data = await res.json();

    const getRegionId = (item: any): string | null => {
      const r = item.region;
      if (!r) return null;
      return Array.isArray(r) ? (r[0] ?? null) : r;
    };

    const withNames = (data.items || []).filter(
      (item: any) => item.name && item.name.trim() !== '' &&
        (!region || getRegionId(item) === region.id)
    );

    // Per player keep their best result by percentage, then raw score
    const bestPerPlayer = new Map<string, any>();
    for (const item of withNames) {
      const key = item.name.trim().toLowerCase();
      const existing = bestPerPlayer.get(key);
      if (!existing) {
        bestPerPlayer.set(key, item);
      } else {
        const newPct = item.score / item.totalQuestions;
        const existingPct = existing.score / existing.totalQuestions;
        if (
          newPct > existingPct ||
          (newPct === existingPct && item.score > existing.score) ||
          (newPct === existingPct && item.score === existing.score &&
            new Date(item.created) < new Date(existing.created))
        ) {
          bestPerPlayer.set(key, item);
        }
      }
    }

    const sorted = Array.from(bestPerPlayer.values()).sort((a: any, b: any) => {
      const pctA = a.score / a.totalQuestions;
      const pctB = b.score / b.totalQuestions;
      if (pctB !== pctA) return pctB - pctA;
      if (b.score !== a.score) return b.score - a.score;
      return new Date(a.created).getTime() - new Date(b.created).getTime();
    });

    const leaderboard = sorted.slice(0, 10).map((item: any) => ({
      id: item.id,
      name: item.name,
      score: item.score,
      totalQuestions: item.totalQuestions,
      percentage: Math.round((item.score / item.totalQuestions) * 100),
      createdAt: item.created,
      region: item.region || null,
    }));

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error('Leaderboard API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
