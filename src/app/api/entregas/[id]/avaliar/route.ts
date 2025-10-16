import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;
        const awaitedParams = await params;

        if (!token)
            return NextResponse.json(
                { error: 'Não autorizado' },
                { status: 401 }
            );

        const body = await req.json();

        const res = await fetch(
            `${API_URL}/entregas/${awaitedParams.id}/avaliar`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            }
        );

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch {
        return NextResponse.json(
            { error: 'Falha ao avaliar entrega' },
            { status: 500 }
        );
    }
}
