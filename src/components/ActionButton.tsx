
import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon: IconComponent,
  onClick,
  variant = 'default',
  disabled = false,
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className="flex flex-col items-center justify-center h-20 gap-1 w-full"
      disabled={disabled}
    >
      <IconComponent className="h-5 w-5" />
      <span className="text-xs">{label}</span>
    </Button>
  );
};

export default ActionButton;
