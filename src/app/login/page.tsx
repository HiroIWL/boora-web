import Link from "next/link";
import Header from "@/components/Header";
import FormInput from "@/components/FormInput";

export default function Login() {
    return (
        <main className="flex flex-col min-h-screen bg-white px-6">
            <div className="pt-12">
                <Header />
            </div>

            <div className="flex flex-1 flex-col justify-center items-center w-full max-w-md mx-auto">
                <h2 className=" text-lg text-gray-800 font-bold mb-6">Entrar</h2>

                <form className="w-full">
                    <FormInput label="E-mail" placeholder="Digite seu e-mail" type="email" />
                    <FormInput label="Senha" placeholder="Digite sua senha" type="password" />

                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white font-semibold py-3 rounded-md hover:bg-orange-600 transition mb-4"
                    >
                        Entrar
                    </button>
                </form>

                <Link href="/signup" className="text-blue-600 hover:underline text-sm">
                    Não tem conta? Criar agora
                </Link>
            </div>
        </main>
    );
}
