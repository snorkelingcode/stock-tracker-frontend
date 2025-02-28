// app/api/scrape/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Replace with your actual Python backend URL
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:8000';
    const apiKey = process.env.API_KEY || 'pokemoncard-stock-webscraper-fe.vercel.app';
    
    const response = await fetch(`${backendUrl}/api/scrape`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error triggering scrape:', error);
    return NextResponse.json(
      { error: 'Failed to trigger scrape on backend' },
      { status: 500 }
    );
  }
}