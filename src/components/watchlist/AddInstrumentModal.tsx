import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, Search, Info } from 'lucide-react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Market, ReferenceType, AddInstrumentFormData } from '@/types';
import { tickerDatabase } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface AddInstrumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: AddInstrumentFormData & { currentPrice: number }) => void;
}

export function AddInstrumentModal({ isOpen, onClose, onAdd }: AddInstrumentModalProps) {
  const [ticker, setTicker] = useState('');
  const [market, setMarket] = useState<Market>('NSE');
  const [referenceType, setReferenceType] = useState<ReferenceType>('market');
  const [customPrice, setCustomPrice] = useState('');
  const [error, setError] = useState('');

  // Lookup ticker info
  const tickerInfo = useMemo(() => {
    const upperTicker = ticker.toUpperCase().trim();
    return tickerDatabase[upperTicker] || null;
  }, [ticker]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const upperTicker = ticker.toUpperCase().trim();
    
    if (!upperTicker) {
      setError('Please enter a ticker symbol');
      return;
    }

    if (!tickerInfo) {
      setError('Ticker not found. Try: RELIANCE, TCS, BTC, ETH');
      return;
    }

    if (referenceType === 'custom' && !customPrice) {
      setError('Please enter a custom reference price');
      return;
    }

    const customPriceNum = parseFloat(customPrice);
    if (referenceType === 'custom' && (isNaN(customPriceNum) || customPriceNum <= 0)) {
      setError('Please enter a valid price');
      return;
    }

    onAdd({
      ticker: upperTicker,
      name: tickerInfo.name,
      market: tickerInfo.market,
      referenceType,
      customPrice: referenceType === 'custom' ? customPriceNum : undefined,
      currentPrice: tickerInfo.price,
    });

    // Reset form
    setTicker('');
    setMarket('NSE');
    setReferenceType('market');
    setCustomPrice('');
    setError('');
    onClose();
  };

  const handleClose = () => {
    setTicker('');
    setMarket('NSE');
    setReferenceType('market');
    setCustomPrice('');
    setError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Instrument</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* Ticker Input */}
          <div className="space-y-2">
            <Label htmlFor="ticker">Ticker Symbol</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="ticker"
                placeholder="e.g., RELIANCE, BTC"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                className="pl-10 bg-muted/50 border-border uppercase"
                autoFocus
              />
            </div>
            {tickerInfo && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{tickerInfo.name}</p>
                  <p className="text-xs text-muted-foreground">{tickerInfo.market}</p>
                </div>
                <p className="text-lg font-mono font-semibold text-primary">
                  ₹{tickerInfo.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
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
                  referenceType === 'market'
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-muted/30 hover:bg-muted/50'
                )}
              >
                <RadioGroupItem value="market" id="market" />
                <div>
                  <p className="text-sm font-medium">Market Price</p>
                  <p className="text-xs text-muted-foreground">Use current price</p>
                </div>
              </Label>
              <Label
                htmlFor="custom"
                className={cn(
                  'flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all',
                  referenceType === 'custom'
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-muted/30 hover:bg-muted/50'
                )}
              >
                <RadioGroupItem value="custom" id="custom" />
                <div>
                  <p className="text-sm font-medium">Custom Price</p>
                  <p className="text-xs text-muted-foreground">Set manually</p>
                </div>
              </Label>
            </RadioGroup>
          </div>

          {/* Custom Price Input */}
          {referenceType === 'custom' && (
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
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={!ticker.trim()}
            >
              Add Instrument
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
