import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;
        if (!token)
            return NextResponse.json(
                { error: 'Não autenticado' },
                { status: 401 }
            );

        const res = await fetch(`${API_URL}/entregas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Erro ao buscar entregas' },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { error: 'Falha ao conectar com o servidor' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;
        if (!token)
            return NextResponse.json(
                { error: 'Não autorizado' },
                { status: 401 }
            );

        const body = await req.json();

        const res = await fetch(`${API_URL}/entregas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch {
        return NextResponse.json(
            { error: 'Falha ao criar entrega' },
            { status: 500 }
        );
    }
}
