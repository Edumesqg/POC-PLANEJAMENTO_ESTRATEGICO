import { LucideIcon } from 'lucide-react';

export type QuestionType = 'text' | 'radio' | 'checkbox' | 'textarea';

export interface QuestionOption {
  value: string;
  label: string;
  icon?: string;
  color?: string;
}

export interface Question {
  id: string;
  number: number;
  label: string;
  microcopy: string;
  type: QuestionType;
  options?: QuestionOption[];
  placeholder?: string;
  rows?: number;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
}

export interface FormPersonalizadoData {
  situacaoFinanceira?: string;
  objetivoPrincipal?: string;
  maiorDesafio?: string;
  diferenciacaoCompetitiva?: string[];
  nivelDigitalizacao?: string;
  capacidadeInvestimento?: string;
  principaisClientes?: string[];
  concorrenciaPercebida?: string;
  observacoesAdicionais?: string;
  [key: string]: string | string[] | undefined;
}

export type ClusterType = 'alimentacao' | 'comercio' | 'servicos' | 'industria' | 'agro' | 'outro';
