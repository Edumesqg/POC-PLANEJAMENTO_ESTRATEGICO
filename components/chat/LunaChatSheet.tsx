'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, User, Send, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface LunaChatSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LunaChatSheet({ open, onOpenChange }: LunaChatSheetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Olá! Sou a Luna, especialista em análise SWOT. Vou te ajudar a validar e aprofundar seu diagnóstico estratégico. Pronto para começar?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const getSWOTDataFromLocalStorage = () => {
    if (typeof window === 'undefined') return null;

    try {
      const swotDataStr = localStorage.getItem('swotInicial');
      if (swotDataStr) {
        return JSON.parse(swotDataStr);
      }
    } catch (error) {
      console.error('Erro ao ler SWOT do localStorage:', error);
    }

    return null;
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const swotData = getSWOTDataFromLocalStorage();

      const response = await fetch('/api/chat/luna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          swotData: swotData,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);

      const errorMessage: Message = {
        role: 'assistant',
        content:
          'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col p-0 sm:max-w-lg"
      >
        <SheetHeader className="border-b bg-gradient-to-r from-[#7C3AED] to-[#A855F7] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <SheetTitle className="text-lg text-white">
                Luna - SWOT Specialist
              </SheetTitle>
              <p className="text-sm text-purple-100">
                IA especializada em estratégia
              </p>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea ref={scrollRef} className="flex-1 px-6 py-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                    message.role === 'user' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Bot className="h-5 w-5 text-purple-600" />
                  )}
                </div>

                <div
                  className={`flex-1 rounded-lg px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm">
                    {message.content}
                  </p>
                  <p
                    className={`mt-1 text-xs ${
                      message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                  <Bot className="h-5 w-5 text-purple-600" />
                </div>
                <div className="rounded-lg bg-gray-100 px-4 py-3">
                  <Loader2 className="h-5 w-5 animate-spin text-gray-600" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t bg-gray-50 px-6 py-4">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Pressione Enter para enviar, Shift+Enter para nova linha
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
