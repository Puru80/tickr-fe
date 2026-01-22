import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Watchlist } from '@/types';
import { cn } from '@/lib/utils';

interface WatchlistSelectorProps {
  watchlists: Watchlist[];
  selectedWatchlist: Watchlist | null;
  onSelectWatchlist: (watchlist: Watchlist) => void;
  onCreateWatchlist: (name: string) => void;
  onRenameWatchlist: (id: string, newName: string) => void;
  onDeleteWatchlist: (id: string) => void;
}

export function WatchlistSelector({
  watchlists,
  selectedWatchlist,
  onSelectWatchlist,
  onCreateWatchlist,
  onRenameWatchlist,
  onDeleteWatchlist,
}: WatchlistSelectorProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [renameValue, setRenameValue] = useState('');

  const handleCreate = () => {
    if (newWatchlistName.trim()) {
      onCreateWatchlist(newWatchlistName.trim());
      setNewWatchlistName('');
      setIsCreateDialogOpen(false);
    }
  };

  const handleRename = () => {
    if (selectedWatchlist && renameValue.trim()) {
      onRenameWatchlist(selectedWatchlist.id, renameValue.trim());
      setRenameValue('');
      setIsRenameDialogOpen(false);
    }
  };

  const handleDelete = () => {
    if (selectedWatchlist) {
      onDeleteWatchlist(selectedWatchlist.id);
      setIsDeleteDialogOpen(false);
    }
  };

  const openRenameDialog = () => {
    if (selectedWatchlist) {
      setRenameValue(selectedWatchlist.name);
      setIsRenameDialogOpen(true);
    }
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Watchlist Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="min-w-[200px] justify-between bg-muted/50 border-border"
          >
            <span className="truncate">
              {selectedWatchlist?.name || 'Select Watchlist'}
            </span>
            <ChevronDown className="w-4 h-4 ml-2 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px] bg-popover border-border">
          {watchlists.map((watchlist) => (
            <DropdownMenuItem
              key={watchlist.id}
              onClick={() => onSelectWatchlist(watchlist)}
              className={cn(
                'cursor-pointer',
                selectedWatchlist?.id === watchlist.id && 'bg-primary/10 text-primary'
              )}
            >
              <span className="truncate">{watchlist.name}</span>
              {/*<span className="ml-auto text-xs text-muted-foreground">*/}
              {/*  {watchlist.instruments.length}*/}
              {/*</span>*/}
            </DropdownMenuItem>
          ))}
          {watchlists.length === 0 && (
            <div className="px-2 py-4 text-sm text-center text-muted-foreground">
              No watchlists yet
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-1" />
          New
        </Button>

        {selectedWatchlist && (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={openRenameDialog}
              className="text-muted-foreground hover:text-foreground"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Create New Watchlist</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Watchlist name"
              value={newWatchlistName}
              onChange={(e) => setNewWatchlistName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              className="bg-muted/50 border-border"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!newWatchlistName.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Rename Watchlist</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="New name"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRename()}
              className="bg-muted/50 border-border"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setIsRenameDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRename}
              disabled={!renameValue.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Watchlist</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedWatchlist?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-muted hover:bg-muted/80">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}