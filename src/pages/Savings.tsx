
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import GoalCard from '@/components/GoalCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { AlertCircle, Plus } from 'lucide-react';
import CurrencyFormatter from '@/components/CurrencyFormatter';

const Savings: React.FC = () => {
  const { goals, savingsCategories, autoSaveEnabled, toggleAutoSave } = useAppContext();

  return (
    <div className="pb-24">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Savings</h1>
        
        {/* Savings Categories */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium">Categories</h2>
            <Button variant="ghost" size="sm" className="text-app-blue">
              See All
            </Button>
          </div>
          
          {savingsCategories.map((category) => (
            <Card key={category.id} className="mb-3 card-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium">{category.name}</h3>
                  <span className="text-xs bg-app-blue bg-opacity-10 text-app-blue px-2 py-1 rounded-full">
                    {category.interestRate}% p.a
                  </span>
                </div>
                
                <CurrencyFormatter 
                  amount={category.balance} 
                  className="text-2xl font-bold"
                />
                
                <p className="text-sm text-app-dark-gray mb-3">
                  {category.description}
                </p>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button>Add Money</Button>
                  <Button variant="outline">Withdraw</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* AutoSave Settings */}
        <div className="mb-6">
          <Card className="card-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-medium">AutoSave</h3>
                  <p className="text-sm text-app-dark-gray">
                    Save automatically for your goals
                  </p>
                </div>
                <Switch 
                  checked={autoSaveEnabled} 
                  onCheckedChange={toggleAutoSave} 
                />
              </div>
              
              {autoSaveEnabled && (
                <>
                  <Separator className="mb-4" />
                  
                  <div className="space-y-4">
                    {goals.map((goal) => (
                      <div key={goal.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{goal.name}</p>
                          <p className="text-sm text-app-dark-gray">
                            <CurrencyFormatter amount={goal.autoSaveAmount} /> {goal.frequency}
                          </p>
                        </div>
                        <Switch 
                          checked={goal.autoSaveEnabled} 
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Savings Goals */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium">Your Goals</h2>
            <Button variant="ghost" size="sm" className="text-app-blue flex items-center gap-1">
              <Plus className="w-4 h-4" />
              <span>New Goal</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
          
          <Card className="mt-4 card-shadow border-dashed">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <AlertCircle className="h-8 w-8 text-app-blue mb-2" />
              <h3 className="font-medium mb-1">Create a new savings goal</h3>
              <p className="text-sm text-app-dark-gray mb-3">
                Set targets and track your progress
              </p>
              <Button className="flex items-center gap-1">
                <Plus className="w-4 h-4" />
                <span>Create Goal</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Savings;
