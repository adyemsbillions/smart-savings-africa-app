
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CurrencyFormatter from './CurrencyFormatter';
import { Investment } from '@/context/AppContext';

interface InvestmentCardProps {
  investment: Investment;
  onInvest: () => void;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({
  investment,
  onInvest,
}) => {
  return (
    <Card className="card-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg">{investment.name}</h3>
          <div className="bg-app-success bg-opacity-10 text-app-success px-2 py-1 rounded-full text-xs font-medium">
            {investment.returnRate}% {investment.returnPeriod}
          </div>
        </div>
        
        <p className="text-sm text-app-dark-gray mb-4">{investment.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-app-dark-gray">Min. Investment</p>
            <CurrencyFormatter amount={investment.minAmount} className="font-medium" />
          </div>
          <div className="text-right">
            <p className="text-xs text-app-dark-gray">Investors</p>
            <p className="font-medium">{investment.investorsCount.toLocaleString()}</p>
          </div>
        </div>
        
        <Button 
          onClick={onInvest}
          className="w-full"
        >
          Invest Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default InvestmentCard;
