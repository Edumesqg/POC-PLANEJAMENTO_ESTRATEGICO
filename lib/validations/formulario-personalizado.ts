import { z } from 'zod';

export const formPersonalizadoSchema = z.object({
  situacaoFinanceira: z.string().min(1, 'Selecione uma opção'),
  objetivoPrincipal: z.string().min(1, 'Selecione uma opção'),
  maiorDesafio: z.string().min(1, 'Selecione uma opção'),
  diferenciacaoCompetitiva: z
    .array(z.string())
    .min(1, 'Selecione pelo menos uma opção'),
  nivelDigitalizacao: z.string().min(1, 'Selecione uma opção'),
  capacidadeInvestimento: z.string().min(1, 'Selecione uma opção'),
  principaisClientes: z
    .array(z.string())
    .min(1, 'Selecione pelo menos uma opção'),
  concorrenciaPercebida: z.string().min(1, 'Selecione uma opção'),
  observacoesAdicionais: z.string().optional(),
}).passthrough();

export type FormPersonalizadoData = z.infer<typeof formPersonalizadoSchema>;
