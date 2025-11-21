import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  return NextResponse.json(
    {
      message: '⚠️ Necessário configurar a API de IA para habilitar esta funcionalidade.',
    },
    { status: 503 }
  );
}

export async function GET() {
  return NextResponse.json({
    status: 'disabled',
    message: 'API de IA não configurada',
  });
}
