import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token)
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

    const body = await req.json();
    const apiUrl = `${API_URL}/desafios/${params.id}/turmas`;

    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            data_desafio: body.data_desafio,
            turmas: body.turmas,
        }),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}
