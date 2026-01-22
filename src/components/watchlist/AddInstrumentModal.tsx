import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {Info, Loader2} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from '@/components/ui/command';
import { ReferenceType, AddInstrumentFormData, Instrument } from '@/types';
import { cn } from '@/lib/utils';
import { searchInstruments } from '@/lib/api';
import { useDebounce } from 'use-debounce';

interface AddInstrumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: AddInstrumentFormData & { currentPrice: number }) => void;
}

// A lighter version for search results
type InstrumentSearchResult = Pick<Instrument, 'tradingSymbol' | 'name' | 'exchange' | 'lastPrice'>;

export function AddInstrumentModal({ isOpen, onClose, onAdd }: AddInstrumentModalProps) {
  // Search-related state
  const [tickerInput, setTickerInput] = useState('');
  const [debouncedTicker] = useDebounce(tickerInput, 300);
  const [searchResults, setSearchResults] = useState<InstrumentSearchResult[]>([]);
  const [selectedInstrument, setSelectedInstrument] = useState<InstrumentSearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form-related state
  const [referenceType, setReferenceType] = useState<ReferenceType>('MARKET');
  const [customPrice, setCustomPrice] = useState('');

  // Effect to reset all states when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setTickerInput('');
      setSearchResults([]);
      setSelectedInstrument(null);
      setIsLoading(false);
      setError('');
      setReferenceType('MARKET');
      setCustomPrice('');
    }
  }, [isOpen]);

  // Effect to clear selected instrument if user types again
  useEffect(() => {
    if (selectedInstrument && tickerInput.toUpperCase().trim() !== selectedInstrument.tradingSymbol) {
      setSelectedInstrument(null);
    }
  }, [tickerInput, selectedInstrument]);

  // Effect to perform the debounced instrument search
  useEffect(() => {
    const shouldSearch = debouncedTicker.trim().length >= 3 && !selectedInstrument;

    if (!shouldSearch) {
      setSearchResults([]);
      return;
    }

    const performSearch = async () => {
      setIsLoading(true);
      setError('');
      try {
        const results = await searchInstruments(debouncedTicker);
        const instruments = results.content;
        setSearchResults(Array.isArray(instruments) ? instruments : []);
      } catch (err) {
        setError((err as Error).message || 'Search failed');
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedTicker, selectedInstrument]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedInstrument) {
      setError('Please select an instrument from the search results.');
      return;
    }

    if (referenceType === 'CUSTOM' && !customPrice) {
      setError('Please enter a custom reference price');
      return;
    }

    const customPriceNum = parseFloat(customPrice);
    if (referenceType === 'CUSTOM' && (isNaN(customPriceNum) || customPriceNum <= 0)) {
      setError('Please enter a valid price');
      return;
    }

    onAdd({
      tradingSymbol: selectedInstrument.tradingSymbol,
      name: selectedInstrument.name,
      exchange: selectedInstrument.exchange,
      referenceType,
      referencePrice: referenceType === 'CUSTOM' ? customPriceNum : undefined,
      currentPrice: selectedInstrument.lastPrice,
    });

    onClose(); // Close modal after successful add
  };

  const handleSelectInstrument = (instrument: InstrumentSearchResult) => {
    setSelectedInstrument(instrument);
    setTickerInput(instrument.tradingSymbol); // Set input value to selected ticker
    setSearchResults([]); // Clear search results to hide the dropdown
  };

  // Determine if search results dropdown should be visible
  const showSearchResultsDropdown = tickerInput.trim().length >= 3 && !selectedInstrument;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Instrument</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* Ticker Search Input */}
          <div className="space-y-2">
            <Label htmlFor="ticker">Ticker Symbol</Label>
            <Command shouldFilter={false} className="relative rounded-lg border border-border">
              <CommandInput
                id="ticker"
                placeholder="e.g., RELIANCE, BTC"
                value={tickerInput}
                onValueChange={(value) => setTickerInput(value.toUpperCase())}
                className="pl-10 bg-muted/50 border-border uppercase"
                autoFocus
              />
              {isLoading && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
              )}

              <CommandList
                className={cn(
                  'bg-popover border border-t-0 rounded-b-md max-h-[300px] overflow-y-auto',
                  !showSearchResultsDropdown && 'hidden' // Reverting to hidden for simplicity during diagnosis
                )}
              >
                {isLoading ? (
                  <div /> // Show nothing while loading, the spinner is in the input
                ) : searchResults.length > 0 ? (
                  searchResults.map((item, index) => (
                    <CommandItem
                      key={index}
                      onSelect={() => handleSelectInstrument(item)}
                      className="flex items-center p-3 cursor-pointer bg-blue-950"
                    >
                      <div
                        className={cn(
                          "w-10 h-10 flex items-center justify-center rounded-md text-xs font-semibold",
                          item.exchange === 'NSE' && "bg-blue-200 text-blue-800",
                          item.exchange === 'BSE' && "bg-red-200 text-red-800",
                          (item.exchange !== 'NSE' && item.exchange !== 'BSE') && "bg-primary text-primary-foreground"
                        )}
                      >
                        {item.exchange}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-foreground">{item.tradingSymbol}</p>
                        <p className="text-xs text-muted-foreground">{item.name}</p>
                      </div>
                    </CommandItem>
                  ))
                ) : (
                  <CommandEmpty>No results found.</CommandEmpty>
                )}
              </CommandList>
            </Command>

            {/* Selected Instrument Display */}
            {selectedInstrument && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center p-3 rounded-lg bg-muted/50 border border-border mt-2"
              >
                <div
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-md text-xs font-semibold",
                    selectedInstrument.exchange === 'NSE' && "bg-blue-200 text-blue-800",
                    selectedInstrument.exchange === 'BSE' && "bg-red-200 text-red-800",
                    (selectedInstrument.exchange !== 'NSE' && selectedInstrument.exchange !== 'BSE') && "bg-primary text-primary-foreground"
                  )}
                >
                  {selectedInstrument.exchange}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-foreground">{selectedInstrument.tradingSymbol}</p>
                  <p className="text-xs text-muted-foreground">{selectedInstrument.name}</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Reference Price Type */}
          <div className="space-y-3">
            <Label>Reference Price</Label>
            <RadioGroup
              value={referenceType}
              onValueChange={(v) => setReferenceType(v as ReferenceType)}
              className="grid grid-cols-2 gap-3"
            >
              <Label
                htmlFor="market"
                className={cn(
                  'flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all',
                  referenceType === 'MARKET'
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-muted/30 hover:bg-muted/50'
                )}
              >
                <RadioGroupItem value="MARKET" id="market" />
                <div>
                  <p className="text-sm font-medium">Market Price</p>
                  <p className="text-xs text-muted-foreground">Use current price</p>
                </div>
              </Label>
              <Label
                htmlFor="custom"
                className={cn(
                  'flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all',
                  referenceType === 'CUSTOM'
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-muted/30 hover:bg-muted/50'
                )}
              >
                <RadioGroupItem value="CUSTOM" id="custom" />
                <div>
                  <p className="text-sm font-medium">Custom Price</p>
                  <p className="text-xs text-muted-foreground">Set manually</p>
                </div>
              </Label>
            </RadioGroup>
          </div>

          {/* Custom Price Input */}
          {referenceType === 'CUSTOM' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <Label htmlFor="customPrice">Custom Reference Price</Label>
              <Input
                id="customPrice"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter price"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                className="bg-muted/50 border-border font-mono"
              />
              <div className="flex items-start gap-2 p-2 rounded bg-muted/30 text-xs text-muted-foreground">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  The % change will be calculated from this custom price instead of the market price when you added the instrument.
                </span>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-destructive"
            >
              {error}
            </motion.p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={!selectedInstrument}
            >
              Add Instrument
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}