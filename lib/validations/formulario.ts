import { z } from 'zod';

export const formBasicoSchema = z.object({
  empresaNome: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome muito longo'),
  setor: z.string().min(1, 'Selecione um setor'),
  experiencia: z.string().min(1, 'Selecione uma opção'),
  equipe: z.string().min(1, 'Selecione uma opção'),
  receita: z.string().min(1, 'Selecione uma opção'),
});

export type FormBasicoData = z.infer<typeof formBasicoSchema>;

export const setorOptions = [
  {
    value: 'comercio',
    label: 'Comércio & E-commerce',
    icon: 'ShoppingBag',
    color: '#0D47A1',
  },
  {
    value: 'servicos',
    label: 'Serviços Profissionais',
    icon: 'Briefcase',
    color: '#0D47A1',
  },
  {
    value: 'educacao',
    label: 'Educação & Treinamentos',
    icon: 'GraduationCap',
    color: '#0D47A1',
  },
  {
    value: 'saude',
    label: 'Saúde & Bem-estar',
    icon: 'Heart',
    color: '#EF4444',
  },
  {
    value: 'industria',
    label: 'Indústria & Construção',
    icon: 'Factory',
    color: '#6B7280',
  },
  {
    value: 'alimentacao',
    label: 'Alimentação',
    icon: 'Utensils',
    color: '#F59E0B',
  },
  {
    value: 'agro',
    label: 'Agro & Agroindústrias',
    icon: 'Sprout',
    color: '#10B981',
  },
  {
    value: 'tecnologia',
    label: 'Tecnologia & Software',
    icon: 'Laptop',
    color: '#42A5F5',
  },
  {
    value: 'outro',
    label: 'Outro',
    icon: 'HelpCircle',
    color: '#9CA3AF',
  },
];

export const experienciaOptions = [
  {
    value: '<1ano',
    label: 'Comecei recentemente (menos de 1 ano)',
  },
  {
    value: '1-2anos',
    label: 'Estou começando a me estabelecer (1 a 2 anos)',
  },
  {
    value: '3-5anos',
    label: 'Já tenho uma base sólida (3 a 5 anos)',
  },
  {
    value: '6-10anos',
    label: 'Sou experiente no ramo (6 a 10 anos)',
  },
  {
    value: '>10anos',
    label: 'Sou veterano (mais de 10 anos)',
  },
];

export const equipeOptions = [
  {
    value: 'so-eu',
    label: 'Só eu mesmo (trabalho sozinho)',
  },
  {
    value: '2-5',
    label: 'Eu e mais algumas pessoas (2 a 5 pessoas)',
  },
  {
    value: '6-10',
    label: 'Uma equipe pequena (6 a 10 pessoas)',
  },
  {
    value: '11-20',
    label: 'Uma equipe média (11 a 20 pessoas)',
  },
  {
    value: '>20',
    label: 'Uma equipe grande (mais de 20 pessoas)',
  },
];

export const receitaOptions = [
  {
    value: '<5k',
    label: 'Estou começando (até R$ 5.000/mês)',
  },
  {
    value: '5k-20k',
    label: 'Crescendo bem (R$ 5.000 a R$ 20.000/mês)',
  },
  {
    value: '20k-50k',
    label: 'Estabelecido (R$ 20.000 a R$ 50.000/mês)',
  },
  {
    value: '50k-100k',
    label: 'Consolidado (R$ 50.000 a R$ 100.000/mês)',
  },
  {
    value: '>100k',
    label: 'Já sou grande (mais de R$ 100.000/mês)',
  },
];
