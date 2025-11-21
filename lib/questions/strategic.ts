import { Question } from '@/types/form';

export const strategicQuestions: Question[] = [
  {
    id: 'situacaoFinanceira',
    number: 6,
    label: 'Como está a situação financeira do seu negócio hoje?',
    microcopy: 'Seja honesto — isso me ajuda a dar recomendações mais precisas',
    type: 'radio',
    options: [
      {
        value: 'prejuizo',
        label: 'Tenho prejuízo ou mal consigo pagar as contas',
      },
      {
        value: 'equilibrio',
        label: 'Cubro as contas, mas não sobra muito',
      },
      {
        value: 'lucro-pequeno',
        label: 'Consigo guardar um pouco todo mês',
      },
      {
        value: 'lucro-crescente',
        label: 'Lucro consistente e em crescimento',
      },
      {
        value: 'excelente',
        label: 'Estou muito bem financeiramente',
      },
    ],
  },
  {
    id: 'objetivoPrincipal',
    number: 7,
    label: 'Qual o seu principal objetivo para os próximos 12 meses?',
    microcopy: 'Escolha apenas 1 — o mais importante agora',
    type: 'radio',
    options: [
      {
        value: 'aumentar-vendas',
        label: 'Aumentar as vendas e faturamento',
      },
      {
        value: 'aumentar-lucro',
        label: 'Melhorar a lucratividade (margem)',
      },
      {
        value: 'expandir',
        label: 'Expandir para novos mercados ou produtos',
      },
      {
        value: 'eficiencia',
        label: 'Melhorar processos e eficiência operacional',
      },
      {
        value: 'marca',
        label: 'Fortalecer a marca e presença digital',
      },
      {
        value: 'equipe',
        label: 'Contratar e formar uma equipe melhor',
      },
    ],
  },
  {
    id: 'maiorDesafio',
    number: 8,
    label: 'Qual o maior desafio que você enfrenta hoje?',
    microcopy: 'O problema que mais tira seu sono',
    type: 'radio',
    options: [
      {
        value: 'aquisicao',
        label: 'Atrair novos clientes',
      },
      {
        value: 'retencao',
        label: 'Reter clientes e evitar cancelamentos',
      },
      {
        value: 'financeiro',
        label: 'Gestão financeira e fluxo de caixa',
      },
      {
        value: 'tempo',
        label: 'Falta de tempo para tudo',
      },
      {
        value: 'precificacao',
        label: 'Dificuldade em precificar corretamente',
      },
      {
        value: 'concorrencia',
        label: 'Concorrência muito forte',
      },
      {
        value: 'dependencia',
        label: 'Dependência de poucos clientes',
      },
    ],
  },
  {
    id: 'diferenciacaoCompetitiva',
    number: 9,
    label: 'O que diferencia o seu negócio da concorrência?',
    microcopy: 'Pode escolher mais de uma opção',
    type: 'checkbox',
    options: [
      {
        value: 'preco',
        label: 'Preço mais baixo',
        icon: 'DollarSign',
        color: '#10B981',
      },
      {
        value: 'qualidade',
        label: 'Qualidade superior',
        icon: 'Award',
        color: '#F59E0B',
      },
      {
        value: 'atendimento',
        label: 'Atendimento personalizado',
        icon: 'Heart',
        color: '#EF4444',
      },
      {
        value: 'velocidade',
        label: 'Velocidade/Agilidade',
        icon: 'Zap',
        color: '#42A5F5',
      },
      {
        value: 'localizacao',
        label: 'Localização privilegiada',
        icon: 'MapPin',
        color: '#10B981',
      },
      {
        value: 'inovacao',
        label: 'Inovação/Tecnologia',
        icon: 'Lightbulb',
        color: '#F59E0B',
      },
      {
        value: 'tradicao',
        label: 'Tradição/Reputação',
        icon: 'Shield',
        color: '#0D47A1',
      },
      {
        value: 'nao-sei',
        label: 'Ainda não sei bem',
        icon: 'HelpCircle',
        color: '#9CA3AF',
      },
    ],
  },
  {
    id: 'nivelDigitalizacao',
    number: 10,
    label: 'Como você avalia a presença digital do seu negócio?',
    microcopy: 'Redes sociais, site, e-commerce, etc.',
    type: 'radio',
    options: [
      {
        value: 'zero',
        label: 'Praticamente zero — quase não uso digital',
      },
      {
        value: 'basico',
        label: 'Tenho redes sociais, mas uso pouco',
      },
      {
        value: 'social-ativo',
        label: 'Uso redes sociais ativamente',
      },
      {
        value: 'site',
        label: 'Tenho site/e-commerce funcionando',
      },
      {
        value: 'digital-forte',
        label: 'Digital é parte essencial do meu negócio',
      },
    ],
  },
  {
    id: 'capacidadeInvestimento',
    number: 11,
    label: 'Quanto você consegue investir no negócio nos próximos 6 meses?',
    microcopy: 'Seja realista — isso ajuda nas recomendações',
    type: 'radio',
    options: [
      {
        value: 'zero',
        label: 'Não tenho nada para investir agora',
      },
      {
        value: '<5k',
        label: 'Até R$ 5.000',
      },
      {
        value: '5k-20k',
        label: 'R$ 5.000 a R$ 20.000',
      },
      {
        value: '20k-50k',
        label: 'R$ 20.000 a R$ 50.000',
      },
      {
        value: '>50k',
        label: 'Mais de R$ 50.000',
      },
    ],
  },
  {
    id: 'principaisClientes',
    number: 12,
    label: 'Quem são seus principais clientes?',
    microcopy: 'Pode escolher mais de uma opção',
    type: 'checkbox',
    options: [
      {
        value: 'b2c',
        label: 'Consumidor final (B2C)',
        icon: 'Users',
        color: '#0D47A1',
      },
      {
        value: 'b2b',
        label: 'Outras empresas (B2B)',
        icon: 'Building2',
        color: '#0D47A1',
      },
      {
        value: 'b2g',
        label: 'Governo (B2G)',
        icon: 'Landmark',
        color: '#0D47A1',
      },
      {
        value: 'resellers',
        label: 'Revendedores/Distribuidores',
        icon: 'TrendingUp',
        color: '#10B981',
      },
    ],
  },
  {
    id: 'concorrenciaPercebida',
    number: 13,
    label: 'Como você vê a concorrência no seu mercado?',
    microcopy: 'Seja realista sobre o cenário competitivo',
    type: 'radio',
    options: [
      {
        value: 'nenhum',
        label: 'Praticamente não tenho concorrentes',
      },
      {
        value: 'baixa',
        label: 'Tenho alguns concorrentes, mas espaço sobrando',
      },
      {
        value: 'moderada',
        label: 'Concorrência moderada',
      },
      {
        value: 'alta',
        label: 'Mercado bem concorrido',
      },
      {
        value: 'muito-alta',
        label: 'Concorrência extremamente acirrada',
      },
    ],
  },
];
