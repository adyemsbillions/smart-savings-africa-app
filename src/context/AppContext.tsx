
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Goal {
  id: string;
  name: string;
  icon: string;
  currentAmount: number;
  targetAmount: number;
  progress: number;
  autoSaveAmount: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  autoSaveEnabled: boolean;
  color: string;
}

export interface SavingsCategory {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  description: string;
}

export interface Investment {
  id: string;
  name: string;
  returnRate: number;
  returnPeriod: string;
  minAmount: number;
  description: string;
  investorsCount: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'interest';
  amount: number;
  date: string;
  description: string;
  category?: string;
}

interface AppContextType {
  totalBalance: number;
  goals: Goal[];
  savingsCategories: SavingsCategory[];
  investments: Investment[];
  transactions: Transaction[];
  autoSaveEnabled: boolean;
  isLoading: boolean;
  toggleAutoSave: () => void;
  addToGoal: (goalId: string, amount: number) => void;
  withdrawFromGoal: (goalId: string, amount: number) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  toggleGoalAutoSave: (goalId: string) => void;
  addToSavingsCategory: (categoryId: string, amount: number) => void;
  withdrawFromSavingsCategory: (categoryId: string, amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [totalBalance, setTotalBalance] = useState<number>(9429576);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      name: 'Food',
      icon: 'package',
      currentAmount: 45000,
      targetAmount: 80000,
      progress: 56.25,
      autoSaveAmount: 5000,
      frequency: 'weekly',
      autoSaveEnabled: true,
      color: 'bg-app-success',
    },
    {
      id: '2',
      name: 'House Rent',
      icon: 'home',
      currentAmount: 300000,
      targetAmount: 500000,
      progress: 60,
      autoSaveAmount: 25000,
      frequency: 'monthly',
      autoSaveEnabled: true,
      color: 'bg-app-blue',
    },
    {
      id: '3',
      name: 'School Fees',
      icon: 'graduation-cap',
      currentAmount: 150000,
      targetAmount: 350000,
      progress: 42.86,
      autoSaveAmount: 20000,
      frequency: 'monthly',
      autoSaveEnabled: true,
      color: 'bg-app-warning',
    },
  ]);

  const [savingsCategories, setSavingsCategories] = useState<SavingsCategory[]>([
    {
      id: '1',
      name: 'PiggyBank',
      balance: 4250000,
      interestRate: 14,
      description: 'General savings with interest',
    },
    {
      id: '2',
      name: 'Flex Naira',
      balance: 1729576,
      interestRate: 12,
      description: 'Flexible savings with daily interest',
    },
  ]);

  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: '1',
      name: 'Corporate Debt',
      returnRate: 22.5,
      returnPeriod: 'per annum',
      minAmount: 100000,
      description: 'High yield corporate bonds with fixed returns',
      investorsCount: 2457,
    },
    {
      id: '2',
      name: 'Real Estate',
      returnRate: 11.1,
      returnPeriod: 'in 6 months',
      minAmount: 50000,
      description: 'Property investments with semi-annual returns',
      investorsCount: 1834,
    },
    {
      id: '3',
      name: 'Agriculture',
      returnRate: 18.5,
      returnPeriod: 'per annum',
      minAmount: 25000,
      description: 'Farming investments with good returns',
      investorsCount: 3219,
    },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'deposit',
      amount: 50000,
      date: '2025-05-15T10:23:45',
      description: 'QuickSave to PiggyBank',
      category: 'PiggyBank',
    },
    {
      id: '2',
      type: 'deposit',
      amount: 25000,
      date: '2025-05-14T09:15:22',
      description: 'AutoSave to House Rent',
      category: 'House Rent',
    },
    {
      id: '3',
      type: 'withdrawal',
      amount: 15000,
      date: '2025-05-12T14:45:30',
      description: 'Cash Withdrawal from Flex Naira',
      category: 'Flex Naira',
    },
    {
      id: '4',
      type: 'interest',
      amount: 2347,
      date: '2025-05-10T00:00:00',
      description: 'Interest on PiggyBank savings',
      category: 'PiggyBank',
    },
    {
      id: '5',
      type: 'deposit',
      amount: 20000,
      date: '2025-05-08T11:37:15',
      description: 'AutoSave to School Fees',
      category: 'School Fees',
    },
  ]);

  const toggleAutoSave = () => {
    setAutoSaveEnabled((prev) => !prev);
  };

  const toggleGoalAutoSave = (goalId: string) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            autoSaveEnabled: !goal.autoSaveEnabled,
          };
        }
        return goal;
      })
    );
  };

  const addToGoal = (goalId: string, amount: number) => {
    if (!amount || amount <= 0) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setGoals((prevGoals) =>
        prevGoals.map((goal) => {
          if (goal.id === goalId) {
            const newCurrentAmount = goal.currentAmount + amount;
            const newProgress = Math.min(
              100,
              (newCurrentAmount / goal.targetAmount) * 100
            );
            return {
              ...goal,
              currentAmount: newCurrentAmount,
              progress: parseFloat(newProgress.toFixed(2)),
            };
          }
          return goal;
        })
      );
      
      setTotalBalance((prev) => prev + amount);
      
      // Add transaction
      addTransaction({
        type: 'deposit',
        amount: amount,
        description: `Deposit to ${goals.find(g => g.id === goalId)?.name}`,
        category: goals.find(g => g.id === goalId)?.name,
      });
      
      setIsLoading(false);
    }, 1000);
  };

  const withdrawFromGoal = (goalId: string, amount: number) => {
    if (!amount || amount <= 0) return;
    
    const goal = goals.find(g => g.id === goalId);
    if (!goal || goal.currentAmount < amount) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setGoals((prevGoals) =>
        prevGoals.map((goal) => {
          if (goal.id === goalId && goal.currentAmount >= amount) {
            const newCurrentAmount = goal.currentAmount - amount;
            const newProgress = (newCurrentAmount / goal.targetAmount) * 100;
            return {
              ...goal,
              currentAmount: newCurrentAmount,
              progress: parseFloat(newProgress.toFixed(2)),
            };
          }
          return goal;
        })
      );
      
      setTotalBalance((prev) => prev - amount);
      
      // Add transaction
      addTransaction({
        type: 'withdrawal',
        amount: amount,
        description: `Withdrawal from ${goals.find(g => g.id === goalId)?.name}`,
        category: goals.find(g => g.id === goalId)?.name,
      });
      
      setIsLoading(false);
    }, 1000);
  };

  const addToSavingsCategory = (categoryId: string, amount: number) => {
    if (!amount || amount <= 0) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setSavingsCategories((prevCategories) =>
        prevCategories.map((category) => {
          if (category.id === categoryId) {
            return {
              ...category,
              balance: category.balance + amount,
            };
          }
          return category;
        })
      );
      
      setTotalBalance((prev) => prev + amount);
      
      // Add transaction
      addTransaction({
        type: 'deposit',
        amount: amount,
        description: `Deposit to ${savingsCategories.find(c => c.id === categoryId)?.name}`,
        category: savingsCategories.find(c => c.id === categoryId)?.name,
      });
      
      setIsLoading(false);
    }, 1000);
  };

  const withdrawFromSavingsCategory = (categoryId: string, amount: number) => {
    if (!amount || amount <= 0) return;
    
    const category = savingsCategories.find(c => c.id === categoryId);
    if (!category || category.balance < amount) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setSavingsCategories((prevCategories) =>
        prevCategories.map((category) => {
          if (category.id === categoryId && category.balance >= amount) {
            return {
              ...category,
              balance: category.balance - amount,
            };
          }
          return category;
        })
      );
      
      setTotalBalance((prev) => prev - amount);
      
      // Add transaction
      addTransaction({
        type: 'withdrawal',
        amount: amount,
        description: `Withdrawal from ${savingsCategories.find(c => c.id === categoryId)?.name}`,
        category: savingsCategories.find(c => c.id === categoryId)?.name,
      });
      
      setIsLoading(false);
    }, 1000);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `${transactions.length + 1}`,
      date: new Date().toISOString(),
    };
    
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        totalBalance,
        goals,
        savingsCategories,
        investments,
        transactions,
        autoSaveEnabled,
        isLoading,
        toggleAutoSave,
        addToGoal,
        withdrawFromGoal,
        addTransaction,
        toggleGoalAutoSave,
        addToSavingsCategory,
        withdrawFromSavingsCategory
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
