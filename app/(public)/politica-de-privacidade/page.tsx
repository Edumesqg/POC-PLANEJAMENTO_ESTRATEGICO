'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowUp, Info, AlertTriangle, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function PoliticaDePrivacidadePage() {
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
    { id: 'introducao', title: 'Introdução' },
    { id: 'dados-coletados', title: 'Dados Coletados' },
    { id: 'finalidade', title: 'Finalidade do Tratamento' },
    { id: 'compartilhamento', title: 'Compartilhamento de Dados' },
    { id: 'armazenamento', title: 'Armazenamento e Segurança' },
    { id: 'direitos', title: 'Seus Direitos (LGPD)' },
    { id: 'cookies', title: 'Cookies' },
    { id: 'menores', title: 'Menores de Idade' },
    { id: 'alteracoes', title: 'Alterações nesta Política' },
    { id: 'legislacao', title: 'Legislação e Foro' },
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
              <span className="text-slate-900">Política de Privacidade</span>
            </nav>

            <header className="mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-navy-blue mb-2 tracking-tight">
                Política de Privacidade
              </h1>
              <p className="text-sm text-slate-400">Última atualização: Janeiro de 2025</p>
            </header>

            <div className="lg:hidden mb-8">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="introducao" id="introducao">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    1. Introdução
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed space-y-3">
                    <p>
                      A Mapa do Empreendedor respeita sua privacidade e está comprometida em proteger seus
                      dados pessoais em conformidade com a LGPD (Lei nº 13.709/2018).
                    </p>
                    <p className="font-medium text-slate-900">Responsável: Eduardo Mesquita</p>
                    <p>DPO: dpo@mapadoempreendedor.com.br</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="dados-coletados-mobile" id="dados-coletados-mobile">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    2. Dados Coletados
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">2.1 Dados de Identificação</h4>
                      <p>Nome completo, Email, Senha (criptografada), Telefone</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">2.2 Dados Empresariais</h4>
                      <p>Nome da empresa, Setor, Tempo de mercado, Faturamento, Desafios, Objetivos</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">2.3 Dados de Navegação</h4>
                      <p>IP, Navegador, Páginas visitadas, Cookies</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">2.4 Dados de Pagamento</h4>
                      <p>Processados por Stripe (não armazenamos dados de cartão)</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="finalidade-mobile" id="finalidade-mobile">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    3. Finalidade do Tratamento
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">3.1 Execução do Serviço</h4>
                      <p>Gerar análises SWOT e relatórios estratégicos</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">3.2 Gestão de Conta</h4>
                      <p>Criar conta, autenticar, processar pagamentos</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">3.3 Comunicação</h4>
                      <p>Emails transacionais, suporte, marketing (com consentimento)</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">3.4 Melhorias</h4>
                      <p>Análises anonimizadas para melhorar algoritmos</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="compartilhamento-mobile" id="compartilhamento-mobile">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    4. Compartilhamento de Dados
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed space-y-3">
                    <p className="font-medium text-slate-900">Não vendemos seus dados.</p>
                    <p>Compartilhamos apenas com:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Supabase (armazenamento)</li>
                      <li>Stripe (pagamentos)</li>
                      <li>OpenAI (análises)</li>
                      <li>Perplexity (pesquisas)</li>
                      <li>Vercel (hospedagem)</li>
                    </ul>
                    <p className="text-sm">
                      Todos com medidas de segurança adequadas e conformidade LGPD.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="armazenamento-mobile" id="armazenamento-mobile">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    5. Armazenamento e Segurança
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">5.1 Onde Armazenamos</h4>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Supabase PostgreSQL (criptografia AES-256)</li>
                        <li>Supabase Storage (PDFs)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">5.2 Medidas de Segurança</h4>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Criptografia em trânsito (HTTPS/TLS) e repouso (AES-256)</li>
                        <li>Senhas hash (bcrypt)</li>
                        <li>Controle de acesso (RBAC)</li>
                        <li>Backups diários</li>
                        <li>Monitoramento 24/7</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">5.3 Período de Retenção</h4>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Cadastro: enquanto conta ativa</li>
                        <li>Diagnósticos: 12 meses após inatividade</li>
                        <li>Logs: 6 meses</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="direitos-mobile" id="direitos-mobile">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    6. Seus Direitos (LGPD)
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed space-y-3">
                    <p>Como titular, você tem direito a:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Confirmação e acesso aos seus dados</li>
                      <li>Correção de dados inexatos</li>
                      <li>Anonimização/eliminação de dados</li>
                      <li>Portabilidade (receber em formato estruturado)</li>
                      <li>Exclusão de conta e dados</li>
                      <li>Revogação de consentimento</li>
                    </ul>
                    <p className="font-medium text-slate-900 mt-4">
                      Como exercer: dpo@mapadoempreendedor.com.br (resposta em 15 dias)
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cookies-mobile" id="cookies-mobile">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    7. Cookies
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed space-y-3">
                    <p className="font-medium text-slate-900">Tipos:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Essenciais: Autenticação, segurança (obrigatórios)</li>
                      <li>Funcionais: Preferências (30 dias)</li>
                      <li>Analíticos: Estatísticas anonimizadas (365 dias)</li>
                    </ul>
                    <p className="text-sm mt-4">
                      Você pode gerenciar nas configurações do navegador.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="menores-mobile" id="menores-mobile">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    8. Menores de Idade
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    <p>Plataforma não é direcionada a menores de 18 anos.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="alteracoes-mobile" id="alteracoes-mobile">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    9. Alterações nesta Política
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    <p>Notificação por email e banner na plataforma.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="legislacao-mobile" id="legislacao-mobile">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    10. Legislação e Foro
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    <p>Regida pela LGPD. Foro: [Cidade], [Estado].</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="contato-mobile" id="contato-mobile">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900">
                    11. Contato
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed space-y-2">
                    <p>Email: contato@mapadoempreendedor.com.br</p>
                    <p>DPO: dpo@mapadoempreendedor.com.br</p>
                    <a
                      href="https://www.gov.br/anpd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-royal-blue hover:underline inline-flex items-center gap-1"
                    >
                      ANPD <ExternalLink className="h-3 w-3" />
                    </a>
                    <span className="text-sm"> (para reclamações)</span>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="hidden lg:block space-y-12">
              <section id="introducao">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Introdução</h2>
                <Card className="border-l-4 border-l-royal-blue bg-blue-50 p-4 mb-4">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-royal-blue flex-shrink-0 mt-0.5" />
                    <p className="text-slate-600 leading-relaxed">
                      A Mapa do Empreendedor respeita sua privacidade e está comprometida em proteger seus
                      dados pessoais em conformidade com a LGPD (Lei nº 13.709/2018).
                    </p>
                  </div>
                </Card>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Responsável:</strong> Eduardo Mesquita<br />
                  <strong>DPO:</strong> dpo@mapadoempreendedor.com.br
                </p>
              </section>

              <section id="dados-coletados">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Dados Coletados</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">
                      2.1 Dados de Identificação
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      Nome completo, Email, Senha (criptografada), Telefone
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">2.2 Dados Empresariais</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Nome da empresa, Setor, Tempo de mercado, Faturamento, Desafios, Objetivos
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">2.3 Dados de Navegação</h3>
                    <p className="text-slate-600 leading-relaxed">
                      IP, Navegador, Páginas visitadas, Cookies
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">2.4 Dados de Pagamento</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Processados por Stripe (não armazenamos dados de cartão)
                    </p>
                  </div>
                </div>
              </section>

              <section id="finalidade">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  3. Finalidade do Tratamento
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">3.1 Execução do Serviço</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Gerar análises SWOT e relatórios estratégicos
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">3.2 Gestão de Conta</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Criar conta, autenticar, processar pagamentos
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">3.3 Comunicação</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Emails transacionais, suporte, marketing (com consentimento)
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">3.4 Melhorias</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Análises anonimizadas para melhorar algoritmos
                    </p>
                  </div>
                </div>
              </section>

              <section id="compartilhamento">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  4. Compartilhamento de Dados
                </h2>
                <Card className="border-l-4 border-l-amber-orange bg-amber-50 p-4 mb-4">
                  <div className="flex gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-orange flex-shrink-0 mt-0.5" />
                    <p className="text-slate-900 font-semibold">Não vendemos seus dados.</p>
                  </div>
                </Card>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Compartilhamos apenas com:
                </p>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="bg-slate-50">Serviço</TableHead>
                        <TableHead className="bg-slate-50">Finalidade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Supabase</TableCell>
                        <TableCell>Armazenamento de dados e arquivos</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Stripe</TableCell>
                        <TableCell>Processamento de pagamentos</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">OpenAI</TableCell>
                        <TableCell>Geração de análises estratégicas</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Perplexity</TableCell>
                        <TableCell>Pesquisas de mercado</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Vercel</TableCell>
                        <TableCell>Hospedagem da plataforma</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <p className="text-sm text-slate-600 mt-4">
                  Todos com medidas de segurança adequadas e conformidade LGPD.
                </p>
              </section>

              <section id="armazenamento">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  5. Armazenamento e Segurança
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">5.1 Onde Armazenamos</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-600">
                      <li>Supabase PostgreSQL (criptografia AES-256)</li>
                      <li>Supabase Storage (PDFs)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">
                      5.2 Medidas de Segurança
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-600">
                      <li>Criptografia em trânsito (HTTPS/TLS) e repouso (AES-256)</li>
                      <li>Senhas hash (bcrypt)</li>
                      <li>Controle de acesso (RBAC)</li>
                      <li>Backups diários</li>
                      <li>Monitoramento 24/7</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">
                      5.3 Período de Retenção
                    </h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="bg-slate-50">Tipo de Dado</TableHead>
                          <TableHead className="bg-slate-50">Período de Retenção</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Cadastro</TableCell>
                          <TableCell>Enquanto conta ativa</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Diagnósticos</TableCell>
                          <TableCell>12 meses após inatividade</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Logs</TableCell>
                          <TableCell>6 meses</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </section>

              <section id="direitos">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  6. Seus Direitos (LGPD)
                </h2>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Como titular, você tem direito a:
                </p>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex gap-3">
                    <ChevronRight className="h-5 w-5 text-royal-blue flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Confirmação e acesso</strong> aos seus dados
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <ChevronRight className="h-5 w-5 text-royal-blue flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Correção</strong> de dados inexatos
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <ChevronRight className="h-5 w-5 text-royal-blue flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Anonimização/eliminação</strong> de dados
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <ChevronRight className="h-5 w-5 text-royal-blue flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Portabilidade</strong> (receber em formato
                      estruturado)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <ChevronRight className="h-5 w-5 text-royal-blue flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Exclusão</strong> de conta e dados
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <ChevronRight className="h-5 w-5 text-royal-blue flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Revogação de consentimento</strong>
                    </span>
                  </li>
                </ul>
                <Card className="p-6 bg-slate-50 border-slate-200 mt-6">
                  <p className="font-medium text-slate-900 mb-2">Como exercer seus direitos:</p>
                  <p className="text-slate-600">
                    Email: dpo@mapadoempreendedor.com.br<br />
                    Prazo de resposta: 15 dias
                  </p>
                </Card>
              </section>

              <section id="cookies">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Cookies</h2>
                <p className="text-slate-600 leading-relaxed mb-4">Tipos de cookies utilizados:</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="bg-slate-50">Tipo</TableHead>
                      <TableHead className="bg-slate-50">Finalidade</TableHead>
                      <TableHead className="bg-slate-50">Duração</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Essenciais</TableCell>
                      <TableCell>Autenticação, segurança</TableCell>
                      <TableCell>Obrigatórios</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Funcionais</TableCell>
                      <TableCell>Preferências do usuário</TableCell>
                      <TableCell>30 dias</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Analíticos</TableCell>
                      <TableCell>Estatísticas anonimizadas</TableCell>
                      <TableCell>365 dias</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <p className="text-sm text-slate-600 mt-4">
                  Você pode gerenciar cookies nas configurações do seu navegador.
                </p>
              </section>

              <section id="menores">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Menores de Idade</h2>
                <p className="text-slate-600 leading-relaxed">
                  Plataforma não é direcionada a menores de 18 anos.
                </p>
              </section>

              <section id="alteracoes">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  9. Alterações nesta Política
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Notificação por email e banner na plataforma.
                </p>
              </section>

              <section id="legislacao">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  10. Legislação e Foro
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Regida pela LGPD. Foro: [Cidade], [Estado].
                </p>
              </section>

              <section id="contato">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">11. Contato</h2>
                <Card className="p-6 bg-slate-50 border-slate-200">
                  <p className="text-slate-600 mb-2">
                    <strong className="text-slate-900">Email:</strong> contato@mapadoempreendedor.com.br
                  </p>
                  <p className="text-slate-600 mb-4">
                    <strong className="text-slate-900">DPO:</strong> dpo@mapadoempreendedor.com.br
                  </p>
                  <a
                    href="https://www.gov.br/anpd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-royal-blue hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    ANPD - Autoridade Nacional de Proteção de Dados
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <p className="text-sm text-slate-600 mt-1">(para reclamações)</p>
                </Card>
              </section>
            </div>

            <footer className="mt-16 pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-500 mb-3">
                Dúvidas? Entre em contato: contato@mapadoempreendedor.com.br
              </p>
              <Link
                href="/termos-de-uso"
                className="text-sm font-semibold text-royal-blue hover:underline"
              >
                Ver também: Termos de Uso
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
