import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Circle, ChevronDown, LogOut, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from './ThemeToggle';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { useMarketStatus } from '@/hooks/useMarketStatus';

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, loading: authLoading, logout } = useAuth();
  const { marketStatus, loading: marketLoading, error: marketError } = useMarketStatus();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderMarketStatus = () => {
    if (marketLoading) {
      return <Skeleton className="w-24 h-5" />;
    }

    if (marketError || !marketStatus) {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50">
          <Circle className="w-2 h-2 fill-destructive text-destructive" />
          <span className="text-xs font-medium text-muted-foreground">
            Status Unavailable
          </span>
        </div>
      )
    }

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50"
      >
        <Circle className={`w-2 h-2 ${marketStatus.open ? 'fill-gain text-gain animate-pulse-glow' : 'fill-destructive text-destructive'}`} />
        <span className="text-xs font-medium text-muted-foreground">
          {marketStatus.open ? 'Market Open' : 'Market Closed'}
        </span>
      </motion.div>
    )
  }

  return (
    <header className="flex items-center justify-between h-16 px-6 border-b border-border bg-card/50 backdrop-blur-sm">
      {/* Search */}
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search ticker..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-muted focus:border-primary"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Market Status */}
        {renderMarketStatus()}

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              {authLoading ? (
                <>
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="hidden h-5 md:block w-14" />
                </>
              ) : user ? (
                <>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/20 text-primary text-sm">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline text-sm font-medium">
                    {user.name}
                  </span>
                </>
              ) : null}
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
              onSelect={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
