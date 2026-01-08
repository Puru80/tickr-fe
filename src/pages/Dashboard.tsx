import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { MarketOverview } from '@/components/market/MarketOverview';
import { WatchlistSelector } from '@/components/watchlist/WatchlistSelector';
import { WatchlistTable } from '@/components/watchlist/WatchlistTable';
import { AddInstrumentModal } from '@/components/watchlist/AddInstrumentModal';
import { ComingSoonSection } from '@/components/common/ComingSoonSection';
import { getWatchlists, createWatchlist } from '@/lib/api';
import { Watchlist, Instrument, AddInstrumentFormData } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [selectedWatchlist, setSelectedWatchlist] = useState<Watchlist | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: watchlists = [], isLoading: isLoadingWatchlists, isError: isErrorWatchlists } = useQuery<Watchlist[]>({
    queryKey: ['watchlists'],
    queryFn: getWatchlists,
  });

  useEffect(() => {
    if (!selectedWatchlist && watchlists.length > 0) {
      setSelectedWatchlist(watchlists[0]);
    }
  }, [watchlists, selectedWatchlist]);

  const createWatchlistMutation = useMutation({
    mutationFn: createWatchlist,
    onSuccess: (newWatchlist) => {
      queryClient.invalidateQueries({ queryKey: ['watchlists'] });
      setSelectedWatchlist(newWatchlist);
      toast({
        title: 'Watchlist created',
        description: `"${newWatchlist.name}" has been created successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error creating watchlist',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  const handleCreateWatchlist = (name: string) => {
    createWatchlistMutation.mutate(name);
  };

  // The following handlers are not yet implemented with API calls.
  // They currently only modify local state and will not persist.
  const handleRenameWatchlist = (id: string, newName: string) => {
    // TODO: Implement API call for renaming watchlist
    console.log('Rename watchlist (local):', id, newName);
    toast({
      title: 'Rename (local)',
      description: `Renamed to "${newName}".`,
    });
  };

  const handleDeleteWatchlist = (id: string) => {
    // TODO: Implement API call for deleting watchlist
    console.log('Delete watchlist (local):', id);
    toast({
      title: 'Delete (local)',
      description: `Watchlist with id ${id} deleted locally.`,
      variant: 'destructive',
    });
  };

  const handleAddInstrument = (data: AddInstrumentFormData & { currentPrice: number }) => {
    // TODO: Implement API call for adding instrument
    console.log('Add instrument (local):', data);
    toast({
      title: 'Instrument added (local)',
      description: `${data.ticker} has been added locally.`,
    });
  };

  const handleEditInstrument = (instrument: Instrument) => {
    toast({
      title: 'Edit coming soon',
      description: `Editing ${instrument.ticker} will be available soon.`,
    });
  };

  const handleRemoveInstrument = (instrumentId: string) => {
    // TODO: Implement API call for removing instrument
    console.log('Remove instrument (local):', instrumentId);
    toast({
      title: 'Instrument removed (local)',
      description: `Instrument with id ${instrumentId} removed locally.`,
      variant: 'destructive',
    });
  };

  if (isErrorWatchlists) {
    return (
      <DashboardLayout>
        <div className="text-red-500">Error fetching watchlists.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <MarketOverview />

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Watchlists</h2>
          </div>

          {isLoadingWatchlists ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          ) : (
            <>
              <WatchlistSelector
                watchlists={watchlists}
                selectedWatchlist={selectedWatchlist}
                onSelectWatchlist={setSelectedWatchlist}
                onCreateWatchlist={handleCreateWatchlist}
                onRenameWatchlist={handleRenameWatchlist}
                onDeleteWatchlist={handleDeleteWatchlist}
              />

              <div className="mt-6">
                <WatchlistTable
                  watchlist={selectedWatchlist}
                  onAddInstrument={() => setIsAddModalOpen(true)}
                  onEditInstrument={handleEditInstrument}
                  onRemoveInstrument={handleRemoveInstrument}
                />
              </div>
            </>
          )}
        </motion.section>

        <ComingSoonSection />
      </div>

      <AddInstrumentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddInstrument}
      />
    </DashboardLayout>
  );
}

