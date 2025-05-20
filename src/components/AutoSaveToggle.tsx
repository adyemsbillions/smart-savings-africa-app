
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { useAppContext } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

const AutoSaveToggle: React.FC = () => {
  const { autoSaveEnabled, toggleAutoSave } = useAppContext();
  const { toast } = useToast();
  
  const handleToggle = () => {
    toggleAutoSave();
    toast({
      title: `AutoSave ${!autoSaveEnabled ? 'Enabled' : 'Disabled'}`,
      description: `Your savings will ${!autoSaveEnabled ? 'now be' : 'no longer be'} automatically saved.`,
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch 
        checked={autoSaveEnabled} 
        onCheckedChange={handleToggle} 
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
