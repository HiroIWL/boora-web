import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    const id = (await params).id;

    if (!token)
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

    const apiUrl = `${API_URL}/desafios/${id}`;

    try {
        const res = await fetch(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao buscar desafio' },
            { status: 500 }
        );
    }
}
