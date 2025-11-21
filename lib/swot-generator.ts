export interface SwotItem {
  id: number;
  texto: string;
  relevancia?: 'alta' | 'media' | 'baixa';
  potencial?: 'alto' | 'medio' | 'baixo';
  criticidade?: 'alta' | 'media' | 'baixa';
  urgencia?: 'alta' | 'media' | 'baixa';
}

export interface SwotData {
  strengths: SwotItem[];
  weaknesses: SwotItem[];
  opportunities: SwotItem[];
  threats: SwotItem[];
}

export function generateMockSwot(formData: any): SwotData {
  const forcas: SwotItem[] = [];
  const fraquezas: SwotItem[] = [];
  const oportunidades: SwotItem[] = [];
  const ameacas: SwotItem[] = [];

  let idCounter = 1;

  if (
    formData.experiencia === '3-5anos' ||
    formData.experiencia === '6-10anos' ||
    formData.experiencia === '>10anos'
  ) {
    forcas.push({
      id: idCounter++,
      texto: 'Experiência consolidada no mercado',
      relevancia: 'alta',
    });
  }

  if (
    formData.diferenciacaoCompetitiva?.includes('atendimento') ||
    formData.diferenciacaoCompetitiva?.includes('qualidade')
  ) {
    forcas.push({
      id: idCounter++,
      texto: 'Diferencial competitivo reconhecido pelos clientes',
      relevancia: 'alta',
    });
  }

  if (
    formData.situacaoFinanceira === 'lucro-crescente' ||
    formData.situacaoFinanceira === 'excelente'
  ) {
    forcas.push({
      id: idCounter++,
      texto: 'Saúde financeira estável e consistente',
      relevancia: 'alta',
    });
  }

  if (formData.equipe && formData.equipe !== 'so-eu') {
    forcas.push({
      id: idCounter++,
      texto: 'Equipe formada e operação estruturada',
      relevancia: 'media',
    });
  }

  if (forcas.length < 3) {
    forcas.push({
      id: idCounter++,
      texto: 'Conhecimento profundo do negócio e setor',
      relevancia: 'media',
    });
  }

  idCounter = 1;

  if (
    formData.situacaoFinanceira === 'prejuizo' ||
    formData.situacaoFinanceira === 'equilibrio'
  ) {
    fraquezas.push({
      id: idCounter++,
      texto: 'Margem de lucro limitada ou insuficiente',
      criticidade: 'alta',
    });
  }

  if (formData.maiorDesafio === 'aquisicao') {
    fraquezas.push({
      id: idCounter++,
      texto: 'Dificuldade em atrair novos clientes',
      criticidade: 'alta',
    });
  }

  if (
    formData.nivelDigitalizacao === 'zero' ||
    formData.nivelDigitalizacao === 'basico'
  ) {
    fraquezas.push({
      id: idCounter++,
      texto: 'Presença digital insuficiente ou inexistente',
      criticidade: 'media',
    });
  }

  if (formData.maiorDesafio === 'tempo') {
    fraquezas.push({
      id: idCounter++,
      texto: 'Sobrecarga operacional e falta de tempo',
      criticidade: 'media',
    });
  }

  if (fraquezas.length < 3) {
    fraquezas.push({
      id: idCounter++,
      texto: 'Processos não documentados ou padronizados',
      criticidade: 'media',
    });
  }

  idCounter = 1;

  if (
    formData.nivelDigitalizacao === 'basico' ||
    formData.nivelDigitalizacao === 'zero'
  ) {
    oportunidades.push({
      id: idCounter++,
      texto: 'Expansão para canais digitais e online',
      potencial: 'alto',
    });
  }

  if (formData.objetivoPrincipal === 'expandir') {
    oportunidades.push({
      id: idCounter++,
      texto: 'Explorar novos mercados ou produtos',
      potencial: 'alto',
    });
  }

  if (formData.setor === 'alimentacao') {
    oportunidades.push({
      id: idCounter++,
      texto: 'Delivery e plataformas de entrega',
      potencial: 'alto',
    });
  }

  if (formData.objetivoPrincipal === 'marca') {
    oportunidades.push({
      id: idCounter++,
      texto: 'Fortalecimento de marca através de marketing digital',
      potencial: 'medio',
    });
  }

  if (oportunidades.length < 3) {
    oportunidades.push({
      id: idCounter++,
      texto: 'Parcerias estratégicas com fornecedores ou complementares',
      potencial: 'medio',
    });
  }

  if (oportunidades.length < 4) {
    oportunidades.push({
      id: idCounter++,
      texto: 'Automação de processos para ganho de eficiência',
      potencial: 'medio',
    });
  }

  idCounter = 1;

  if (
    formData.concorrenciaPercebida === 'alta' ||
    formData.concorrenciaPercebida === 'muito-alta'
  ) {
    ameacas.push({
      id: idCounter++,
      texto: 'Concorrência acirrada no mercado',
      urgencia: 'alta',
    });
  }

  if (formData.maiorDesafio === 'dependencia') {
    ameacas.push({
      id: idCounter++,
      texto: 'Dependência de poucos clientes',
      urgencia: 'alta',
    });
  }

  if (formData.maiorDesafio === 'precificacao') {
    ameacas.push({
      id: idCounter++,
      texto: 'Pressão sobre preços e margens',
      urgencia: 'media',
    });
  }

  ameacas.push({
    id: idCounter++,
    texto: 'Mudanças nas preferências dos consumidores',
    urgencia: 'baixa',
  });

  if (ameacas.length < 3) {
    ameacas.push({
      id: idCounter++,
      texto: 'Instabilidade econômica e inflação',
      urgencia: 'media',
    });
  }

  return {
    strengths: forcas,
    weaknesses: fraquezas,
    opportunities: oportunidades,
    threats: ameacas,
  };
}

export function getSetorLabel(setor: string): string {
  const setorMap: Record<string, string> = {
    comercio: 'Comércio',
    servicos: 'Serviços',
    educacao: 'Educação',
    saude: 'Saúde',
    industria: 'Indústria',
    alimentacao: 'Alimentação',
    agro: 'Agronegócio',
    tecnologia: 'Tecnologia',
    outro: 'Outro',
  };

  return setorMap[setor] || 'Outro';
}

export function getExperienciaLabel(experiencia: string): string {
  const experienciaMap: Record<string, string> = {
    '<1ano': 'Menos de 1 ano',
    '1-2anos': '1-2 anos',
    '3-5anos': '3-5 anos',
    '6-10anos': '6-10 anos',
    '>10anos': 'Mais de 10 anos',
  };

  return experienciaMap[experiencia] || 'N/A';
}
