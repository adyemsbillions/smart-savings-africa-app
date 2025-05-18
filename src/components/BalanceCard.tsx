
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import CurrencyFormatter from './CurrencyFormatter';

interface BalanceCardProps {
  balance: number;
  title: string;
  className?: string;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  title,
  className = '',
}) => {
  return (
    <Card className={`card-shadow ${className}`}>
      <CardContent className="p-4">
        <h3 className="text-sm text-app-dark-gray font-medium mb-1">{title}</h3>
        <CurrencyFormatter
          amount={balance}
          className="text-2xl font-bold"
        />
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
