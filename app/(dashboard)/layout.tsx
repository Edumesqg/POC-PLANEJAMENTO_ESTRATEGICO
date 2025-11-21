'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  User,
  Settings,
  CreditCard,
  HelpCircle,
  Book,
  MessageCircle,
  Headphones,
  Menu,
  X,
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Diagnósticos', href: '/dashboard/diagnosticos' },
    { name: 'Relatórios', href: '/dashboard/relatorios' },
    { name: 'Ajuda', href: '/dashboard/ajuda' },
  ];

  const accountLinks = [
    { name: 'Perfil', href: '/dashboard/perfil', icon: User },
    { name: 'Configurações', href: '/dashboard/configuracoes', icon: Settings },
    { name: 'Faturamento', href: '/dashboard/faturamento', icon: CreditCard },
  ];

  const resourceLinks = [
    { name: 'Como funciona', href: '/dashboard/como-funciona', icon: HelpCircle },
    { name: 'Metodologia', href: '/dashboard/metodologia', icon: Book },
    { name: 'FAQ', href: '/dashboard/faq', icon: MessageCircle },
    { name: 'Suporte', href: '/dashboard/suporte', icon: Headphones },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="flex h-[72px] items-center justify-between px-6 md:px-8">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 transition-colors hover:text-royal-blue lg:hidden"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <Link
              href="/dashboard"
              className="text-xl font-bold text-navy-blue transition-colors hover:text-royal-blue"
            >
              Mapa do Empreendedor
            </Link>

            <nav className="hidden items-center gap-8 lg:flex">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative text-[15px] font-medium transition-colors ${
                      isActive
                        ? 'text-royal-blue'
                        : 'text-gray-600 hover:text-royal-blue'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute -bottom-[25px] left-0 right-0 h-0.5 bg-royal-blue" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button
              asChild
              className="hidden h-auto rounded-[10px] bg-royal-blue px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#1565C0] sm:block"
            >
              <Link href="/boas-vindas">+ Novo</Link>
            </Button>

            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-royal-blue">
                <AvatarFallback className="bg-royal-blue text-base font-bold text-white">
                  EM
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium text-carbon md:block">
                Eduardo Mesquita
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`fixed inset-y-0 left-0 top-[72px] z-40 w-[280px] transform border-r border-gray-200 bg-slate-gray transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex min-h-[calc(100vh-72px)] flex-col gap-6 p-6">
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Conta
              </h3>
              <nav className="flex flex-col gap-1">
                {accountLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-blue-50 text-royal-blue'
                          : 'text-gray-600 hover:bg-white hover:text-royal-blue'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Recursos
              </h3>
              <nav className="flex flex-col gap-1">
                {resourceLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-blue-50 text-royal-blue'
                          : 'text-gray-600 hover:bg-white hover:text-royal-blue'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="mt-auto border-t border-gray-300 pt-6">
              <div className="rounded-xl bg-gradient-to-br from-royal-blue to-sky-blue p-4">
                <h4 className="mb-1 text-base font-semibold text-white">
                  Upgrade para Pro
                </h4>
                <p className="mb-3 text-sm text-white/90">
                  Acesso ilimitado a diagnósticos
                </p>
                <Button className="h-auto w-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-royal-blue hover:bg-white/90">
                  Saiba mais →
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 top-[72px] z-30 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 lg:ml-[280px]">
          <div className="mx-auto max-w-[1400px] px-5 py-10 md:px-8 md:py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
