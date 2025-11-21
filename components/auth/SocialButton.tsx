import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

interface SocialButtonProps {
  provider: 'google';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function SocialButton({
  provider,
  onClick,
  disabled = false,
  children,
}: SocialButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-auto w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-[14px] text-[16px] font-medium text-carbon transition-all hover:bg-gray-50"
      onClick={onClick}
      disabled={disabled}
    >
      <Mail className="mr-2 h-5 w-5" />
      {children}
    </Button>
  );
}
