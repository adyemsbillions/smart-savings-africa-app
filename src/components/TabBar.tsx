
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Home, 
  PiggyBank,
  TrendingUp,
  User
} from 'lucide-react';

const TabBar: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  
  const tabs = [
    {
      name: 'Home',
      path: '/',
      icon: Home,
    },
    {
      name: 'Save',
      path: '/savings',
      icon: PiggyBank,
    },
    {
      name: 'Invest',
      path: '/invest',
      icon: TrendingUp,
    },
    {
      name: 'Account',
      path: '/account',
      icon: User,
    },
  ];
  
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-16 card-shadow z-50">
      {tabs.map((tab) => (
        <Link 
          key={tab.path} 
          to={tab.path}
          className={`flex flex-col items-center justify-center h-full w-full ${
            isActive(tab.path) 
              ? 'text-app-blue' 
              : 'text-app-dark-gray'
          }`}
        >
          <tab.icon className="h-5 w-5 mb-1" />
          <span className="text-xs">{tab.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default TabBar;
