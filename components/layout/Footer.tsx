import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-carbon">
      <div className="mx-auto max-w-[1200px] px-6 py-10 md:px-8 md:py-12 lg:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-white">
              Mapa do Empreendedor
            </h3>
            <p className="text-sm text-gray-400">
              Consultoria estratégica automatizada
            </p>
            <p className="mt-6 text-sm text-gray-500">
              &copy; 2025 Mapa do Empreendedor. Todos os direitos reservados.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <h4 className="text-base font-semibold text-white">Links úteis</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="#como-funciona"
                className="text-sm text-gray-300 transition-colors duration-200 hover:text-sky-blue"
              >
                Como funciona
              </Link>
              <Link
                href="#metodologia"
                className="text-sm text-gray-300 transition-colors duration-200 hover:text-sky-blue"
              >
                Metodologia
              </Link>
              <Link
                href="#sobre"
                className="text-sm text-gray-300 transition-colors duration-200 hover:text-sky-blue"
              >
                Sobre
              </Link>
              <Link
                href="#contato"
                className="text-sm text-gray-300 transition-colors duration-200 hover:text-sky-blue"
              >
                Contato
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
