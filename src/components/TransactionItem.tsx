
import React from 'react';
import { Transaction } from '@/context/AppContext';
import CurrencyFormatter from './CurrencyFormatter';
import { ArrowDown, ArrowUp, Plus } from 'lucide-react';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const getIcon = () => {
    switch (transaction.type) {
      case 'deposit':
        return <Plus className="h-4 w-4 text-app-success" />;
      case 'withdrawal':
        return <ArrowUp className="h-4 w-4 text-app-error" />;
      case 'interest':
        return <ArrowDown className="h-4 w-4 text-app-blue" />;
      default:
        return <Plus className="h-4 w-4 text-app-success" />;
    }
  };
  
  const getAmountColor = () => {
    switch (transaction.type) {
      case 'deposit':
        return 'text-app-success';
      case 'withdrawal':
        return 'text-app-error';
      case 'interest':
        return 'text-app-blue';
      default:
        return 'text-app-success';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-gray-100">
          {getIcon()}
        </div>
        <div>
          <p className="font-medium text-sm">{transaction.description}</p>
          <p className="text-xs text-app-dark-gray">{formatDate(transaction.date)}</p>
        </div>
      </div>
      <CurrencyFormatter 
        amount={transaction.amount}
        className={`font-bold ${getAmountColor()}`}
      />
    </div>
  );
};

export default TransactionItem;
