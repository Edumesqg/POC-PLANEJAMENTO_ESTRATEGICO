'use client';

import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  Shield,
  X,
  Sparkles,
  Users,
  Target,
  FileText,
} from 'lucide-react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToPayment: () => void;
}

export function PaywallModal({
  isOpen,
  onClose,
  onProceedToPayment,
}: PaywallModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: 'Validacao SWOT com Luna',
      description: 'IA especializada revisa e aprofunda sua analise SWOT',
    },
    {
      icon: Users,
      title: 'Pesquisa de Mercado com Jack',
      description: 'Analise externa: tendencias, concorrencia e oportunidades',
    },
    {
      icon: Target,
      title: 'Estrategia Completa com Nina',
      description: 'Plano de acao com TOWS, OKRs e roadmap personalizado',
    },
    {
      icon: Target,
      title: 'Matriz TOWS Personalizada',
      description: 'Cruzamento estrategico: como usar forcas e minimizar ameacas',
    },
    {
      icon: Target,
      title: 'OKRs e Metas Claras',
      description: 'Objetivos mensuaveis e resultados-chave para 12 meses',
    },
    {
      icon: FileText,
      title: '3 Relatorios em PDF',
      description: 'Documentos profissionais prontos para apresentar',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6"
          onClick={handleOverlayClick}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-[680px] overflow-y-auto rounded-3xl bg-white shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-top-[48%]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="paywall-title"
            aria-describedby="paywall-description"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-10 rounded-lg p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-royal-blue focus:ring-offset-2"
              aria-label="Fechar modal"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="bg-gradient-to-b from-slate-gray to-white px-6 pb-8 pt-12 text-center md:px-12 md:pb-8 md:pt-12">
              <Badge className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-royal-blue to-sky-blue px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-royal-blue/30">
                <span className="text-base">🔓</span>
                Desbloqueie o Diagnostico Completo
              </Badge>

              <h2
                id="paywall-title"
                className="mb-4 text-2xl font-bold leading-tight text-navy-blue md:text-3xl"
              >
                Tenha acesso a analise estrategica completa
              </h2>

              <p
                id="paywall-description"
                className="mx-auto max-w-[540px] text-base leading-relaxed text-gray-600 md:text-lg"
              >
                Nossa IA avancada e agentes especialistas avaliam sua SWOT e
                montam um plano completo com TOWS, OKRs e Roadmap de Acoes.
              </p>
            </div>

            <div className="border-y border-gray-200 bg-white px-6 py-8 text-center md:px-12">
              <div className="mb-3 flex items-baseline justify-center gap-2">
                <span className="text-2xl font-semibold text-gray-500 md:text-3xl">
                  R$
                </span>
                <span className="text-5xl font-bold text-navy-blue md:text-6xl">
                  50
                </span>
                <span className="ml-2 text-base font-medium text-gray-400 md:text-lg">
                  pagamento unico
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-600 md:gap-4 md:text-base">
                <span className="flex items-center gap-1.5">
                  <span>⏱️</span>
                  Entrega em ~45 minutos
                </span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center gap-1.5">
                  <span>💳</span>
                  Pagamento seguro via Stripe
                </span>
              </div>
            </div>

            <div className="bg-white px-6 py-8 md:px-12">
              <h3 className="mb-6 text-lg font-semibold text-gray-900">
                O que esta incluido:
              </h3>

              <div className="space-y-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-gray/50"
                    >
                      <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-green" />
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-gray-900">
                          {feature.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white px-6 pb-8 pt-4 text-center md:px-12 md:pb-12">
              <Button
                onClick={onProceedToPayment}
                className="mb-4 h-auto w-full bg-gradient-to-r from-emerald-green to-[#059669] px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-green/40 transition-all hover:translate-y-[-2px] hover:shadow-xl hover:shadow-emerald-green/50 active:scale-[0.98] md:text-lg"
              >
                Quero meu Plano Estrategico Completo →
              </Button>

              <div className="mb-5 flex items-center justify-center gap-2 text-sm text-gray-700">
                <Shield className="h-4 w-4 text-emerald-green" />
                <span>
                  Garantia de satisfacao. Reembolso simples em ate 7 dias.
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-gray-500 md:gap-6 md:text-sm">
                <span className="flex items-center gap-1.5">
                  <span>🔒</span>
                  LGPD Compliant
                </span>
                <span className="flex items-center gap-1.5">
                  <span>🔐</span>
                  Pagamento Seguro
                </span>
                <span className="flex items-center gap-1.5">
                  <span>🇧🇷</span>
                  Plataforma Brasileira
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
}
