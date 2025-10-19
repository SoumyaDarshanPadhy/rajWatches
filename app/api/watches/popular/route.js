import { NextResponse } from 'next/server';
import { getPopularWatches } from '@/lib/watchService';

export async function GET() {
  try {
    const watches = await getPopularWatches();
    
    return NextResponse.json(watches, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('API Error - Failed to fetch popular watches:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch watches',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

export const revalidate = 3600; 