import Header from "@/components/Header";
import FormInput from "@/components/FormInput";

export default function CadastroAluno() {
    return (
        <main className="flex flex-col min-h-screen bg-white px-6">
            <div className="pt-12">
                <Header />
            </div>

            <div className="flex flex-1 flex-col justify-center items-center w-full max-w-md mx-auto">
                <h2 className="text-lg text-gray-800 font-bold mb-6">Cadastrar Aluno</h2>

                <form className="w-full">
                    <FormInput label="Nome do Aluno" placeholder="Digite o nome do aluno" />
                    <FormInput label="Matrícula" placeholder="Digite a matrícula do aluno" />
                    <FormInput label="Data de Nascimento" placeholder="Selecione a data de nascimento" type="date" />
                    <FormInput label="Turma" placeholder="Selecione a turma" />

                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white font-semibold py-3 rounded-md hover:bg-orange-600 transition mt-4"
                    >
                        Salvar
                    </button>
                </form>
            </div>
        </main>
    );
}
