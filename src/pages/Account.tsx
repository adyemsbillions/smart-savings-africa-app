
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  Settings, 
  CreditCard, 
  BellIcon,
  HelpCircle, 
  LogOut,
  ChevronRight,
} from 'lucide-react';
import TransactionItem from '@/components/TransactionItem';
import CurrencyFormatter from '@/components/CurrencyFormatter';

const Account: React.FC = () => {
  const { transactions, totalBalance } = useAppContext();

  return (
    <div className="pb-24">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Account</h1>
        
        {/* User Profile */}
        <Card className="mb-6 card-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-16 w-16 border">
                <AvatarFallback className="bg-app-blue text-white text-xl">SA</AvatarFallback>
              </Avatar>
              
              <div>
                <h2 className="font-bold text-lg">Samuel Adebayo</h2>
                <p className="text-app-dark-gray">samuel.adebayo@example.com</p>
                <Button variant="link" className="p-0 h-auto text-app-blue text-sm">
                  Edit Profile
                </Button>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-app-dark-gray">Total Balance</p>
                <CurrencyFormatter amount={totalBalance} className="font-bold" />
              </div>
              <Button>View Statement</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Account Settings */}
        <Card className="mb-6 card-shadow">
          <CardContent className="p-0">
            <div className="p-4">
              <h2 className="font-medium">Settings</h2>
            </div>
            
            <div className="divide-y">
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-app-blue bg-opacity-10">
                    <User className="h-4 w-4 text-app-blue" />
                  </div>
                  <span>Personal Information</span>
                </div>
                <ChevronRight className="h-4 w-4 text-app-dark-gray" />
              </div>
              
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-app-blue bg-opacity-10">
                    <CreditCard className="h-4 w-4 text-app-blue" />
                  </div>
                  <span>Bank & Cards</span>
                </div>
                <ChevronRight className="h-4 w-4 text-app-dark-gray" />
              </div>
              
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-app-blue bg-opacity-10">
                    <BellIcon className="h-4 w-4 text-app-blue" />
                  </div>
                  <span>Notifications</span>
                </div>
                <ChevronRight className="h-4 w-4 text-app-dark-gray" />
              </div>
              
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-app-blue bg-opacity-10">
                    <Settings className="h-4 w-4 text-app-blue" />
                  </div>
                  <span>App Settings</span>
                </div>
                <ChevronRight className="h-4 w-4 text-app-dark-gray" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Transactions */}
        <Card className="mb-6 card-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-medium">Recent Transactions</h2>
              <Button variant="ghost" size="sm" className="text-app-blue">
                View All
              </Button>
            </div>
            
            <div>
              {transactions.slice(0, 5).map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Help & Support */}
        <Card className="mb-6 card-shadow">
          <CardContent className="p-0">
            <div className="p-4">
              <h2 className="font-medium">Support</h2>
            </div>
            
            <div className="divide-y">
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-app-blue bg-opacity-10">
                    <HelpCircle className="h-4 w-4 text-app-blue" />
                  </div>
                  <span>Help & Support</span>
                </div>
                <ChevronRight className="h-4 w-4 text-app-dark-gray" />
              </div>
              
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 text-app-error">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-app-error bg-opacity-10">
                    <LogOut className="h-4 w-4 text-app-error" />
                  </div>
                  <span>Logout</span>
                </div>
                <ChevronRight className="h-4 w-4 text-app-error" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <p className="text-center text-xs text-app-dark-gray">
          SmartSave Africa v1.0.0
        </p>
      </div>
    </div>
  );
};

export default Account;
