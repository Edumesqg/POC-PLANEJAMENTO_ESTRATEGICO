'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SocialButton } from '@/components/auth/SocialButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cadastroSchema, type CadastroFormData } from '@/lib/validations/auth';

export default function CadastroPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      aceitoTermos: false,
    },
  });

  const onSubmit = async (data: CadastroFormData) => {
    setIsLoading(true);

    console.log('Dados do cadastro:', data);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    router.push('/boas-vindas');

    setIsLoading(false);
  };

  const handleGoogleLogin = () => {
    alert('Google login será implementado em breve');
  };

  return (
    <AuthLayout
      title="Crie sua conta"
      subtitle="Comece seu diagnóstico estratégico gratuito"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter text-[14px] font-medium text-gray-700">
                  Nome completo
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu nome completo"
                    className="h-auto rounded-xl border-2 border-gray-200 bg-white px-4 py-[14px] text-[16px] text-carbon transition-all focus:border-royal-blue focus:ring-4 focus:ring-royal-blue/10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter text-[14px] font-medium text-gray-700">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    className="h-auto rounded-xl border-2 border-gray-200 bg-white px-4 py-[14px] text-[16px] text-carbon transition-all focus:border-royal-blue focus:ring-4 focus:ring-royal-blue/10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="senha"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter text-[14px] font-medium text-gray-700">
                  Senha
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Crie uma senha segura"
                      className="h-auto rounded-xl border-2 border-gray-200 bg-white px-4 py-[14px] pr-12 text-[16px] text-carbon transition-all focus:border-royal-blue focus:ring-4 focus:ring-royal-blue/10"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <p className="mt-2 font-inter text-[12px] font-normal text-gray-400">
                  Mínimo 8 caracteres
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="aceitoTermos"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-inter text-[14px] font-normal text-gray-600">
                    Aceito os{' '}
                    <Link
                      href="/termos-de-uso"
                      className="font-medium text-royal-blue hover:text-sky-blue"
                    >
                      termos de uso
                    </Link>{' '}
                    e{' '}
                    <Link
                      href="/politica-de-privacidade"
                      className="font-medium text-royal-blue hover:text-sky-blue"
                    >
                      política de privacidade
                    </Link>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="h-auto w-full rounded-xl bg-emerald-green px-8 py-[14px] text-[16px] font-semibold text-white shadow-lg transition-all hover:translate-y-[-2px] hover:bg-emerald-green/90 hover:shadow-xl active:scale-[0.98] disabled:translate-y-0 disabled:opacity-50 disabled:shadow-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Criando conta...
              </>
            ) : (
              'Criar minha conta'
            )}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 font-inter text-[14px] font-normal text-gray-400">
                OU
              </span>
            </div>
          </div>

          <SocialButton provider="google" onClick={handleGoogleLogin}>
            Continuar com Google
          </SocialButton>

          <div className="mt-6 text-center">
            <p className="font-inter text-[14px] font-normal text-gray-600">
              Já tem uma conta?{' '}
              <Link
                href="/login"
                className="font-semibold text-royal-blue transition-colors hover:text-sky-blue"
              >
                Faça login
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
