import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { MarketOverview } from '@/components/market/MarketOverview';
import { WatchlistSelector } from '@/components/watchlist/WatchlistSelector';
import { WatchlistTable } from '@/components/watchlist/WatchlistTable';
import { AddInstrumentModal } from '@/components/watchlist/AddInstrumentModal';
import { ComingSoonSection } from '@/components/common/ComingSoonSection';
import {
  getWatchlists,
  createWatchlist,
  getWatchlistItems,
  addInstrumentToWatchlist,
  renameWatchlist,
  deleteWatchlist,
  removeInstrumentFromWatchlist
} from '@/lib/api';
import { Watchlist, Instrument, AddInstrumentFormData } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from "@/components/ui/skeleton";
import {TrendingUp} from "lucide-react";

export default function Dashboard() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [selectedWatchlist, setSelectedWatchlist] = useState<Watchlist | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: watchlists = [], isLoading: isLoadingWatchlists, isError: isErrorWatchlists } = useQuery<Watchlist[]>({
    queryKey: ['watchlists'],
    queryFn: getWatchlists,
  });

  const {
    data: watchlistItems = [],
    isLoading: isLoadingWatchlistItems,
    isError: isErrorWatchlistItems,
  } = useQuery<Instrument[]>({
    queryKey: ['watchlistItems', selectedWatchlist?.id],
    queryFn: () => getWatchlistItems(selectedWatchlist!.id),
    enabled: !!selectedWatchlist,
  });

  useEffect(() => {
    if (!selectedWatchlist && watchlists.length > 0) {
      setSelectedWatchlist(watchlists[0]);
    }
  }, [watchlists, selectedWatchlist]);

  const createWatchlistMutation = useMutation({
    mutationFn: createWatchlist,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['watchlists']});
      toast({
        title: 'Watchlist created',
        description: `Watchlist has been created successfully.`,
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

  const renameWatchlistMutation = useMutation({
    mutationFn: renameWatchlist,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['watchlists']});
      toast({
        title: 'Watchlist Renamed',
        description: `Watchlist has been renamed successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error Renaming Watchlist',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  const addInstrumentMutation = useMutation({
    mutationFn: ({ watchlistId, instrumentConfig }: { watchlistId: string, instrumentConfig: AddInstrumentFormData }) =>
      addInstrumentToWatchlist(watchlistId, instrumentConfig),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlistItems', selectedWatchlist?.id] });
      toast({
        title: 'Instrument Added',
        description: 'The instrument has been successfully added to your watchlist.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error Adding Instrument',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleCreateWatchlist = (name: string) => {
    createWatchlistMutation.mutate(name);
  };

  // The following handlers are not yet implemented with API calls.
  // They currently only modify local state and will not persist.
  const handleRenameWatchlist = (id: string, newName: string) => {
    renameWatchlistMutation.mutate({ id, name: newName });
  };

  const deleteWatchlistMutation = useMutation({
    mutationFn: deleteWatchlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlists'] });
      toast({
        title: 'Watchlist Deleted',
        description: 'The watchlist has been successfully deleted.',
      });
      setSelectedWatchlist(null); // Or select the first one if available
    },
    onError: (error) => {
      toast({
        title: 'Error Deleting Watchlist',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleDeleteWatchlist = (id: string) => {
    deleteWatchlistMutation.mutate(id);
  };

  const removeInstrumentMutation = useMutation({
    mutationFn: ({ watchlistId, instrumentId }: { watchlistId: string; instrumentId: string }) =>
      removeInstrumentFromWatchlist(watchlistId, instrumentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlistItems', selectedWatchlist?.id] });
      toast({
        title: 'Instrument Removed',
        description: 'The instrument has been successfully removed from your watchlist.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error Removing Instrument',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ['watchlistItems', selectedWatchlist?.id],
    });
    toast({
      title: 'Refreshing Watchlist',
      description: 'Fetching the latest instrument prices...',
    });
  };


  const handleAddInstrument = (
    data: AddInstrumentFormData & { currentPrice: number }
  ) => {
    if (!selectedWatchlist) {
      toast({
        title: 'No Watchlist Selected',
        description: 'Please select a watchlist before adding an instrument.',
        variant: 'destructive',
      });
      return;
    }

    const instrumentConfig: AddInstrumentFormData = {
      tradingSymbol: data.tradingSymbol,
      exchange: data.exchange,
      name: data.name,
      referenceType: data.referenceType,
      referencePrice: data.referenceType === 'CUSTOM' ? data.referencePrice! : data.currentPrice,
    };

    addInstrumentMutation.mutate({ watchlistId: selectedWatchlist.id, instrumentConfig });
  };

  const handleEditInstrument = (instrument: Instrument) => {
    toast({
      title: 'Edit coming soon',
      description: `Editing ${instrument.tradingSymbol} will be available soon.`,
    });
  };

  const handleRemoveInstrument = (instrumentId: string) => {
    if (!selectedWatchlist) return;
    removeInstrumentMutation.mutate({ watchlistId: selectedWatchlist.id, instrumentId });
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
                {selectedWatchlist ? (
                  <WatchlistTable
                    instruments={watchlistItems}
                    isLoading={isLoadingWatchlistItems}
                    onAddInstrument={() => setIsAddModalOpen(true)}
                    onEditInstrument={handleEditInstrument}
                    onRemoveInstrument={handleRemoveInstrument}
                    onRefresh={handleRefresh}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <TrendingUp className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No watchlist selected
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Select an existing watchlist or create a new one to start tracking instruments.
                    </p>
                  </div>
                )}
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