import { NextRequest, NextResponse } from 'next/server';

const POCKETBASE_URL = process.env.POCKETBASE_URL;

export async function GET(req: NextRequest) {
  try {
    const continent = req.nextUrl.searchParams.get('continent');
    
    // Build filter for PocketBase query
    let filter = '';
    if (continent) {
      filter = `continent = "${continent}"`;
    }
    
    // Build query URL
    let queryUrl = `${POCKETBASE_URL}/api/collections/countries/records?sort=nameEn&perPage=500`;
    if (filter) {
      queryUrl += `&filter=${encodeURIComponent(filter)}`;
    }
    
    console.log('Fetching countries:', { continent, queryUrl });
    
    const response = await fetch(queryUrl);
    
    if (!response.ok) {
      const error = await response.json();
      console.error('PocketBase error:', error);
      return NextResponse.json({ error: 'Failed to fetch countries' }, { status: response.status });
    }
    
    const data = await response.json();
    
    // Transform PocketBase data to match our Country interface
    const countries = data.items.map((item: any) => ({
      code: item.code,
      nameEn: item.nameEn,
      nameSr: item.nameSr,
      flagFile: item.flagFile,
      continent: item.continent
    }));
    
    console.log(`Fetched ${countries.length} countries for continent: ${continent || 'all'}`);
    
    return NextResponse.json({ countries });
  } catch (error) {
    console.error('Countries API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 