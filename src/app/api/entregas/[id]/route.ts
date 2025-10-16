import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;
        if (!token)
            return NextResponse.json(
                { error: 'Não autenticado' },
                { status: 401 }
            );

        const res = await fetch(`${API_URL}/entregas/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Erro ao buscar entrega' },
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
