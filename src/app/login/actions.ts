'use server';

import { loginUser, logoutUser } from '@/services/auth.service';

export async function loginUserAction(data: FormData) {
    const body = {
        registro_academico: data.get('registro_academico') as string,
        senha: data.get('senha') as string,
    };

    return loginUser(body);
}

export async function logOut() {
    return logoutUser();
}
