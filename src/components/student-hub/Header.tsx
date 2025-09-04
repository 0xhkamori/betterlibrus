import { User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { View } from '@/lib/types';
import { cn } from '@/lib/utils';

interface HeaderProps {
  activeView: View;
  onNavigate: (view: View) => void;
}

export function Header({ activeView, onNavigate }: HeaderProps) {
  const studentFirstName = "Alex"; // Placeholder

  const getTitle = () => {
    if (['Profile', 'Settings'].includes(activeView)) {
        return activeView;
    }
    return activeView === 'Home' ? studentFirstName : activeView;
  }

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 md:px-6 bg-background/80 backdrop-blur-sm border-b border-border">
      <h1 className="text-xl font-bold text-foreground">
        {getTitle()}
      </h1>
      <div className="flex items-center gap-2">
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onNavigate('Profile')}
            className={cn(activeView === 'Profile' && 'bg-accent text-accent-foreground')}
        >
          <User className="h-5 w-5" />
          <span className="sr-only">Profile</span>
        </Button>
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onNavigate('Settings')}
            className={cn(activeView === 'Settings' && 'bg-accent text-accent-foreground')}
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </div>
    </header>
  );
}
