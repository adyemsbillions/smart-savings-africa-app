
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAppContext } from '@/context/AppContext';
import BalanceCard from '@/components/BalanceCard';
import GoalCard from '@/components/GoalCard';
import TransactionItem from '@/components/TransactionItem';
import AutoSaveToggle from '@/components/AutoSaveToggle';
import CurrencyFormatter from '@/components/CurrencyFormatter';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  ArrowUp, 
  BellIcon, 
  PiggyBank, 
  Wallet
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const Home: React.FC = () => {
  const { 
    totalBalance, 
    goals, 
    savingsCategories, 
    transactions,
    isLoading,
    addToGoal,
    withdrawFromGoal
  } = useAppContext();
  
  const { toast } = useToast();
  
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'deposit' | 'withdraw' | null>(null);
  const [amount, setAmount] = useState<string>('');
  
  const handleGoalClick = (goalId: string) => {
    setSelectedGoal(goalId);
  };
  
  const handleActionClick = (action: 'deposit' | 'withdraw') => {
    setActionType(action);
  };
  
  const handleCloseDialog = () => {
    setSelectedGoal(null);
    setActionType(null);
    setAmount('');
  };
  
  const handleSubmitAction = () => {
    if (!selectedGoal || !actionType || !amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a valid amount.",
      });
      return;
    }
    
    const numAmount = Number(amount);
    const goal = goals.find(g => g.id === selectedGoal);
    
    if (actionType === 'deposit') {
      addToGoal(selectedGoal, numAmount);
      toast({
        title: "Deposit successful",
        description: `You've added ₦${numAmount.toLocaleString()} to your ${goal?.name} goal.`,
      });
    } else {
      if (goal && numAmount > goal.currentAmount) {
        toast({
          variant: "destructive",
          title: "Insufficient funds",
          description: `You don't have enough funds in your ${goal?.name} goal.`,
        });
        return;
      }
      
      withdrawFromGoal(selectedGoal, numAmount);
      toast({
        title: "Withdrawal successful",
        description: `You've withdrawn ₦${numAmount.toLocaleString()} from your ${goal?.name} goal.`,
      });
    }
    
    handleCloseDialog();
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-app-blue p-6 pb-16 relative">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-white text-sm font-normal mb-1">Total Balance</h2>
            <CurrencyFormatter 
              amount={totalBalance} 
              className="text-white text-3xl font-bold"
            />
          </div>
          <BellIcon className="text-white h-6 w-6" />
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="px-4 -mt-10 mb-6 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          <Button 
            className="bg-white text-app-blue hover:bg-gray-100 flex items-center gap-2 py-6"
            onClick={() => handleActionClick('deposit')}
          >
            <Plus className="h-5 w-5" />
            <span>Add Money</span>
          </Button>
          <Button 
            className="bg-white text-app-blue hover:bg-gray-100 flex items-center gap-2 py-6" 
            variant="outline"
            onClick={() => handleActionClick('withdraw')}
          >
            <ArrowUp className="h-5 w-5" />
            <span>Withdraw</span>
          </Button>
        </div>
      </div>
      
      {/* Savings Categories */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Your Savings</h2>
          <AutoSaveToggle />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {savingsCategories.map((category) => (
            <div key={category.id} className="relative">
              <BalanceCard
                balance={category.balance}
                title={category.name}
              />
              <div className="absolute top-1 right-1 bg-app-blue bg-opacity-10 text-app-blue text-xs px-2 py-1 rounded-full">
                {category.interestRate}% p.a
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Goals */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold mb-3">Savings Goals</h2>
        <div className="grid grid-cols-1 gap-3">
          {goals.map((goal) => (
            <GoalCard 
              key={goal.id} 
              goal={goal} 
              onClick={() => handleGoalClick(goal.id)}
            />
          ))}
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold mb-3">Recent Transactions</h2>
        <div className="bg-white rounded-lg card-shadow p-4">
          {transactions.slice(0, 4).map((transaction) => (
            <TransactionItem 
              key={transaction.id} 
              transaction={transaction} 
            />
          ))}
          <Button 
            variant="ghost" 
            className="w-full mt-2 text-app-blue"
          >
            View All Transactions
          </Button>
        </div>
      </div>
      
      {/* Goal Action Dialog */}
      <Dialog open={!!selectedGoal} onOpenChange={() => handleCloseDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {goals.find(g => g.id === selectedGoal)?.name} Goal
            </DialogTitle>
            <DialogDescription>
              Current Balance: <CurrencyFormatter 
                amount={goals.find(g => g.id === selectedGoal)?.currentAmount || 0} 
                className="font-medium"
              />
            </DialogDescription>
          </DialogHeader>
          
          {!actionType ? (
            <div className="grid grid-cols-2 gap-3 pt-4">
              <Button 
                className="flex items-center gap-2"
                onClick={() => handleActionClick('deposit')}
              >
                <Plus className="h-4 w-4" />
                <span>Add Money</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => handleActionClick('withdraw')}
              >
                <ArrowUp className="h-4 w-4" />
                <span>Withdraw</span>
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Amount to {actionType === 'deposit' ? 'add' : 'withdraw'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
                    <Input 
                      className="pl-8" 
                      type="number" 
                      placeholder="0.00" 
                      value={amount} 
                      onChange={(e) => setAmount(e.target.value)} 
                    />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="ghost" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmitAction}
                  disabled={isLoading}
                >
                  {actionType === 'deposit' ? 'Add Money' : 'Withdraw'}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Money Action Dialog */}
      <Dialog 
        open={!selectedGoal && !!actionType} 
        onOpenChange={() => handleActionClick(null as any)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'deposit' ? 'Add Money' : 'Withdraw'}
            </DialogTitle>
            <DialogDescription>
              Choose a goal to {actionType === 'deposit' ? 'add money to' : 'withdraw from'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 py-4">
            {goals.map((goal) => (
              <Button 
                key={goal.id}
                variant="outline"
                className="w-full justify-start text-left h-auto py-3 px-4"
                onClick={() => {
                  setSelectedGoal(goal.id);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full bg-opacity-10 ${goal.color.replace('bg-', 'bg-opacity-10 ')}`}>
                    {(goal.icon === 'home') ? 
                      <PiggyBank className={`h-5 w-5 ${goal.color.replace('bg-', 'text-')}`} /> :
                      <Wallet className={`h-5 w-5 ${goal.color.replace('bg-', 'text-')}`} />
                    }
                  </div>
                  <div>
                    <p className="font-medium">{goal.name}</p>
                    <CurrencyFormatter 
                      amount={goal.currentAmount} 
                      className="text-sm text-app-dark-gray"
                    />
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
