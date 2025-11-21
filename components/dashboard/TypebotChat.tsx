'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, Sparkles } from 'lucide-react';

type TypebotState = 'not_started' | 'active' | 'processing' | 'completed';

interface TypebotChatProps {
  onStateChange?: (state: TypebotState) => void;
}

export function TypebotChat({ onStateChange }: TypebotChatProps) {
  const [state, setState] = useState<TypebotState>('not_started');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasPaid = localStorage.getItem('hasPaid') === 'true';
      const typebotProgress = localStorage.getItem('typebotProgress');

      if (hasPaid && typebotProgress) {
        try {
          const progress = JSON.parse(typebotProgress);
          setState(progress.state || 'not_started');
        } catch (e) {
          setState('not_started');
        }
      }
    }
  }, []);

  useEffect(() => {
    if (onStateChange) {
      onStateChange(state);
    }
  }, [state, onStateChange]);

  const handleStartChat = () => {
    setState('active');

    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'typebotProgress',
        JSON.stringify({ state: 'active', currentAgent: 'luna', startedAt: Date.now() })
      );
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-royal-blue bg-white shadow-[0_8px_24px_rgba(13,71,161,0.15)]">
      <div className="flex items-center gap-4 bg-gradient-to-r from-royal-blue to-sky-blue px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
          <Bot className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">
            Luna - Especialista em SWOT
          </h3>
          <p className="text-sm text-white/90">
            {state === 'active' ? '🟢 Online' : 'Aguardando você...'}
          </p>
        </div>
      </div>

      <div className="flex min-h-[540px] flex-col items-center justify-center bg-gradient-to-b from-slate-gray/30 to-white p-8">
        {state === 'not_started' && (
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
              <Sparkles className="h-10 w-10 text-royal-blue" />
            </div>
            <h4 className="mb-3 text-2xl font-bold text-navy-blue">
              Pronto para começar?
            </h4>
            <p className="mb-6 max-w-md text-base text-gray-600">
              Vamos refinar sua análise SWOT juntos. Seja detalhado nas respostas para obter insights mais precisos.
            </p>
            <Button
              onClick={handleStartChat}
              className="h-auto rounded-xl bg-gradient-to-r from-royal-blue to-sky-blue px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Iniciar conversa com Luna 🚀
            </Button>
          </div>
        )}

        {state === 'active' && (
          <div className="w-full">
            <div className="mb-6 rounded-lg border-2 border-blue-100 bg-blue-50 p-6">
              <p className="text-center text-base font-medium text-royal-blue">
                💬 Integração Typebot será carregada aqui
              </p>
              <p className="mt-2 text-center text-sm text-gray-600">
                Após pagamento, o chat será ativado automaticamente
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-royal-blue" />
                <div className="flex-1 rounded-2xl rounded-tl-none bg-slate-gray px-4 py-3">
                  <p className="text-sm text-carbon">
                    Olá! Sou a Luna. Vou te ajudar a refinar sua análise SWOT. Vamos começar pelas suas forças: o que seu negócio faz melhor que a concorrência?
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-royal-blue px-4 py-3">
                  <p className="text-sm text-white">
                    [Suas respostas aparecerão aqui quando o Typebot estiver integrado]
                  </p>
                </div>
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-emerald-green" />
              </div>
            </div>
          </div>
        )}

        {state === 'processing' && (
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 h-16 w-16 animate-spin rounded-full border-4 border-slate-gray border-t-royal-blue" />
            <h4 className="mb-2 text-xl font-bold text-navy-blue">
              Luna está processando suas respostas...
            </h4>
            <p className="text-base text-gray-600">
              Isso pode levar alguns minutos
            </p>
          </div>
        )}

        {state === 'completed' && (
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-green/10">
              <span className="text-5xl">✅</span>
            </div>
            <h4 className="mb-3 text-2xl font-bold text-navy-blue">
              Conversa com Luna completa!
            </h4>
            <p className="mb-6 max-w-md text-base text-gray-600">
              Jack está pronto para pesquisar seu mercado
            </p>
            <Button
              className="h-auto rounded-xl bg-emerald-green px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-[#059669]"
            >
              Continuar com Jack →
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
        <p className="text-xs text-gray-500">Powered by Typebot + OpenAI</p>
        <a
          href="/dashboard/ajuda"
          className="text-xs font-medium text-royal-blue transition-colors hover:underline"
        >
          Precisa de ajuda? →
        </a>
      </div>

      <script
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: `
          // TODO: Integrar Typebot real após pagamento
          // 1. Usuário paga → Webhook Stripe envia dados
          // 2. Edge Function cria sessão Typebot
          // 3. Retorna typebot_session_id
          // 4. Frontend exibe Typebot com session_id
          //
          // Exemplo de integração:
          // import Typebot from 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0.3/dist/web.js'
          //
          // Typebot.initBubble({
          //   typebot: "luna-swot-agent-id",
          //   theme: {
          //     button: { backgroundColor: "#0D47A1" },
          //     chatWindow: { backgroundColor: "#FFFFFF" },
          //   },
          //   previewMessage: {
          //     message: "Olá! Sou a Luna, vamos refinar sua análise SWOT?",
          //     autoShowDelay: 2000,
          //   },
          // });
          //
          // Documentação: docs/TYPEBOT_SETUP.md
          `,
        }}
      />
    </div>
  );
}
