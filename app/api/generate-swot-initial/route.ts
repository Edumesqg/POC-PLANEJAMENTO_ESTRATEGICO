import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface SwotItem {
  id: number;
  texto: string;
  relevancia?: 'alta' | 'media' | 'baixa';
  potencial?: 'alto' | 'medio' | 'baixo';
  criticidade?: 'alta' | 'media' | 'baixa';
  urgencia?: 'alta' | 'media' | 'baixa';
  score: number;
}

interface GenerateSwotRequest {
  empresaNome: string;
  setor: string;
  experiencia: string;
  equipe: string;
  receita: string;
  situacaoFinanceira: string;
  objetivoPrincipal: string;
  maiorDesafio: string;
  diferenciacaoCompetitiva: string[];
  nivelDigitalizacao: string;
  capacidadeInvestimento: string;
  principaisClientes: string[];
  concorrenciaPercebida: string;
  observacoesAdicionais?: string;
  [key: string]: any;
}

interface GenerateSwotResponse {
  empresa: string;
  setor: string;
  dataGeracao: string;
  forcas: Omit<SwotItem, 'score'>[];
  fraquezas: Omit<SwotItem, 'score'>[];
  oportunidades: Omit<SwotItem, 'score'>[];
  ameacas: Omit<SwotItem, 'score'>[];
}

export async function POST(request: NextRequest) {
  try {
    const data: GenerateSwotRequest = await request.json();

    if (!data.empresaNome || !data.setor) {
      return NextResponse.json(
        { error: 'Dados incompletos: empresaNome e setor são obrigatórios' },
        { status: 400 }
      );
    }

    const forcas = mapForcas(data);
    const fraquezas = mapFraquezas(data);
    const oportunidades = mapOportunidades(data);
    const ameacas = mapAmeacas(data);

    const response: GenerateSwotResponse = {
      empresa: data.empresaNome,
      setor: data.setor,
      dataGeracao: new Date().toISOString(),
      forcas: forcas.map(({ score, ...item }) => item),
      fraquezas: fraquezas.map(({ score, ...item }) => item),
      oportunidades: oportunidades.map(({ score, ...item }) => item),
      ameacas: ameacas.map(({ score, ...item }) => item),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Erro ao gerar SWOT:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar análise SWOT' },
      { status: 500 }
    );
  }
}

function mapForcas(data: GenerateSwotRequest): SwotItem[] {
  const forcas: SwotItem[] = [];
  let idCounter = 1;

  if (
    data.experiencia === '3-5anos' ||
    data.experiencia === '6-10anos' ||
    data.experiencia === '>10anos'
  ) {
    const anos =
      data.experiencia === '>10anos'
        ? 'mais de 10 anos'
        : data.experiencia === '6-10anos'
        ? '6 a 10 anos'
        : '3 a 5 anos';
    forcas.push({
      id: idCounter++,
      texto: `Experiência consolidada de ${anos} no mercado`,
      relevancia: 'alta',
      score: data.experiencia === '>10anos' ? 10 : data.experiencia === '6-10anos' ? 9 : 8,
    });
  }

  if (
    data.situacaoFinanceira === 'lucro-crescente' ||
    data.situacaoFinanceira === 'excelente'
  ) {
    forcas.push({
      id: idCounter++,
      texto: 'Saúde financeira estável com lucratividade consistente',
      relevancia: 'alta',
      score: data.situacaoFinanceira === 'excelente' ? 10 : 8,
    });
  }

  if (
    Array.isArray(data.diferenciacaoCompetitiva) &&
    data.diferenciacaoCompetitiva.length >= 2 &&
    !data.diferenciacaoCompetitiva.includes('nao-sei')
  ) {
    const diferenciais = data.diferenciacaoCompetitiva
      .filter((d) => d !== 'nao-sei')
      .map((d) => {
        const map: Record<string, string> = {
          qualidade: 'qualidade superior',
          atendimento: 'atendimento personalizado',
          velocidade: 'agilidade de entrega',
          inovacao: 'inovação tecnológica',
          preco: 'preço competitivo',
          localizacao: 'localização privilegiada',
          tradicao: 'tradição e reputação',
        };
        return map[d] || d;
      })
      .slice(0, 2)
      .join(' e ');

    forcas.push({
      id: idCounter++,
      texto: `Diferenciação clara através de ${diferenciais}`,
      relevancia: 'alta',
      score: 9,
    });
  }

  if (
    data.equipe === '6-10' ||
    data.equipe === '11-20' ||
    data.equipe === '>20'
  ) {
    forcas.push({
      id: idCounter++,
      texto: 'Equipe estruturada e capacitada',
      relevancia: 'media',
      score: data.equipe === '>20' ? 8 : 7,
    });
  }

  if (
    data.capacidadeInvestimento === '20k-50k' ||
    data.capacidadeInvestimento === '>50k'
  ) {
    forcas.push({
      id: idCounter++,
      texto: 'Capacidade financeira para investimentos estratégicos',
      relevancia: 'alta',
      score: data.capacidadeInvestimento === '>50k' ? 9 : 8,
    });
  }

  if (
    data.nivelDigitalizacao === 'site' ||
    data.nivelDigitalizacao === 'digital-forte'
  ) {
    forcas.push({
      id: idCounter++,
      texto: 'Presença digital consolidada e ativa',
      relevancia: 'media',
      score: data.nivelDigitalizacao === 'digital-forte' ? 8 : 7,
    });
  }

  if (data.receita === '150-500k' || data.receita === '>500k') {
    forcas.push({
      id: idCounter++,
      texto: 'Receita recorrente e significativa',
      relevancia: 'alta',
      score: data.receita === '>500k' ? 9 : 8,
    });
  }

  if (
    data.concorrenciaPercebida === 'nenhum' ||
    data.concorrenciaPercebida === 'baixa'
  ) {
    forcas.push({
      id: idCounter++,
      texto: 'Posição favorável com baixa concorrência direta',
      relevancia: 'alta',
      score: data.concorrenciaPercebida === 'nenhum' ? 10 : 8,
    });
  }

  if (
    Array.isArray(data.principaisClientes) &&
    data.principaisClientes.length >= 2
  ) {
    forcas.push({
      id: idCounter++,
      texto: 'Diversificação de canais e segmentos de clientes',
      relevancia: 'media',
      score: 7,
    });
  }

  if (data.setor === 'alimentacao' && data.canalVendaAlimentacao === 'mix') {
    forcas.push({
      id: idCounter++,
      texto: 'Múltiplos canais de venda integrados',
      relevancia: 'alta',
      score: 8,
    });
  }

  if (data.setor === 'comercio' && data.controleEstoqueComercio === 'digital') {
    forcas.push({
      id: idCounter++,
      texto: 'Sistema de gestão de estoque digitalizado',
      relevancia: 'media',
      score: 7,
    });
  }

  if (data.setor === 'servicos' && data.precificacaoServicos === 'recorrente') {
    forcas.push({
      id: idCounter++,
      texto: 'Modelo de receita recorrente estabelecido',
      relevancia: 'alta',
      score: 9,
    });
  }

  if (
    data.setor === 'industria' &&
    data.controleQualidadeIndustria === 'sim'
  ) {
    forcas.push({
      id: idCounter++,
      texto: 'Controle de qualidade estruturado e sistematizado',
      relevancia: 'alta',
      score: 8,
    });
  }

  if (data.setor === 'agro' && data.certificacoesAgro === 'sim') {
    forcas.push({
      id: idCounter++,
      texto: 'Certificações de qualidade reconhecidas',
      relevancia: 'alta',
      score: 9,
    });
  }

  if (forcas.length < 3) {
    forcas.push({
      id: idCounter++,
      texto: 'Conhecimento profundo do negócio e setor de atuação',
      relevancia: 'media',
      score: 6,
    });
  }

  if (forcas.length < 3) {
    forcas.push({
      id: idCounter++,
      texto: 'Capacidade de adaptação às mudanças do mercado',
      relevancia: 'media',
      score: 6,
    });
  }

  if (forcas.length < 3) {
    forcas.push({
      id: idCounter++,
      texto: 'Base de clientes estabelecida',
      relevancia: 'media',
      score: 5,
    });
  }

  return forcas.sort((a, b) => b.score - a.score).slice(0, 3);
}

function mapFraquezas(data: GenerateSwotRequest): SwotItem[] {
  const fraquezas: SwotItem[] = [];
  let idCounter = 1;

  if (
    data.situacaoFinanceira === 'prejuizo' ||
    data.situacaoFinanceira === 'equilibrio'
  ) {
    fraquezas.push({
      id: idCounter++,
      texto: 'Situação financeira delicada comprometendo investimentos',
      criticidade: 'alta',
      score: data.situacaoFinanceira === 'prejuizo' ? 10 : 8,
    });
  }

  if (
    data.nivelDigitalizacao === 'zero' ||
    data.nivelDigitalizacao === 'basico'
  ) {
    fraquezas.push({
      id: idCounter++,
      texto: 'Presença digital limitada reduzindo alcance de mercado',
      criticidade: 'alta',
      score: 9,
    });
  }

  if (data.equipe === 'apenas-eu' || data.equipe === '2-5') {
    fraquezas.push({
      id: idCounter++,
      texto: 'Equipe reduzida limitando capacidade de crescimento',
      criticidade: 'media',
      score: data.equipe === 'apenas-eu' ? 8 : 7,
    });
  }

  if (
    data.concorrenciaPercebida === 'alta' ||
    data.concorrenciaPercebida === 'muito-alta'
  ) {
    if (
      !Array.isArray(data.diferenciacaoCompetitiva) ||
      data.diferenciacaoCompetitiva.length < 2 ||
      data.diferenciacaoCompetitiva.includes('nao-sei')
    ) {
      fraquezas.push({
        id: idCounter++,
        texto: 'Diferenciação pouco clara em mercado muito competitivo',
        criticidade: 'alta',
        score: 9,
      });
    }
  }

  if (data.maiorDesafio === 'aquisicao') {
    fraquezas.push({
      id: idCounter++,
      texto: 'Dificuldade em atrair novos clientes',
      criticidade: 'alta',
      score: 8,
    });
  }

  if (data.maiorDesafio === 'retencao') {
    fraquezas.push({
      id: idCounter++,
      texto: 'Taxa de cancelamento ou perda de clientes elevada',
      criticidade: 'alta',
      score: 8,
    });
  }

  if (data.maiorDesafio === 'financeiro') {
    fraquezas.push({
      id: idCounter++,
      texto: 'Gestão financeira e fluxo de caixa deficientes',
      criticidade: 'alta',
      score: 9,
    });
  }

  if (data.maiorDesafio === 'tempo') {
    fraquezas.push({
      id: idCounter++,
      texto: 'Sobrecarga operacional e falta de tempo estratégico',
      criticidade: 'media',
      score: 7,
    });
  }

  if (data.maiorDesafio === 'precificacao') {
    fraquezas.push({
      id: idCounter++,
      texto: 'Precificação inadequada impactando margens',
      criticidade: 'alta',
      score: 8,
    });
  }

  if (
    data.capacidadeInvestimento === 'zero' ||
    data.capacidadeInvestimento === '<5k'
  ) {
    fraquezas.push({
      id: idCounter++,
      texto: 'Capacidade limitada de investimento em crescimento',
      criticidade: 'media',
      score: 7,
    });
  }

  if (data.receita === '<10k' || data.receita === '10-50k') {
    fraquezas.push({
      id: idCounter++,
      texto: 'Receita ainda insuficiente para escala sustentável',
      criticidade: 'alta',
      score: data.receita === '<10k' ? 8 : 7,
    });
  }

  if (data.experiencia === '<1ano' || data.experiencia === '1-2anos') {
    fraquezas.push({
      id: idCounter++,
      texto: 'Pouca experiência no mercado e curva de aprendizado',
      criticidade: 'media',
      score: 6,
    });
  }

  if (data.setor === 'alimentacao' && data.controleDesperdicioAlimentacao === 'nao') {
    fraquezas.push({
      id: idCounter++,
      texto: 'Falta de controle sobre desperdício de produtos perecíveis',
      criticidade: 'alta',
      score: 8,
    });
  }

  if (data.setor === 'comercio' && data.controleEstoqueComercio === 'nao') {
    fraquezas.push({
      id: idCounter++,
      texto: 'Ausência de controle de estoque comprometendo operação',
      criticidade: 'alta',
      score: 9,
    });
  }

  if (
    data.setor === 'servicos' &&
    data.processosDocumentadosServicos === 'nao'
  ) {
    fraquezas.push({
      id: idCounter++,
      texto: 'Processos não documentados dificultando escalabilidade',
      criticidade: 'media',
      score: 7,
    });
  }

  if (
    data.setor === 'industria' &&
    data.nivelAutomacaoIndustria === 'zero'
  ) {
    fraquezas.push({
      id: idCounter++,
      texto: 'Produção 100% manual limitando produtividade',
      criticidade: 'alta',
      score: 8,
    });
  }

  if (data.setor === 'agro' && data.gestaoFinanceiraAgro === 'nao') {
    fraquezas.push({
      id: idCounter++,
      texto: 'Gestão financeira insuficiente para controle de custos',
      criticidade: 'alta',
      score: 8,
    });
  }

  if (fraquezas.length < 3) {
    fraquezas.push({
      id: idCounter++,
      texto: 'Processos operacionais não otimizados',
      criticidade: 'media',
      score: 6,
    });
  }

  if (fraquezas.length < 3) {
    fraquezas.push({
      id: idCounter++,
      texto: 'Dependência de conhecimento concentrado',
      criticidade: 'media',
      score: 5,
    });
  }

  if (fraquezas.length < 3) {
    fraquezas.push({
      id: idCounter++,
      texto: 'Comunicação e marketing ainda incipientes',
      criticidade: 'media',
      score: 5,
    });
  }

  return fraquezas.sort((a, b) => b.score - a.score).slice(0, 3);
}

function mapOportunidades(data: GenerateSwotRequest): SwotItem[] {
  const oportunidades: SwotItem[] = [];
  let idCounter = 1;

  if (
    data.nivelDigitalizacao === 'zero' ||
    data.nivelDigitalizacao === 'basico' ||
    data.nivelDigitalizacao === 'social-ativo'
  ) {
    oportunidades.push({
      id: idCounter++,
      texto: 'Expansão da presença digital pode multiplicar alcance',
      potencial: 'alto',
      score: 9,
    });
  }

  if (
    data.capacidadeInvestimento === '5k-20k' ||
    data.capacidadeInvestimento === '20k-50k' ||
    data.capacidadeInvestimento === '>50k'
  ) {
    oportunidades.push({
      id: idCounter++,
      texto: 'Recursos disponíveis para investir em crescimento acelerado',
      potencial: 'alto',
      score: 8,
    });
  }

  if (data.objetivoPrincipal === 'expandir') {
    oportunidades.push({
      id: idCounter++,
      texto: 'Mercados adjacentes com potencial de entrada',
      potencial: 'alto',
      score: 8,
    });
  }

  if (data.objetivoPrincipal === 'marca') {
    oportunidades.push({
      id: idCounter++,
      texto: 'Fortalecimento de marca através de marketing digital',
      potencial: 'alto',
      score: 8,
    });
  }

  if (data.objetivoPrincipal === 'eficiencia') {
    oportunidades.push({
      id: idCounter++,
      texto: 'Automação de processos para ganho de eficiência operacional',
      potencial: 'medio',
      score: 7,
    });
  }

  if (data.setor === 'alimentacao') {
    oportunidades.push({
      id: idCounter++,
      texto: 'Delivery e plataformas de entrega em crescimento acelerado',
      potencial: 'alto',
      score: 9,
    });
  }

  if (
    data.setor === 'comercio' &&
    data.vendaOnlineComercio === 'so-fisico'
  ) {
    oportunidades.push({
      id: idCounter++,
      texto: 'E-commerce e vendas online ainda inexploradas',
      potencial: 'alto',
      score: 9,
    });
  }

  if (
    data.setor === 'servicos' &&
    data.precificacaoServicos !== 'recorrente'
  ) {
    oportunidades.push({
      id: idCounter++,
      texto: 'Transição para modelo de receita recorrente',
      potencial: 'alto',
      score: 8,
    });
  }

  if (
    data.setor === 'industria' &&
    (data.nivelAutomacaoIndustria === 'baixa' ||
      data.nivelAutomacaoIndustria === 'zero')
  ) {
    oportunidades.push({
      id: idCounter++,
      texto: 'Investimento em automação para aumentar capacidade produtiva',
      potencial: 'alto',
      score: 8,
    });
  }

  if (
    data.setor === 'agro' &&
    data.comercializacaoAgro === 'intermediarios'
  ) {
    oportunidades.push({
      id: idCounter++,
      texto: 'Venda direta ao consumidor eliminando intermediários',
      potencial: 'alto',
      score: 9,
    });
  }

  if (
    Array.isArray(data.principaisClientes) &&
    data.principaisClientes.length === 1
  ) {
    oportunidades.push({
      id: idCounter++,
      texto: 'Diversificação de canais e segmentos de clientes',
      potencial: 'medio',
      score: 7,
    });
  }

  if (
    data.concorrenciaPercebida === 'nenhum' ||
    data.concorrenciaPercebida === 'baixa'
  ) {
    oportunidades.push({
      id: idCounter++,
      texto: 'Consolidação de posição de liderança em nicho específico',
      potencial: 'alto',
      score: 8,
    });
  }

  if (data.maiorDesafio === 'tempo') {
    oportunidades.push({
      id: idCounter++,
      texto: 'Contratação e delegação para focar em estratégia',
      potencial: 'medio',
      score: 7,
    });
  }

  if (
    data.situacaoFinanceira === 'lucro-crescente' ||
    data.situacaoFinanceira === 'excelente'
  ) {
    oportunidades.push({
      id: idCounter++,
      texto: 'Expansão geográfica ou abertura de novas unidades',
      potencial: 'alto',
      score: 8,
    });
  }

  if (oportunidades.length < 3) {
    oportunidades.push({
      id: idCounter++,
      texto: 'Parcerias estratégicas com fornecedores ou complementares',
      potencial: 'medio',
      score: 6,
    });
  }

  if (oportunidades.length < 3) {
    oportunidades.push({
      id: idCounter++,
      texto: 'Inovação em produtos ou serviços existentes',
      potencial: 'medio',
      score: 6,
    });
  }

  if (oportunidades.length < 3) {
    oportunidades.push({
      id: idCounter++,
      texto: 'Implementação de programa de fidelização de clientes',
      potencial: 'medio',
      score: 6,
    });
  }

  return oportunidades.sort((a, b) => b.score - a.score).slice(0, 3);
}

function mapAmeacas(data: GenerateSwotRequest): SwotItem[] {
  const ameacas: SwotItem[] = [];
  let idCounter = 1;

  if (
    data.concorrenciaPercebida === 'alta' ||
    data.concorrenciaPercebida === 'muito-alta'
  ) {
    ameacas.push({
      id: idCounter++,
      texto: 'Concorrência intensa pressionando margens e preços',
      urgencia: 'alta',
      score: data.concorrenciaPercebida === 'muito-alta' ? 10 : 9,
    });
  }

  if (data.situacaoFinanceira === 'prejuizo') {
    ameacas.push({
      id: idCounter++,
      texto: 'Risco de insustentabilidade financeira no curto prazo',
      urgencia: 'alta',
      score: 10,
    });
  }

  if (data.maiorDesafio === 'dependencia') {
    ameacas.push({
      id: idCounter++,
      texto: 'Dependência excessiva de poucos clientes',
      urgencia: 'alta',
      score: 9,
    });
  }

  if (
    data.nivelDigitalizacao === 'zero' &&
    (data.setor === 'comercio' || data.setor === 'servicos')
  ) {
    ameacas.push({
      id: idCounter++,
      texto: 'Transformação digital do setor deixando negócio para trás',
      urgencia: 'alta',
      score: 9,
    });
  }

  if (data.maiorDesafio === 'precificacao') {
    ameacas.push({
      id: idCounter++,
      texto: 'Pressão sobre margens comprometendo viabilidade',
      urgencia: 'media',
      score: 8,
    });
  }

  if (
    data.equipe === 'apenas-eu' &&
    (data.receita === '150-500k' || data.receita === '>500k')
  ) {
    ameacas.push({
      id: idCounter++,
      texto: 'Sobrecarga operacional ameaçando qualidade e crescimento',
      urgencia: 'alta',
      score: 8,
    });
  }

  if (
    data.receita === '<10k' &&
    (data.experiencia === '<1ano' || data.experiencia === '1-2anos')
  ) {
    ameacas.push({
      id: idCounter++,
      texto: 'Dificuldade de sustentabilidade no estágio inicial',
      urgencia: 'alta',
      score: 8,
    });
  }

  if (
    data.concorrenciaPercebida === 'moderada' ||
    data.concorrenciaPercebida === 'alta'
  ) {
    ameacas.push({
      id: idCounter++,
      texto: 'Entrada de novos concorrentes com mais recursos',
      urgencia: 'media',
      score: 7,
    });
  }

  if (data.maiorDesafio === 'retencao') {
    ameacas.push({
      id: idCounter++,
      texto: 'Perda de base de clientes para concorrentes',
      urgencia: 'alta',
      score: 8,
    });
  }

  if (data.setor === 'alimentacao' && data.maiorCustoAlimentacao === 'insumos') {
    ameacas.push({
      id: idCounter++,
      texto: 'Volatilidade de preços de matéria-prima impactando custos',
      urgencia: 'media',
      score: 7,
    });
  }

  if (data.setor === 'comercio' && data.desafioVarejoComercio === 'sazonalidade') {
    ameacas.push({
      id: idCounter++,
      texto: 'Sazonalidade forte comprometendo fluxo de caixa',
      urgencia: 'media',
      score: 7,
    });
  }

  if (
    data.setor === 'industria' &&
    data.gargaloProducaoIndustria === 'equipamentos'
  ) {
    ameacas.push({
      id: idCounter++,
      texto: 'Limitação de capacidade produtiva por equipamentos',
      urgencia: 'media',
      score: 7,
    });
  }

  if (
    data.setor === 'agro' &&
    (data.tecnologiaProducaoAgro === 'tradicional' ||
      data.tecnologiaProducaoAgro === 'basica')
  ) {
    ameacas.push({
      id: idCounter++,
      texto: 'Competidores tecnificados ganhando vantagem competitiva',
      urgencia: 'media',
      score: 7,
    });
  }

  ameacas.push({
    id: idCounter++,
    texto: 'Mudanças nas preferências e comportamento dos consumidores',
    urgencia: 'baixa',
    score: 5,
  });

  ameacas.push({
    id: idCounter++,
    texto: 'Instabilidade econômica e inflação impactando poder de compra',
    urgencia: 'media',
    score: 6,
  });

  if (ameacas.length < 3) {
    ameacas.push({
      id: idCounter++,
      texto: 'Mudanças regulatórias no setor',
      urgencia: 'baixa',
      score: 5,
    });
  }

  return ameacas.sort((a, b) => b.score - a.score).slice(0, 3);
}
