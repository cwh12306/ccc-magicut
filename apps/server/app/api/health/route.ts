
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        success: true,
        service: 'miaojian-magicut-server',
        timestamp: new Date().toISOString()
    });
}
