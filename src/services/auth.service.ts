import { apiFetch } from '@/lib/api';
import { setAuthToken, clearAuthToken } from '@/lib/cookies';

export interface RegisterDto {
    nome: string;
    senha: string;
    tipo: 'ALUNO' | 'PROFESSOR';
    codigo_registro: string;
    id_turma: string;
}

export interface LoginDto {
    registro_academico: string;
    senha: string;
}

export interface LoginResponse {
    access_token: string;
}

export async function registerUser(data: RegisterDto) {
    try {
        console.log(data);

        const response = await apiFetch('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        return response;
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        throw new Error('Falha ao registrar usuário. Tente novamente.');
    }
}

export async function loginUser(data: LoginDto) {
    try {
        const { access_token } = await apiFetch<LoginResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        await setAuthToken(access_token);

        return { access_token };
    } catch (error) {
        console.error('Erro no login:', error);
        throw new Error('Falha ao realizar login. Verifique suas credenciais.');
    }
}

export async function logoutUser() {
    try {
        await clearAuthToken();
    } catch (error) {
        console.error('Erro ao sair da conta:', error);
        throw new Error('Falha ao encerrar sessão.');
    }
}
