'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowUp, Info, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export default function TermosDeUsoPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);

      const sections = document.querySelectorAll('section[id]');
      let currentSection = '';

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 150 && sectionTop >= -section.clientHeight) {
          currentSection = section.getAttribute('id') || '';
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    { id: 'aceitacao', title: 'Aceitação dos Termos' },
    { id: 'servico', title: 'Sobre o Serviço' },
    { id: 'elegibilidade', title: 'Elegibilidade' },
    { id: 'cadastro', title: 'Cadastro e Conta' },
    { id: 'planos', title: 'Planos e Pagamentos' },
    { id: 'propriedade', title: 'Propriedade Intelectual' },
    { id: 'privacidade', title: 'Privacidade e Proteção de Dados' },
    { id: 'limitacao', title: 'Limitação de Responsabilidade' },
    { id: 'rescisao', title: 'Rescisão' },
    { id: 'modificacoes', title: 'Modificações dos Termos' },
    { id: 'lei', title: 'Lei Aplicável e Foro' },
    { id: 'contato', title: 'Contato' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="sticky top-24 bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-semibold text-sm text-slate-900 mb-4 uppercase tracking-wide">
                Navegação Rápida
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`flex items-center gap-2 text-sm py-2 px-3 rounded-lg transition-all ${
                      activeSection === section.id
                        ? 'bg-slate-200 text-royal-blue font-medium'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {activeSection === section.id && (
                      <ChevronRight className="h-4 w-4 text-royal-blue" />
                    )}
                    <span className={activeSection === section.id ? '' : 'ml-6'}>
                      {section.title}
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <main className="flex-1 max-w-3xl">
            <nav className="text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-royal-blue hover:underline">
                Home
              </Link>
              <span className="mx-2">&gt;</span>
              <span className="text-slate-900">Termos de Uso</span>
            </nav>

            <header className="mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-navy-blue mb-2 tracking-tight">
                Termos de Uso
              </h1>
              <p className="text-sm text-slate-400">Última atualização: Janeiro de 2025</p>
            </header>

            <div className="lg:hidden mb-8">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="aceitacao" id="aceitacao">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    1. Aceitação dos Termos
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    <p>
                      Ao acessar e utilizar a plataforma Mapa do Empreendedor (&quot;Plataforma&quot;, &quot;Serviço&quot;),
                      você (&quot;Usuário&quot;, &quot;Você&quot;) concorda em cumprir e estar vinculado a estes Termos de Uso.
                      Se você não concorda com qualquer parte destes termos, não deve utilizar nossos serviços.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="servico" id="servico-mobile">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    2. Sobre o Serviço
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">2.1 Descrição</h4>
                      <p>
                        O Mapa do Empreendedor é uma plataforma SaaS que oferece consultoria estratégica
                        automatizada por inteligência artificial, fornecendo diagnósticos empresariais,
                        análises SWOT, pesquisas de mercado e planos de ação personalizados.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">2.2 Responsável</h4>
                      <p>Eduardo Mesquita - MBA Executivo em Data Science e Analytics (USP)</p>
                      <p>CNPJ: [A ser preenchido]</p>
                      <p>Email: contato@mapadoempreendedor.com.br</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="elegibilidade-mobile" id="elegibilidade-mobile">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    3. Elegibilidade
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    <p className="mb-3">Para utilizar a Plataforma, você deve:</p>
                    <ul className="list-disc list-inside space-y-2 text-slate-600">
                      <li>Ter pelo menos 18 anos de idade</li>
                      <li>Possuir capacidade legal para firmar contratos</li>
                      <li>Ser proprietário ou representante autorizado de uma empresa</li>
                      <li>Fornecer informações verdadeiras e atualizadas</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cadastro-mobile" id="cadastro-mobile">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    4. Cadastro e Conta
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">4.1 Criação de Conta</h4>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Você deve criar uma conta fornecendo informações precisas e completas</li>
                        <li>É responsabilidade do usuário manter a confidencialidade de sua senha</li>
                        <li>Você é responsável por todas as atividades realizadas em sua conta</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">4.2 Uso Permitido</h4>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Diagnóstico estratégico legítimo de seu negócio</li>
                        <li>Fins comerciais éticos e legais</li>
                        <li>Uso pessoal ou empresarial próprio</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">4.3 Uso Proibido</h4>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Compartilhar credenciais de acesso</li>
                        <li>Revender ou redistribuir relatórios</li>
                        <li>Engenharia reversa da plataforma</li>
                        <li>Coletar dados de outros usuários</li>
                        <li>Atividades ilegais ou antiéticas</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="planos-mobile" id="planos-mobile">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    5. Planos e Pagamentos
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">5.1 Plano Gratuito</h4>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Análise SWOT inicial (visualização web apenas)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">5.2 Plano Pago (R$ 50,00)</h4>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Diagnóstico completo com 3 agentes de IA</li>
                        <li>3 relatórios profissionais em PDF</li>
                        <li>SWOT aprofundada + TOWS + OKRs + Roadmap</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">5.3 Processamento de Pagamentos</h4>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Pagamentos via Stripe (seguro e criptografado)</li>
                        <li>Pagamento único (não recorrente)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">5.4 Reembolso</h4>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Direito a reembolso em até 7 dias</li>
                        <li>Solicitação: contato@mapadoempreendedor.com.br</li>
                        <li>Processamento: até 10 dias úteis</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="propriedade-mobile" id="propriedade-mobile">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    6. Propriedade Intelectual
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">6.1 Propriedade da Plataforma</h4>
                      <p>
                        Todo conteúdo, design, código e metodologias são propriedade exclusiva do
                        Mapa do Empreendedor.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">6.2 Licença de Uso</h4>
                      <p>
                        Licença limitada, não exclusiva e intransferível para acessar e utilizar a Plataforma.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">6.3 Propriedade dos Relatórios</h4>
                      <p>
                        Relatórios gerados pertencem ao usuário pagante para uso interno. Proibida revenda.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="privacidade-mobile" id="privacidade-mobile">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    7. Privacidade e Proteção de Dados
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    <p>
                      Estamos em conformidade com a LGPD (Lei nº 13.709/2018). Consulte nossa{' '}
                      <Link href="/politica-de-privacidade" className="text-royal-blue hover:underline">
                        Política de Privacidade
                      </Link>{' '}
                      para detalhes.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="limitacao-mobile" id="limitacao-mobile">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    8. Limitação de Responsabilidade
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">8.1 Natureza Consultiva</h4>
                      <p>
                        Diagnósticos são ferramentas de apoio à decisão. Não substituem consultoria
                        individualizada.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">8.2 Sem Garantias de Resultados</h4>
                      <p>Não garantimos resultados financeiros específicos.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">8.3 Limitação de Danos</h4>
                      <p>
                        Não nos responsabilizamos por lucros cessantes, perdas indiretas ou decisões
                        empresariais baseadas nos relatórios.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="rescisao-mobile" id="rescisao-mobile">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    9. Rescisão
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">9.1 Por Parte do Usuário</h4>
                      <p>Encerramento via email: contato@mapadoempreendedor.com.br</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">9.2 Por Parte da Plataforma</h4>
                      <p>Suspensão em caso de violação dos termos.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="modificacoes-mobile" id="modificacoes-mobile">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    10. Modificações dos Termos
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    <p>
                      Reservamos direito de modificar estes termos. Notificação por email e na plataforma.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="lei-mobile" id="lei-mobile">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    11. Lei Aplicável e Foro
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    <p>Regidos pelas leis do Brasil. Foro: [Cidade], [Estado].</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="contato-mobile" id="contato-mobile">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    12. Contato
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    <p className="font-medium text-slate-900 mb-2">Mapa do Empreendedor</p>
                    <p>Email: contato@mapadoempreendedor.com.br</p>
                    <p>DPO: dpo@mapadoempreendedor.com.br</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="hidden lg:block space-y-12">
              <section id="aceitacao">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  1. Aceitação dos Termos
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Ao acessar e utilizar a plataforma Mapa do Empreendedor (&quot;Plataforma&quot;, &quot;Serviço&quot;),
                  você (&quot;Usuário&quot;, &quot;Você&quot;) concorda em cumprir e estar vinculado a estes Termos de Uso.
                  Se você não concorda com qualquer parte destes termos, não deve utilizar nossos serviços.
                </p>
              </section>

              <section id="servico">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  2. Sobre o Serviço
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">2.1 Descrição</h3>
                    <p className="text-slate-600 leading-relaxed">
                      O Mapa do Empreendedor é uma plataforma SaaS que oferece consultoria estratégica
                      automatizada por inteligência artificial, fornecendo diagnósticos empresariais,
                      análises SWOT, pesquisas de mercado e planos de ação personalizados.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">2.2 Responsável</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Eduardo Mesquita - MBA Executivo em Data Science e Analytics (USP)<br />
                      CNPJ: [A ser preenchido]<br />
                      Email: contato@mapadoempreendedor.com.br
                    </p>
                  </div>
                </div>
              </section>

              <section id="elegibilidade">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  3. Elegibilidade
                </h2>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Para utilizar a Plataforma, você deve:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li>Ter pelo menos 18 anos de idade</li>
                  <li>Possuir capacidade legal para firmar contratos</li>
                  <li>Ser proprietário ou representante autorizado de uma empresa</li>
                  <li>Fornecer informações verdadeiras e atualizadas</li>
                </ul>
              </section>

              <section id="cadastro">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  4. Cadastro e Conta
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">4.1 Criação de Conta</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-600">
                      <li>Você deve criar uma conta fornecendo informações precisas e completas</li>
                      <li>É responsabilidade do usuário manter a confidencialidade de sua senha</li>
                      <li>Você é responsável por todas as atividades realizadas em sua conta</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">4.2 Uso Permitido</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-600">
                      <li>Diagnóstico estratégico legítimo de seu negócio</li>
                      <li>Fins comerciais éticos e legais</li>
                      <li>Uso pessoal ou empresarial próprio</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">4.3 Uso Proibido</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-600">
                      <li>Compartilhar credenciais de acesso</li>
                      <li>Revender ou redistribuir relatórios</li>
                      <li>Engenharia reversa da plataforma</li>
                      <li>Coletar dados de outros usuários</li>
                      <li>Atividades ilegais ou antiéticas</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="planos">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  5. Planos e Pagamentos
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">5.1 Plano Gratuito</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-600">
                      <li>Análise SWOT inicial (visualização web apenas)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">5.2 Plano Pago (R$ 50,00)</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-600">
                      <li>Diagnóstico completo com 3 agentes de IA</li>
                      <li>3 relatórios profissionais em PDF</li>
                      <li>SWOT aprofundada + TOWS + OKRs + Roadmap</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">5.3 Processamento de Pagamentos</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-600">
                      <li>Pagamentos via Stripe (seguro e criptografado)</li>
                      <li>Pagamento único (não recorrente)</li>
                    </ul>
                  </div>
                  <Card className="border-l-4 border-l-amber-orange bg-amber-50 p-4">
                    <div className="flex gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-orange flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-slate-900 mb-1">5.4 Reembolso</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                          <li>Direito a reembolso em até 7 dias</li>
                          <li>Solicitação: contato@mapadoempreendedor.com.br</li>
                          <li>Processamento: até 10 dias úteis</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              </section>

              <section id="propriedade">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  6. Propriedade Intelectual
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">
                      6.1 Propriedade da Plataforma
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      Todo conteúdo, design, código e metodologias são propriedade exclusiva do
                      Mapa do Empreendedor.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">6.2 Licença de Uso</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Licença limitada, não exclusiva e intransferível para acessar e utilizar a Plataforma.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">
                      6.3 Propriedade dos Relatórios
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      Relatórios gerados pertencem ao usuário pagante para uso interno. Proibida revenda.
                    </p>
                  </div>
                </div>
              </section>

              <section id="privacidade">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  7. Privacidade e Proteção de Dados
                </h2>
                <Card className="border-l-4 border-l-royal-blue bg-blue-50 p-4">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-royal-blue flex-shrink-0 mt-0.5" />
                    <p className="text-slate-600 leading-relaxed">
                      Estamos em conformidade com a LGPD (Lei nº 13.709/2018). Consulte nossa{' '}
                      <Link href="/politica-de-privacidade" className="text-royal-blue hover:underline font-medium">
                        Política de Privacidade
                      </Link>{' '}
                      para detalhes.
                    </p>
                  </div>
                </Card>
              </section>

              <section id="limitacao">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  8. Limitação de Responsabilidade
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">8.1 Natureza Consultiva</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Diagnósticos são ferramentas de apoio à decisão. Não substituem consultoria
                      individualizada.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">
                      8.2 Sem Garantias de Resultados
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      Não garantimos resultados financeiros específicos.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">8.3 Limitação de Danos</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Não nos responsabilizamos por lucros cessantes, perdas indiretas ou decisões
                      empresariais baseadas nos relatórios.
                    </p>
                  </div>
                </div>
              </section>

              <section id="rescisao">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  9. Rescisão
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">9.1 Por Parte do Usuário</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Encerramento via email: contato@mapadoempreendedor.com.br
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">
                      9.2 Por Parte da Plataforma
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      Suspensão em caso de violação dos termos.
                    </p>
                  </div>
                </div>
              </section>

              <section id="modificacoes">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  10. Modificações dos Termos
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Reservamos direito de modificar estes termos. Notificação por email e na plataforma.
                </p>
              </section>

              <section id="lei">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  11. Lei Aplicável e Foro
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Regidos pelas leis do Brasil. Foro: [Cidade], [Estado].
                </p>
              </section>

              <section id="contato">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  12. Contato
                </h2>
                <Card className="p-6 bg-slate-50 border-slate-200">
                  <p className="font-medium text-slate-900 mb-2">Mapa do Empreendedor</p>
                  <p className="text-slate-600">Email: contato@mapadoempreendedor.com.br</p>
                  <p className="text-slate-600">DPO: dpo@mapadoempreendedor.com.br</p>
                </Card>
              </section>
            </div>

            <footer className="mt-16 pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-500 mb-3">
                Dúvidas? Entre em contato: contato@mapadoempreendedor.com.br
              </p>
              <Link
                href="/politica-de-privacidade"
                className="text-sm font-semibold text-royal-blue hover:underline"
              >
                Ver também: Política de Privacidade
              </Link>
            </footer>
          </main>
        </div>
      </div>

      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 h-12 w-12 rounded-full bg-royal-blue hover:bg-sky-blue shadow-lg transition-all"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
