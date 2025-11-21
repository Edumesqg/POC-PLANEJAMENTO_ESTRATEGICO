'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProgressBar } from '@/components/forms/ProgressBar';
import { QuestionLayout } from '@/components/forms/QuestionLayout';
import { useFormProgress } from '@/hooks/useFormProgress';
import {
  formBasicoSchema,
  FormBasicoData,
  setorOptions,
  experienciaOptions,
  equipeOptions,
  receitaOptions,
} from '@/lib/validations/formulario';
import {
  ArrowLeft,
  X,
  ShoppingBag,
  Briefcase,
  GraduationCap,
  Heart,
  Factory,
  Utensils,
  Sprout,
  Laptop,
  HelpCircle,
  Lock,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  ShoppingBag,
  Briefcase,
  GraduationCap,
  Heart,
  Factory,
  Utensils,
  Sprout,
  Laptop,
  HelpCircle,
};

export default function FormularioBasicoPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormBasicoData>({
    resolver: zodResolver(formBasicoSchema),
    mode: 'onChange',
    defaultValues: {
      empresaNome: '',
      setor: '',
      experiencia: '',
      equipe: '',
      receita: '',
    },
  });

  const { saveProgress } = useFormProgress(setValue);

  const empresaNome = watch('empresaNome');
  const setor = watch('setor');
  const experiencia = watch('experiencia');
  const equipe = watch('equipe');
  const receita = watch('receita');

  const isStep1Valid = empresaNome && empresaNome.length >= 2;
  const isStep2Valid = setor && setor.length > 0;
  const isStep3Valid = experiencia && experiencia.length > 0;
  const isStep4Valid = equipe && equipe.length > 0;
  const isStep5Valid = receita && receita.length > 0;

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return isStep1Valid;
      case 2:
        return isStep2Valid;
      case 3:
        return isStep3Valid;
      case 4:
        return isStep4Valid;
      case 5:
        return isStep5Valid;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps && canProceed()) {
      saveProgress({
        empresaNome,
        setor,
        experiencia,
        equipe,
        receita,
      });
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
      saveProgress({
        empresaNome,
        setor,
        experiencia,
        equipe,
        receita,
      });
      router.push('/dashboard');
    }
  };

  const onSubmit = (data: FormBasicoData) => {
    saveProgress(data);
    router.push(`/formulario-personalizado?cluster=${data.setor}`);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && canProceed()) {
        if (currentStep === totalSteps) {
          handleSubmit(onSubmit)();
        } else {
          nextStep();
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [currentStep, canProceed]);

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

      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <main className="flex flex-1 items-center justify-center px-6 py-10 md:py-16">
        <div className="w-full max-w-[720px]">
          {currentStep === 1 && (
            <QuestionLayout
              stepNumber={1}
              question="Qual o nome do seu negócio?"
              microcopy="Pode ser o nome fantasia ou razão social"
            >
              <div className="space-y-6">
                <div>
                  <Input
                    {...register('empresaNome')}
                    type="text"
                    placeholder="Ex: Padaria do João, Consultoria ABC..."
                    className="h-auto border-2 border-gray-200 px-4 py-4 text-lg focus:border-royal-blue focus:ring-4 focus:ring-royal-blue/10"
                    autoFocus
                  />
                  {errors.empresaNome && (
                    <p className="mt-2 text-sm text-coral-red">
                      {errors.empresaNome.message}
                    </p>
                  )}
                </div>

                <Button
                  onClick={nextStep}
                  disabled={!isStep1Valid}
                  className="h-auto w-full bg-royal-blue px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-[#1565C0] disabled:bg-gray-200 disabled:text-gray-400 md:w-auto"
                >
                  Continuar →
                </Button>
              </div>
            </QuestionLayout>
          )}

          {currentStep === 2 && (
            <QuestionLayout
              stepNumber={2}
              question="O que você vende ou oferece?"
              microcopy="Escolha a opção que mais se parece com seu negócio"
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {setorOptions.map((option) => {
                    const IconComponent = iconMap[option.icon];
                    const isSelected = setor === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setValue('setor', option.value)}
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
                        <IconComponent
                          className="h-10 w-10"
                          style={{ color: option.color }}
                        />
                        <span className="text-base font-semibold text-carbon">
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {isStep2Valid && (
                  <Button
                    onClick={nextStep}
                    className="h-auto w-full animate-fade-in bg-royal-blue px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-[#1565C0] md:w-auto"
                  >
                    Continuar →
                  </Button>
                )}
              </div>
            </QuestionLayout>
          )}

          {currentStep === 3 && (
            <QuestionLayout
              stepNumber={3}
              question="Há quanto tempo você está nesse negócio?"
              microcopy="Isso me ajuda a entender sua experiência"
            >
              <div className="space-y-6">
                <div className="flex max-w-[500px] flex-col gap-3">
                  {experienciaOptions.map((option) => {
                    const isSelected = experiencia === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setValue('experiencia', option.value)}
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

                {isStep3Valid && (
                  <Button
                    onClick={nextStep}
                    className="h-auto w-full animate-fade-in bg-royal-blue px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-[#1565C0] md:w-auto"
                  >
                    Continuar →
                  </Button>
                )}
              </div>
            </QuestionLayout>
          )}

          {currentStep === 4 && (
            <QuestionLayout
              stepNumber={4}
              question="Quantas pessoas trabalham com você?"
              microcopy="Incluindo você, sócios e funcionários"
            >
              <div className="space-y-6">
                <div className="flex max-w-[500px] flex-col gap-3">
                  {equipeOptions.map((option) => {
                    const isSelected = equipe === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setValue('equipe', option.value)}
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

                {isStep4Valid && (
                  <Button
                    onClick={nextStep}
                    className="h-auto w-full animate-fade-in bg-royal-blue px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-[#1565C0] md:w-auto"
                  >
                    Continuar →
                  </Button>
                )}
              </div>
            </QuestionLayout>
          )}

          {currentStep === 5 && (
            <QuestionLayout
              stepNumber={5}
              question="Qual a faixa de receita mensal do seu negócio?"
              microcopy="Seus dados são confidenciais e protegidos 🔒"
            >
              <div className="space-y-6">
                <div className="flex max-w-[500px] flex-col gap-3">
                  {receitaOptions.map((option) => {
                    const isSelected = receita === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setValue('receita', option.value)}
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

                {isStep5Valid && (
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    className="h-auto w-full animate-fade-in bg-emerald-green px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-[#059669] md:w-auto"
                  >
                    Continuar para perguntas estratégicas →
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
