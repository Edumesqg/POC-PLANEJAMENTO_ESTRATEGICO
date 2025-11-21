import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Footer } from '@/components/layout/Footer';
import { Brain, FileText, Shield, Clipboard, LineChart, Sparkles, Lock, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <section className="bg-hero-gradient px-6 py-20 md:px-8 md:py-32 lg:px-12">
          <div className="mx-auto max-w-[1200px] animate-fade-in">
            <div className="flex flex-col items-center text-center">
              <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                MAPA DO EMPREENDEDOR
              </h1>
              <p className="mb-12 text-base text-gray-300 md:text-lg">
                Consultoria estratégica automatizada por IA
              </p>

              <h2 className="mb-6 max-w-[800px] text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl lg:leading-tight">
                Consultoria de multinacional, agora acessível ao seu negócio
              </h2>

              <p className="mb-10 max-w-[700px] text-lg leading-relaxed text-gray-100 md:text-xl md:leading-relaxed">
                Obtenha SWOT, pesquisa de mercado e um plano de ação completo em minutos — por apenas R$ 50.
              </p>

              <Link href="/cadastro">
                <Button
                  size="lg"
                  className="h-auto bg-emerald-green px-12 py-5 text-lg font-semibold text-white shadow-lg shadow-emerald-green/40 transition-all duration-200 hover:translate-y-[-2px] hover:bg-emerald-green hover:shadow-xl hover:shadow-emerald-green/50 active:scale-[0.98] md:text-xl"
                >
                  Começar diagnóstico gratuito
                </Button>
              </Link>

              <p className="mt-6 text-sm text-gray-400 md:text-base">
                Baseado em metodologias McKinsey, BCG e Harvard Business School
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-20 md:px-8 lg:px-12">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-14 text-center text-3xl font-semibold text-navy-blue md:text-4xl">
              Por que escolher o Mapa do Empreendedor?
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group border-gray-200 bg-card-gradient shadow-md transition-all duration-300 hover:translate-y-[-4px] hover:border-royal-blue hover:shadow-xl">
                <CardHeader className="space-y-4">
                  <div className="flex justify-center">
                    <Brain className="h-16 w-16 text-emerald-green" />
                  </div>
                  <CardTitle className="text-center text-2xl text-carbon">
                    Metodologias reconhecidas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed text-gray-600">
                    Harvard, McKinsey, BCG — frameworks validados globalmente, adaptados para pequenas empresas.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group border-gray-200 bg-card-gradient shadow-md transition-all duration-300 hover:translate-y-[-4px] hover:border-royal-blue hover:shadow-xl">
                <CardHeader className="space-y-4">
                  <div className="flex justify-center">
                    <FileText className="h-16 w-16 text-royal-blue" />
                  </div>
                  <CardTitle className="text-center text-2xl text-carbon">
                    Relatórios profissionais em PDF
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed text-gray-600">
                    Análises executivas prontas para apresentar a sócios, investidores e parceiros.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group border-gray-200 bg-card-gradient shadow-md transition-all duration-300 hover:translate-y-[-4px] hover:border-royal-blue hover:shadow-xl">
                <CardHeader className="space-y-4">
                  <div className="flex justify-center">
                    <Shield className="h-16 w-16 text-sky-blue" />
                  </div>
                  <CardTitle className="text-center text-2xl text-carbon">
                    LGPD e criptografia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed text-gray-600">
                    Seus dados protegidos com criptografia de nível bancário. Privacidade garantida.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-slate-gray px-6 py-20 md:px-8 lg:px-12">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-14 text-center text-3xl font-semibold text-navy-blue md:text-4xl">
              Como funciona?
            </h2>

            <div className="mx-auto max-w-[800px] space-y-10">
              <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-royal-blue text-2xl font-bold text-white">
                  1
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-3 flex items-center justify-center space-x-3 md:justify-start">
                    <Clipboard className="h-12 w-12 text-sky-blue" />
                    <h3 className="text-xl font-semibold text-carbon md:text-2xl">
                      Responda perguntas sobre seu negócio
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-gray-600">
                    Questionário inteligente de 10 minutos. Quanto mais detalhes, melhor a análise.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-royal-blue text-2xl font-bold text-white">
                  2
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-3 flex items-center justify-center space-x-3 md:justify-start">
                    <LineChart className="h-12 w-12 text-emerald-green" />
                    <h3 className="text-xl font-semibold text-carbon md:text-2xl">
                      Receba análise SWOT inicial gratuita
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-gray-600">
                    Resultado imediato mostrando suas forças, fraquezas, oportunidades e ameaças — 100% gratuito, sem custos ocultos e com análise instantânea.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-royal-blue text-2xl font-bold text-white">
                  3
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-3 flex items-center justify-center space-x-3 md:justify-start">
                    <Sparkles className="h-12 w-12 text-amber-orange" />
                    <h3 className="text-xl font-semibold text-carbon md:text-2xl">
                      Diagnóstico completo com metodologia validada
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-gray-600">
                    Amplie sua visão estratégica com pesquisa de mercado externa, matriz TOWS para definir ações prioritárias, OKRs mensuráveis e um roadmap de execução prático. Nossa abordagem combina frameworks consagrados de Harvard Business School, McKinsey e BCG, adaptados para pequenas empresas. Por apenas R$ 50 (equivalente a 1% do custo de uma consultoria tradicional).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16 md:px-8 md:py-20 lg:px-12">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col items-center justify-center space-y-8 md:flex-row md:space-x-12 md:space-y-0 lg:space-x-16">
              <div className="flex items-center space-x-3">
                <Lock className="h-8 w-8 text-emerald-green" />
                <span className="text-base font-medium text-gray-600">
                  LGPD Compliant
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-emerald-green" />
                <span className="text-base font-medium text-gray-600">
                  Dados Criptografados
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-8 w-8 text-emerald-green" />
                <span className="text-base font-medium text-gray-600">
                  Plataforma Brasileira
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
