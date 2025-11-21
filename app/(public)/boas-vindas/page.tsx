'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sparkles, Clock, Clipboard, LineChart } from 'lucide-react';

export default function WelcomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState('Empreendedor');

  useEffect(() => {
    try {
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  const handleStart = () => {
    try {
      localStorage.setItem('onboardingCompleted', 'true');
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
    router.push('/formulario-basico');
  };

  const handleSaveLater = () => {
    try {
      localStorage.setItem('onboardingStarted', 'true');
      localStorage.setItem('savedAt', new Date().toISOString());
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-gray to-white px-6 py-10 md:px-8 md:py-16">
      <div className="w-full max-w-[680px] animate-slide-up rounded-3xl border border-gray-200 bg-white px-8 py-10 text-center shadow-lg md:px-12 md:py-16">
        <div className="mb-8 flex justify-center">
          <Sparkles className="h-20 w-20 animate-pulse text-emerald-green md:h-20 md:w-20" />
        </div>

        <h1 className="mb-4 text-3xl font-bold leading-tight text-navy-blue md:text-4xl">
          Bem-vindo ao Mapa do Empreendedor, {userName}!
        </h1>

        <p className="mx-auto mb-12 max-w-[540px] text-lg leading-relaxed text-gray-600 md:text-xl">
          Você está a poucos minutos de ter acesso a um diagnóstico estratégico profissional do seu negócio.
        </p>

        <div className="mb-10">
          <h2 className="mb-8 text-left text-xl font-semibold text-carbon">
            Veja como funciona:
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-5 text-left opacity-0 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-royal-blue text-xl font-bold text-white">
                1
              </div>
              <div className="flex-1">
                <h3 className="mb-1 text-lg font-semibold text-carbon">
                  Responda perguntas sobre seu negócio
                </h3>
                <p className="text-base leading-relaxed text-gray-600">
                  Formulário inteligente de ~15 minutos com perguntas personalizadas.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 text-left opacity-0 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-green text-xl font-bold text-white">
                2
              </div>
              <div className="flex-1">
                <h3 className="mb-1 text-lg font-semibold text-carbon">
                  Receba sua análise SWOT gratuita
                </h3>
                <p className="text-base leading-relaxed text-gray-600">
                  Veja imediatamente forças, fraquezas, oportunidades e ameaças.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 text-left opacity-0 animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-orange text-xl font-bold text-white">
                3
              </div>
              <div className="flex-1">
                <h3 className="mb-1 text-lg font-semibold text-carbon">
                  Upgrade para diagnóstico completo (opcional)
                </h3>
                <p className="text-base leading-relaxed text-gray-600">
                  Por R$ 50, tenha acesso a análise aprofundada com IA e plano de ação estratégico.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-10 h-px bg-gray-200"></div>

        <div className="mb-8 flex items-center justify-center gap-2 text-gray-600">
          <Clock className="h-5 w-5" />
          <span className="text-base font-medium">Tempo estimado: 15-20 minutos</span>
        </div>

        <Button
          onClick={handleStart}
          className="mb-4 h-auto w-full bg-cta-gradient px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-royal-blue/30 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-royal-blue/40 active:scale-[0.98] md:mx-auto md:max-w-[400px]"
        >
          Começar meu diagnóstico 🚀
        </Button>

        <button
          onClick={handleSaveLater}
          className="mt-4 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-royal-blue"
        >
          Salvar para depois →
        </button>
      </div>
    </div>
  );
}
