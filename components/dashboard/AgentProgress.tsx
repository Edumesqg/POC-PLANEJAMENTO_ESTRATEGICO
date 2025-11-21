'use client';

import { Brain, Search, Sparkles, Lightbulb } from 'lucide-react';

type AgentStatus = 'completed' | 'in_progress' | 'waiting';

interface Agent {
  id: string;
  name: string;
  description: string;
  emoji: string;
  icon: React.ElementType;
  bgColor: string;
  status: AgentStatus;
}

interface AgentProgressProps {
  currentAgent?: 'luna' | 'jack' | 'nina' | null;
  completedAgents?: string[];
}

export function AgentProgress({
  currentAgent = null,
  completedAgents = [],
}: AgentProgressProps) {
  const agents: Agent[] = [
    {
      id: 'luna',
      name: 'Luna',
      description: 'Especialista em análise SWOT',
      emoji: '🌙',
      icon: Brain,
      bgColor: 'bg-blue-50',
      status: completedAgents.includes('luna')
        ? 'completed'
        : currentAgent === 'luna'
          ? 'in_progress'
          : 'waiting',
    },
    {
      id: 'jack',
      name: 'Jack',
      description: 'Pesquisa de mercado',
      emoji: '🔍',
      icon: Search,
      bgColor: 'bg-amber-50',
      status: completedAgents.includes('jack')
        ? 'completed'
        : currentAgent === 'jack'
          ? 'in_progress'
          : 'waiting',
    },
    {
      id: 'nina',
      name: 'Nina',
      description: 'Estratégia e plano de ação',
      emoji: '⭐',
      icon: Sparkles,
      bgColor: 'bg-emerald-50',
      status: completedAgents.includes('nina')
        ? 'completed'
        : currentAgent === 'nina'
          ? 'in_progress'
          : 'waiting',
    },
  ];

  const completedCount = completedAgents.length;
  const totalCount = agents.length;
  const progressPercent = (completedCount / totalCount) * 100;

  const statusBadge = (status: AgentStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-green">
            ✅ Completo
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-orange">
            🔄 Em andamento
          </span>
        );
      case 'waiting':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400">
            ⏸️ Aguardando
          </span>
        );
    }
  };

  const getTip = () => {
    if (completedCount === 0) {
      return 'Seja detalhado nas suas respostas para Luna. Quanto mais informações, melhor a análise!';
    }
    if (completedCount === 1) {
      return 'Ótimo! Agora Jack vai pesquisar seu mercado. Isso pode levar até 20 minutos.';
    }
    if (completedCount === 2) {
      return 'Quase lá! Nina está criando seu plano estratégico personalizado.';
    }
    return 'Parabéns! Todos os agentes completaram suas análises. Seus relatórios estão prontos!';
  };

  const estimatedTime = () => {
    const remaining = totalCount - completedCount;
    if (remaining === 0) return '0 minutos';
    return `~${remaining * 20} minutos`;
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-gradient-to-b from-slate-gray/50 to-white p-6">
        <h3 className="mb-5 text-lg font-bold text-navy-blue">
          Seus agentes de IA
        </h3>

        <div className="space-y-4">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.id}
                className={`flex items-start gap-4 pb-4 ${
                  index < agents.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${agent.bgColor}`}
                >
                  <span className="text-2xl">{agent.emoji}</span>
                </div>

                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <h4 className="text-base font-bold text-navy-blue">
                      {agent.name}
                    </h4>
                    {statusBadge(agent.status)}
                  </div>
                  <p className="text-sm text-gray-600">{agent.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-gradient-to-b from-slate-gray/50 to-white p-6">
        <h3 className="mb-5 text-lg font-bold text-navy-blue">Seu progresso</h3>

        <div className="mb-4">
          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-gradient-to-r from-emerald-green to-emerald-green/80 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <p className="mb-3 text-sm font-medium text-gray-600">
          {completedCount} de {totalCount} etapas concluídas
        </p>

        <p className="flex items-center gap-2 text-xs text-gray-500">
          ⏱️ Tempo restante: {estimatedTime()}
        </p>
      </div>

      <div className="rounded-2xl border-l-4 border-sky-blue bg-gradient-to-br from-blue-50 to-white p-5">
        <div className="mb-2 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-orange" />
          <h4 className="text-sm font-bold text-carbon">Dica</h4>
        </div>
        <p className="text-sm leading-relaxed text-gray-600">{getTip()}</p>
      </div>
    </div>
  );
}
