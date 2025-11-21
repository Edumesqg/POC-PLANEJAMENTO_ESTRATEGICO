import { z } from 'zod';

export const cadastroSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  aceitoTermos: z.boolean().refine((val) => val === true, {
    message: 'Você deve aceitar os termos',
  }),
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(1, 'Senha obrigatória'),
});

export type CadastroFormData = z.infer<typeof cadastroSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
