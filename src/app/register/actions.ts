'use server';

import { registerUser, logoutUser } from '@/services/auth.service';

export async function registerUserAction(data: FormData) {
    return registerUser({
        nome: data.get('nome') as string,
        senha: data.get('senha') as string,
        tipo: 'ALUNO',
        codigo_registro: data.get('codigo_registro') as string,
        id_turma: data.get('id_turma') as string,
    });
}
