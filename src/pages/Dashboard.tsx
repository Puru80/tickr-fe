import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { MarketOverview } from '@/components/market/MarketOverview';
import { WatchlistSelector } from '@/components/watchlist/WatchlistSelector';
import { WatchlistTable } from '@/components/watchlist/WatchlistTable';
import { AddInstrumentModal } from '@/components/watchlist/AddInstrumentModal';
import { ComingSoonSection } from '@/components/common/ComingSoonSection';
import { mockWatchlists } from '@/data/mockData';
import { Watchlist, Instrument, AddInstrumentFormData } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const [watchlists, setWatchlists] = useState<Watchlist[]>(mockWatchlists);
  const [selectedWatchlist, setSelectedWatchlist] = useState<Watchlist | null>(
    mockWatchlists[0] || null
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { toast } = useToast();

  // Update selected watchlist when watchlists change
  const updateSelectedWatchlist = useCallback((id: string) => {
    const updated = watchlists.find((w) => w.id === id);
    if (updated) setSelectedWatchlist(updated);
  }, [watchlists]);

  // Create new watchlist
  const handleCreateWatchlist = (name: string) => {
    const newWatchlist: Watchlist = {
      id: Date.now().toString(),
      name,
      instruments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setWatchlists((prev) => [...prev, newWatchlist]);
    setSelectedWatchlist(newWatchlist);
    toast({
      title: 'Watchlist created',
      description: `"${name}" has been created successfully.`,
    });
  };

  // Rename watchlist
  const handleRenameWatchlist = (id: string, newName: string) => {
    setWatchlists((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, name: newName, updatedAt: new Date() } : w
      )
    );
    if (selectedWatchlist?.id === id) {
      setSelectedWatchlist((prev) =>
        prev ? { ...prev, name: newName } : prev
      );
    }
    toast({
      title: 'Watchlist renamed',
      description: `Renamed to "${newName}".`,
    });
  };

  // Delete watchlist
  const handleDeleteWatchlist = (id: string) => {
    const deletedName = watchlists.find((w) => w.id === id)?.name;
    setWatchlists((prev) => prev.filter((w) => w.id !== id));
    if (selectedWatchlist?.id === id) {
      const remaining = watchlists.filter((w) => w.id !== id);
      setSelectedWatchlist(remaining[0] || null);
    }
    toast({
      title: 'Watchlist deleted',
      description: `"${deletedName}" has been deleted.`,
      variant: 'destructive',
    });
  };

  // Add instrument
  const handleAddInstrument = (data: AddInstrumentFormData & { currentPrice: number }) => {
    if (!selectedWatchlist) return;

    const newInstrument: Instrument = {
      id: Date.now().toString(),
      ticker: data.ticker,
      name: data.name,
      market: data.market,
      referenceType: data.referenceType,
      referencePrice:
        data.referenceType === 'custom' && data.customPrice
          ? data.customPrice
          : data.currentPrice,
      currentPrice: data.currentPrice,
      addedAt: new Date(),
    };

    setWatchlists((prev) =>
      prev.map((w) =>
        w.id === selectedWatchlist.id
          ? {
            ...w,
            instruments: [...w.instruments, newInstrument],
            updatedAt: new Date(),
          }
          : w
      )
    );

    setSelectedWatchlist((prev) =>
      prev
        ? {
          ...prev,
          instruments: [...prev.instruments, newInstrument],
        }
        : prev
    );

    toast({
      title: 'Instrument added',
      description: `${data.ticker} has been added to "${selectedWatchlist.name}".`,
    });
  };

  // Edit instrument (for now just show toast)
  const handleEditInstrument = (instrument: Instrument) => {
    toast({
      title: 'Edit coming soon',
      description: `Editing ${instrument.ticker} will be available soon.`,
    });
  };

  // Remove instrument
  const handleRemoveInstrument = (instrumentId: string) => {
    if (!selectedWatchlist) return;

    const instrumentName = selectedWatchlist.instruments.find(
      (i) => i.id === instrumentId
    )?.ticker;

    setWatchlists((prev) =>
      prev.map((w) =>
        w.id === selectedWatchlist.id
          ? {
            ...w,
            instruments: w.instruments.filter((i) => i.id !== instrumentId),
            updatedAt: new Date(),
          }
          : w
      )
    );

    setSelectedWatchlist((prev) =>
      prev
        ? {
          ...prev,
          instruments: prev.instruments.filter((i) => i.id !== instrumentId),
        }
        : prev
    );

    toast({
      title: 'Instrument removed',
      description: `${instrumentName} has been removed.`,
      variant: 'destructive',
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Market Overview */}
        <MarketOverview />

        {/* Watchlist Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Watchlists</h2>
          </div>

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
        </motion.section>

        {/* Coming Soon */}
        <ComingSoonSection />
      </div>

      {/* Add Instrument Modal */}
      <AddInstrumentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddInstrument}
      />
    </DashboardLayout>
  );
}
