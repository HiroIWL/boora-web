import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    if (!token) return NextResponse.json({ user: null }, { status: 401 });

    try {
        const decoded = jwt.decode(token);
        return NextResponse.json({ user: decoded });
    } catch {
        return NextResponse.json({ user: null }, { status: 401 });
    }
}
