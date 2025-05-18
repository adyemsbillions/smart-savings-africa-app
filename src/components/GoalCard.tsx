
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import CurrencyFormatter from './CurrencyFormatter';
import { Icon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Goal } from '@/context/AppContext';

interface GoalCardProps {
  goal: Goal;
  onClick?: () => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onClick }) => {
  const IconComponent = (Icons as any)[
    goal.icon.charAt(0).toUpperCase() + goal.icon.slice(1)
  ];

  return (
    <Card 
      className="card-shadow cursor-pointer hover:shadow-md transition-all"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-full bg-opacity-10 ${goal.color.replace('bg-', 'bg-opacity-10 ')}`}>
              {IconComponent && (
                <IconComponent className={`h-5 w-5 ${goal.color.replace('bg-', 'text-')}`} />
              )}
            </div>
            <h3 className="font-medium">{goal.name}</h3>
          </div>
          {goal.autoSaveEnabled && (
            <span className="text-xs bg-app-blue bg-opacity-10 text-app-blue px-2 py-1 rounded-full">
              AutoSave On
            </span>
          )}
        </div>
        
        <div className="mb-3">
          <CurrencyFormatter 
            amount={goal.currentAmount} 
            className="text-lg font-bold"
          />
          <p className="text-xs text-app-dark-gray">
            Target: <CurrencyFormatter amount={goal.targetAmount} className="font-medium" />
          </p>
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-value"
            style={{ width: `${goal.progress}%` }}
          />
        </div>
        <p className="text-xs text-app-dark-gray mt-1 text-right">{goal.progress}%</p>
      </CardContent>
    </Card>
  );
};

export default GoalCard;
