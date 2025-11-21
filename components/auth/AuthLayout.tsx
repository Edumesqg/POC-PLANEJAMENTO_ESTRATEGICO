import { BarChart3 } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col items-center justify-center bg-hero-gradient px-[60px] py-20 lg:flex">
        <div className="flex max-w-md flex-col items-center text-center">
          <h1 className="mb-4 font-inter text-[32px] font-bold leading-[1.2] tracking-[-0.02em] text-white">
            Mapa do Empreendedor
          </h1>
          <p className="mb-12 font-inter text-[18px] font-normal leading-[1.6] text-gray-300">
            Consultoria estratégica automatizada
          </p>
          <BarChart3 className="h-[200px] w-[200px] text-sky-blue opacity-20" />
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center bg-white px-6 py-[40px] md:px-[80px] md:py-[60px] lg:w-1/2">
        <div className="w-full max-w-[480px]">
          <div className="mb-8">
            <h2 className="mb-2 font-inter text-[32px] font-semibold leading-[1.3] tracking-[-0.01em] text-navy-blue">
              {title}
            </h2>
            <p className="font-inter text-[16px] font-normal leading-[1.6] text-gray-500">
              {subtitle}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
