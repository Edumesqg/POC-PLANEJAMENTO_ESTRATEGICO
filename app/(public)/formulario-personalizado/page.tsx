'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProgressBar } from '@/components/forms/ProgressBar';
import { QuestionLayout } from '@/components/forms/QuestionLayout';
import { strategicQuestions } from '@/lib/questions/strategic';
import { clusterQuestions, finalQuestion, clusterNames } from '@/lib/questions/clusters';
import { formPersonalizadoSchema, FormPersonalizadoData } from '@/lib/validations/formulario-personalizado';
import { Question } from '@/types/form';
import {
  ArrowLeft,
  X,
  DollarSign,
  Award,
  Heart,
  Zap,
  MapPin,
  Lightbulb,
  Shield,
  HelpCircle,
  Users,
  Building2,
  Landmark,
  TrendingUp,
  Target,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  DollarSign,
  Award,
  Heart,
  Zap,
  MapPin,
  Lightbulb,
  Shield,
  HelpCircle,
  Users,
  Building2,
  Landmark,
  TrendingUp,
};

export default function FormularioPersonalizadoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cluster = searchParams.get('cluster') || 'outro';

  const [currentStep, setCurrentStep] = useState(1);
  const [showTransition, setShowTransition] = useState(false);
  const [checkboxSelections, setCheckboxSelections] = useState<Record<string, string[]>>({
    diferenciacaoCompetitiva: [],
    principaisClientes: [],
  });

  const clusterSpecificQuestions = clusterQuestions[cluster] || clusterQuestions.outro;
  const allQuestions = [...strategicQuestions, ...clusterSpecificQuestions, finalQuestion];
  const totalSteps = allQuestions.length;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(formPersonalizadoSchema),
    mode: 'onChange',
    defaultValues: {},
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('formPersonalizado');
      if (saved) {
        const data = JSON.parse(saved);
        Object.keys(data).forEach((key) => {
          setValue(key, data[key]);
          if (key === 'diferenciacaoCompetitiva' || key === 'principaisClientes') {
            setCheckboxSelections((prev) => ({ ...prev, [key]: data[key] }));
          }
        });
      }
    } catch (error) {
      console.error('Error loading form progress:', error);
    }
  }, [setValue]);

  const saveProgress = (data: any) => {
    try {
      const existing = localStorage.getItem('formPersonalizado');
      const parsed = existing ? JSON.parse(existing) : {};
      const updated = { ...parsed, ...data };
      localStorage.setItem('formPersonalizado', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving form progress:', error);
    }
  };

  const currentQuestion = allQuestions[currentStep - 1];
  const formValues = watch();

  const isStepValid = () => {
    if (!currentQuestion) return false;

    const fieldValue = formValues[currentQuestion.id];

    if (currentQuestion.type === 'checkbox') {
      const selections = checkboxSelections[currentQuestion.id] || [];
      return selections.length > 0;
    }

    if (currentQuestion.type === 'textarea' && currentQuestion.id === 'observacoesAdicionais') {
      return true;
    }

    if (currentQuestion.type === 'textarea') {
      return fieldValue && fieldValue.length >= 10;
    }

    return fieldValue && fieldValue.length > 0;
  };

  const nextStep = () => {
    if (currentStep === 8) {
      setShowTransition(true);
      setTimeout(() => {
        setShowTransition(false);
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 3000);
      return;
    }

    if (currentStep < totalSteps && isStepValid()) {
      saveProgress(formValues);
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExit = () => {
    if (confirm('Deseja sair? Seu progresso será salvo.')) {
      saveProgress(formValues);
      router.push('/dashboard');
    }
  };

  const handleCheckboxChange = (questionId: string, value: string) => {
    setCheckboxSelections((prev) => {
      const current = prev[questionId] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      setValue(questionId, updated);
      return { ...prev, [questionId]: updated };
    });
  };

  const onSubmit = (data: any) => {
    try {
      const basicData = JSON.parse(localStorage.getItem('formBasico') || '{}');
      const completeData = { ...basicData, ...data, ...checkboxSelections };

      localStorage.setItem('formCompleto', JSON.stringify(completeData));

      router.push('/swot-inicial?processing=true');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isStepValid()) {
        if (currentStep === totalSteps) {
          handleSubmit(onSubmit)();
        } else {
          nextStep();
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [currentStep, isStepValid]);

  if (showTransition) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F0F9FF] px-6">
        <div className="animate-fade-in text-center">
          <div className="mb-6 flex justify-center">
            <Target className="h-20 w-20 animate-pulse text-royal-blue" />
          </div>
          <h2 className="mb-4 text-3xl font-bold text-navy-blue md:text-4xl">
            Ótimo! Agora perguntas específicas sobre {clusterNames[cluster]}
          </h2>
          <p className="text-xl text-gray-600">
            Mais {clusterSpecificQuestions.length + 1} perguntas e terminamos!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-gray">
      <header className="border-b border-gray-200 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <button
            onClick={prevStep}
            className={`flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-royal-blue ${
              currentStep === 1 ? 'invisible' : ''
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>

          <h1 className="text-lg font-semibold text-navy-blue">
            Mapa do Empreendedor
          </h1>

          <button
            onClick={handleExit}
            className="text-gray-600 transition-colors hover:text-royal-blue"
            aria-label="Sair"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      <ProgressBar currentStep={currentStep + 5} totalSteps={totalSteps + 5} />

      <main className="flex flex-1 items-center justify-center px-6 py-10 md:py-16">
        <div className="w-full max-w-[720px]">
          {currentQuestion && (
            <QuestionLayout
              stepNumber={currentQuestion.number}
              question={currentQuestion.label}
              microcopy={currentQuestion.microcopy}
            >
              <div className="space-y-6">
                {currentQuestion.type === 'text' && (
                  <div>
                    <Input
                      {...register(currentQuestion.id)}
                      type="text"
                      placeholder={currentQuestion.placeholder}
                      className="h-auto border-2 border-gray-200 px-4 py-4 text-lg focus:border-royal-blue focus:ring-4 focus:ring-royal-blue/10"
                      autoFocus
                    />
                    {errors[currentQuestion.id] && (
                      <p className="mt-2 text-sm text-coral-red">
                        {errors[currentQuestion.id]?.message as string}
                      </p>
                    )}
                  </div>
                )}

                {currentQuestion.type === 'textarea' && (
                  <div>
                    <Textarea
                      {...register(currentQuestion.id)}
                      placeholder={currentQuestion.placeholder}
                      rows={currentQuestion.rows || 4}
                      className="border-2 border-gray-200 px-4 py-4 text-lg focus:border-royal-blue focus:ring-4 focus:ring-royal-blue/10"
                      autoFocus
                    />
                    {errors[currentQuestion.id] && (
                      <p className="mt-2 text-sm text-coral-red">
                        {errors[currentQuestion.id]?.message as string}
                      </p>
                    )}
                  </div>
                )}

                {currentQuestion.type === 'radio' && (
                  <div className="flex max-w-[500px] flex-col gap-3">
                    {currentQuestion.options?.map((option) => {
                      const isSelected = formValues[currentQuestion.id] === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setValue(currentQuestion.id, option.value)}
                          className={`flex items-center gap-4 rounded-xl border-2 bg-white px-6 py-4 text-left transition-all hover:border-royal-blue hover:bg-gray-50 ${
                            isSelected
                              ? 'border-royal-blue bg-blue-50'
                              : 'border-gray-200'
                          }`}
                        >
                          <div className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300">
                            {isSelected && (
                              <>
                                <div className="absolute h-2.5 w-2.5 rounded-full bg-royal-blue" />
                                <div className="absolute h-5 w-5 rounded-full border-2 border-royal-blue" />
                              </>
                            )}
                          </div>
                          <span className="text-base font-medium text-carbon">
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentQuestion.type === 'checkbox' && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {currentQuestion.options?.map((option) => {
                      const IconComponent = option.icon ? iconMap[option.icon] : null;
                      const isSelected = checkboxSelections[currentQuestion.id]?.includes(option.value) || false;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleCheckboxChange(currentQuestion.id, option.value)}
                          className={`relative flex flex-col items-center gap-3 rounded-xl border-2 bg-white p-6 text-center transition-all hover:translate-y-[-2px] hover:border-royal-blue hover:shadow-lg ${
                            isSelected
                              ? 'border-royal-blue bg-blue-50 shadow-lg'
                              : 'border-gray-200'
                          }`}
                        >
                          {isSelected && (
                            <span className="absolute right-3 top-3 text-xl font-bold text-emerald-green">
                              ✓
                            </span>
                          )}
                          {IconComponent && (
                            <IconComponent
                              className="h-10 w-10"
                              style={{ color: option.color }}
                            />
                          )}
                          <span className="text-base font-semibold text-carbon">
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {isStepValid() && currentStep < totalSteps && (
                  <Button
                    onClick={nextStep}
                    className="h-auto w-full animate-fade-in bg-royal-blue px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-[#1565C0] md:w-auto"
                  >
                    Continuar →
                  </Button>
                )}

                {isStepValid() && currentStep === totalSteps && (
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    className="h-auto w-full animate-fade-in bg-emerald-green px-12 py-5 text-xl font-semibold text-white shadow-lg shadow-emerald-green/30 transition-all hover:translate-y-[-2px] hover:bg-[#059669] hover:shadow-xl active:scale-[0.98] md:w-auto"
                  >
                    Gerar minha análise SWOT →
                  </Button>
                )}
              </div>
            </QuestionLayout>
          )}
        </div>
      </main>
    </div>
  );
}
