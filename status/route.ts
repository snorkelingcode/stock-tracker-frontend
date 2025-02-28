// app/api/status/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Replace with your actual Python backend URL
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:8000';
    
    const response = await fetch(`${backendUrl}/api/status`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch status from backend' },
      { status: 500 }
    );
  }
}