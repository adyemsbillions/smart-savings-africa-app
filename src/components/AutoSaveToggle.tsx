
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { useAppContext } from '@/context/AppContext';

const AutoSaveToggle: React.FC = () => {
  const { autoSaveEnabled, toggleAutoSave } = useAppContext();

  return (
    <div className="flex items-center space-x-2">
      <Switch 
        checked={autoSaveEnabled} 
        onCheckedChange={toggleAutoSave} 
        id="autosave-toggle" 
      />
      <label 
        htmlFor="autosave-toggle" 
        className="text-sm font-medium cursor-pointer"
      >
        AutoSave {autoSaveEnabled ? 'On' : 'Off'}
      </label>
    </div>
  );
};

export default AutoSaveToggle;
