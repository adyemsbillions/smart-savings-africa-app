
import React from 'react';

interface CurrencyFormatterProps {
  amount: number;
  currency?: string;
  className?: string;
}

const CurrencyFormatter: React.FC<CurrencyFormatterProps> = ({
  amount,
  currency = '₦',
  className = '',
}) => {
  // Handle potential NaN or undefined values
  const safeAmount = isNaN(amount) ? 0 : amount;
  
  const formattedAmount = new Intl.NumberFormat('en-NG', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safeAmount);

  return (
    <span className={className}>
      {currency}
      {formattedAmount}
    </span>
  );
};

export default CurrencyFormatter;
