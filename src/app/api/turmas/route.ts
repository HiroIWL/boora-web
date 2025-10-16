import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export async function GET() {
    try {
        console.log('uai');
        const res = await fetch(`${API_URL}/turmas`, { cache: 'no-store' });
        if (!res.ok) {
            return NextResponse.json(
                { error: 'Erro ao buscar turmas' },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { error: 'Falha na comunicação com o servidor' },
            { status: 500 }
        );
    }
}
