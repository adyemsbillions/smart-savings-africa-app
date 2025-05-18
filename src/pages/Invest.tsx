
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { useToast } from '@/components/ui/use-toast';
import InvestmentCard from '@/components/InvestmentCard';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, TrendingUp } from 'lucide-react';
import CurrencyFormatter from '@/components/CurrencyFormatter';

const Invest: React.FC = () => {
  const { investments } = useAppContext();
  const { toast } = useToast();
  
  const handleInvest = () => {
    toast({
      title: "Investment started",
      description: "We'll guide you through the investment process.",
    });
  };

  return (
    <div className="pb-24">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Invest</h1>
        
        {/* Investment Overview */}
        <Card className="mb-6 card-shadow">
          <CardContent className="p-4">
            <h2 className="font-medium mb-3">Your Investment Portfolio</h2>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-app-dark-gray">Total Value</p>
                <CurrencyFormatter amount={3450000} className="text-xl font-bold" />
              </div>
              <div>
                <p className="text-sm text-app-dark-gray">Total Returns</p>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-app-success mr-1" />
                  <span className="text-app-success font-bold">+18.5%</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center py-4">
              <PieChart className="h-16 w-16 text-app-blue" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-app-dark-gray">Corporate Debt</p>
                <div className="flex items-center justify-between">
                  <CurrencyFormatter amount={1850000} className="font-medium" />
                  <span className="text-xs font-medium">54%</span>
                </div>
                <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mt-1">
                  <div className="bg-app-blue h-full rounded-full" style={{ width: '54%' }} />
                </div>
              </div>
              
              <div>
                <p className="text-xs text-app-dark-gray">Real Estate</p>
                <div className="flex items-center justify-between">
                  <CurrencyFormatter amount={1600000} className="font-medium" />
                  <span className="text-xs font-medium">46%</span>
                </div>
                <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mt-1">
                  <div className="bg-app-success h-full rounded-full" style={{ width: '46%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Investment Opportunities */}
        <div>
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4 space-y-4">
              {investments.map((investment) => (
                <InvestmentCard 
                  key={investment.id} 
                  investment={investment} 
                  onInvest={handleInvest}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="trending" className="mt-4 space-y-4">
              {investments.slice(0, 2).map((investment) => (
                <InvestmentCard 
                  key={investment.id} 
                  investment={investment} 
                  onInvest={handleInvest}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="new" className="mt-4 space-y-4">
              {investments.slice(2, 3).map((investment) => (
                <InvestmentCard 
                  key={investment.id} 
                  investment={investment} 
                  onInvest={handleInvest}
                />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Invest;
