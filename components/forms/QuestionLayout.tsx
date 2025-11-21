import { ReactNode } from 'react';

interface QuestionLayoutProps {
  stepNumber: number;
  question: string;
  microcopy: string;
  children: ReactNode;
}

export function QuestionLayout({
  stepNumber,
  question,
  microcopy,
  children,
}: QuestionLayoutProps) {
  return (
    <div className="question-enter flex w-full flex-col gap-6">
      <div>
        <div className="mb-2 text-base font-bold text-royal-blue">
          {stepNumber} →
        </div>
        <h2 className="mb-3 text-2xl font-bold leading-tight text-navy-blue md:text-3xl lg:text-4xl">
          {question}
        </h2>
        <p className="text-base text-gray-600 md:text-lg">{microcopy}</p>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}
