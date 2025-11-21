'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  CheckCircle2,
  Loader2,
  Circle,
  FileQuestion,
  Download,
} from 'lucide-react';

type DiagnosticStatus = 'none' | 'processing' | 'completed';

interface DiagnosticCardProps {
  status: DiagnosticStatus;
  empresaNome?: string;
  setor?: string;
  criadoEm?: string;
  currentStep?: number;
}

export function DiagnosticCard({
  status,
  empresaNome = 'Padaria do João',
  setor = 'Alimentação',
  criadoEm = '28 de outubro, 2025',
  currentStep = 1,
}: DiagnosticCardProps) {
  if (status === 'none') {
    return (
      <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-slate-gray p-16 text-center">
        <FileQuestion className="mx-auto mb-6 h-16 w-16 text-gray-400" />
        <h3 className="mb-2 text-xl font-semibold text-carbon">
          Você ainda não tem diagnósticos
        </h3>
        <p className="mb-6 text-base text-gray-600">
          Crie seu primeiro diagnóstico estratégico agora
        </p>
        <Button
          asChild
          className="h-auto rounded-xl bg-emerald-green px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-[#059669]"
        >
          <Link href="/boas-vindas">Começar Novo Diagnóstico 🚀</Link>
        </Button>
      </div>
    );
  }

  const steps = [
    {
      name: 'Análise SWOT validada por Luna',
      completed: currentStep >= 1,
      inProgress: currentStep === 1,
    },
    {
      name: 'Pesquisa de mercado com Jack',
      completed: currentStep >= 2,
      inProgress: currentStep === 2,
    },
    {
      name: 'Estratégia completa com Nina',
      completed: currentStep >= 3,
      inProgress: currentStep === 3,
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-sky-blue bg-gradient-to-br from-blue-50 to-white shadow-[0_4px_16px_rgba(66,165,245,0.15)]">
      <div className="p-8">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <Badge
              className={`mb-4 ${
                status === 'completed'
                  ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-50'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-50'
              }`}
            >
              {status === 'completed' ? '✅ Completo' : '🔄 Em processamento'}
            </Badge>

            <h3 className="mb-2 text-2xl font-bold text-navy-blue">
              {empresaNome}
            </h3>

            <div className="flex gap-4 text-sm text-gray-600">
              <span>Setor: {setor}</span>
              <span>•</span>
              <span>Criado em: {criadoEm}</span>
            </div>
          </div>

          <Sparkles className="h-16 w-16 text-sky-blue opacity-30" />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h4 className="mb-5 text-base font-semibold text-carbon">
            Etapas concluídas:
          </h4>

          <div className="space-y-4">
            {steps.map((step, index) => {
              let icon;
              let textColor;
              let statusText = '';

              if (step.completed) {
                icon = <CheckCircle2 className="h-5 w-5 text-emerald-green" />;
                textColor = 'text-carbon';
                statusText = 'Concluída';
              } else if (step.inProgress) {
                icon = (
                  <Loader2 className="h-5 w-5 animate-spin text-amber-orange" />
                );
                textColor = 'text-amber-orange';
                statusText = 'Em andamento... (~20 min)';
              } else {
                icon = <Circle className="h-5 w-5 text-gray-300" />;
                textColor = 'text-gray-400';
                statusText = 'Aguardando';
              }

              return (
                <div
                  key={index}
                  className={`flex items-center justify-between py-3 ${
                    index < steps.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {icon}
                    <span className={`text-sm font-medium ${textColor}`}>
                      {step.name}
                    </span>
                  </div>
                  <span className={`text-xs font-medium ${textColor}`}>
                    {statusText}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm font-medium text-gray-600">
            ⏱️ Tempo estimado restante: ~{(3 - currentStep) * 20} minutos
          </div>
        </div>

        {status === 'processing' && (
          <Button
            className="mt-6 h-auto rounded-xl border-2 border-royal-blue bg-white px-6 py-3 text-sm font-semibold text-royal-blue transition-all hover:bg-blue-50"
          >
            Atualizar status
          </Button>
        )}

        {status === 'completed' && (
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              asChild
              className="h-auto rounded-xl bg-royal-blue px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#1565C0]"
            >
              <Link href="/dashboard/relatorios/swot">Ver Relatório SWOT →</Link>
            </Button>
            <Button
              asChild
              className="h-auto rounded-xl border-2 border-royal-blue bg-white px-6 py-3 text-sm font-semibold text-royal-blue transition-all hover:bg-blue-50"
            >
              <Link href="/dashboard/relatorios/mercado">
                Ver Análise Externa →
              </Link>
            </Button>
            <Button
              asChild
              className="h-auto rounded-xl bg-emerald-green px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#059669]"
            >
              <Link href="/dashboard/relatorios/estrategia">
                Ver Plano Estratégico →
              </Link>
            </Button>
            <Button className="h-auto rounded-xl border-2 border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-carbon transition-all hover:bg-slate-gray">
              <Download className="mr-2 h-4 w-4" />
              Download Tudo (ZIP)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
