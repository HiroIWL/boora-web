import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <div className="w-1/2 bg-white flex flex-col justify-center items-center text-center px-12 relative z-10">
        <h1 className="text-5xl font-bold text-orange-500 mb-6">Boora !</h1>

        <p className="text-orange-500 text-xl mb-10 max-w-md">
          Toda semana um novo desafio pra você se movimentar, acumular pontos e
          subir no ranking da turma!
        </p>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Link
            href="/signup"
            className="bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition"
          >
            Criar conta
          </Link>
          <Link
            href="/login"
            className="bg-orange-500 text-white font-semibold py-3 rounded-md hover:bg-orange-600 transition"
          >
            Já tenho conta
          </Link>
        </div>
      </div>

      <div className="w-1/2 relative flex items-center justify-center bg-green-600 overflow-hidden">
        <Image
          src="/people.jpg"
          alt="Ilustração pessoas se exercitando"
          width={500}
          height={500}
          className="object-contain relative z-10"
          priority
        />
      </div>
    </main>
  );
}
