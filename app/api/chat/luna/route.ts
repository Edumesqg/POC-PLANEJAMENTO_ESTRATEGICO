import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const LUNA_SYSTEM_PROMPT = `Você é Luna, uma consultora de negócios especializada em análise SWOT e estratégia empresarial.

## SEU PAPEL
Você trabalha para o "Mapa do Empreendedor", ajudando pequenas e médias empresas brasileiras a:
- Validar e aprofundar análises SWOT
- Identificar forças e fraquezas organizacionais
- Descobrir oportunidades e ameaças de mercado
- Refinar insights estratégicos

## SUA PERSONALIDADE
- Profissional mas acessível
- Empática e encorajadora
- Faz perguntas estratégicas para aprofundar
- Usa linguagem clara (evita jargões desnecessários)
- Dá exemplos práticos quando possível

## SEU MÉTODO
1. Comece entendendo o contexto da empresa
2. Faça perguntas específicas e estratégicas
3. Valide com follow-ups
4. Ofereça insights e sugestões concretas
5. Seja concisa (respostas de 3-5 linhas, máximo 2 parágrafos)

## REGRAS
- SEMPRE responda em português brasileiro
- NUNCA invente dados sobre a empresa
- NUNCA dê garantias de resultados financeiros
- SEMPRE baseie-se no que o usuário informou
- Se não souber algo, pergunte ao usuário

## EXEMPLO DE INTERAÇÃO
Usuário: "Minha empresa é uma padaria"
Você: "Entendi! Padarias têm dinâmicas interessantes. Me conte: há quanto tempo sua padaria existe e qual é o principal desafio que você enfrenta hoje?"

Agora você está conversando com um empreendedor real. Seja útil e estratégica.`;

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface RequestBody {
  messages: Message[];
  swotData?: {
    empresaNome?: string;
    setor?: string;
    forcas?: Array<{ texto: string }>;
    fraquezas?: Array<{ texto: string }>;
    oportunidades?: Array<{ texto: string }>;
    ameacas?: Array<{ texto: string }>;
  };
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY não configurada');
      return NextResponse.json(
        { error: 'Configuração do servidor incompleta' },
        { status: 500 }
      );
    }

    const body: RequestBody = await request.json();

    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: 'Mensagens inválidas' },
        { status: 400 }
      );
    }

    let systemPrompt = LUNA_SYSTEM_PROMPT;

    if (body.swotData) {
      systemPrompt += '\n\n=== CONTEXTO DO NEGÓCIO ===\n';

      if (body.swotData.empresaNome && body.swotData.setor) {
        systemPrompt += `\nEmpresa: ${body.swotData.empresaNome}`;
        systemPrompt += `\nSetor: ${body.swotData.setor}`;
      }

      if (body.swotData.forcas && body.swotData.forcas.length > 0) {
        systemPrompt += '\n\nFORÇAS IDENTIFICADAS:';
        body.swotData.forcas.forEach((f, i) => {
          systemPrompt += `\n${i + 1}. ${f.texto}`;
        });
      }

      if (body.swotData.fraquezas && body.swotData.fraquezas.length > 0) {
        systemPrompt += '\n\nFRAQUEZAS IDENTIFICADAS:';
        body.swotData.fraquezas.forEach((f, i) => {
          systemPrompt += `\n${i + 1}. ${f.texto}`;
        });
      }

      if (body.swotData.oportunidades && body.swotData.oportunidades.length > 0) {
        systemPrompt += '\n\nOPORTUNIDADES IDENTIFICADAS:';
        body.swotData.oportunidades.forEach((o, i) => {
          systemPrompt += `\n${i + 1}. ${o.texto}`;
        });
      }

      if (body.swotData.ameacas && body.swotData.ameacas.length > 0) {
        systemPrompt += '\n\nAMEAÇAS IDENTIFICADAS:';
        body.swotData.ameacas.forEach((a, i) => {
          systemPrompt += `\n${i + 1}. ${a.texto}`;
        });
      }

      systemPrompt +=
        '\n\nUse essas informações para fazer perguntas relevantes e personalizadas.';
    }

    const openaiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: systemPrompt,
      },
      ...body.messages.map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: openaiMessages,
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.3,
    });

    const assistantMessage = completion.choices[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error('Resposta vazia da OpenAI');
    }

    return NextResponse.json({
      message: assistantMessage,
      usage: {
        prompt_tokens: completion.usage?.prompt_tokens || 0,
        completion_tokens: completion.usage?.completion_tokens || 0,
        total_tokens: completion.usage?.total_tokens || 0,
      },
    });
  } catch (error: any) {
    console.error('Erro na API Route Luna:', error);

    if (error?.error?.type === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'Cota da API OpenAI excedida' },
        { status: 429 }
      );
    }

    if (error?.error?.type === 'invalid_api_key') {
      return NextResponse.json({ error: 'API key inválida' }, { status: 401 });
    }

    return NextResponse.json(
      { error: 'Erro ao processar mensagem' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    agent: 'Luna - SWOT Specialist',
    model: 'gpt-3.5-turbo',
  });
}
