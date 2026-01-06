import { motion } from 'framer-motion';
import { Plus, TrendingUp, TrendingDown, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Instrument, Watchlist } from '@/types';
import { cn } from '@/lib/utils';

interface WatchlistTableProps {
  watchlist: Watchlist | null;
  onAddInstrument: () => void;
  onEditInstrument: (instrument: Instrument) => void;
  onRemoveInstrument: (instrumentId: string) => void;
}

export function WatchlistTable({
  watchlist,
  onAddInstrument,
  onEditInstrument,
  onRemoveInstrument,
}: WatchlistTableProps) {
  if (!watchlist) {
    return (
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
    );
  }

  if (watchlist.instruments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Plus className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          No instruments yet
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm mb-4">
          Add your first instrument to start tracking its performance.
        </p>
        <Button onClick={onAddInstrument} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Instrument
        </Button>
      </div>
    );
  }

  const calculateChange = (instrument: Instrument) => {
    const referencePrice = instrument.referencePrice;
    const currentPrice = instrument.currentPrice;
    const absoluteChange = currentPrice - referencePrice;
    const percentChange = ((currentPrice - referencePrice) / referencePrice) * 100;
    const isPositive = absoluteChange >= 0;
    return { absoluteChange, percentChange, isPositive };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {watchlist.instruments.length} instrument{watchlist.instruments.length !== 1 ? 's' : ''}
          </span>
        </div>
        <Button
          size="sm"
          onClick={onAddInstrument}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Instrument
        </Button>
      </div>

      <div className="rounded-xl border border-border overflow-hidden bg-card/50">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">Instrument</TableHead>
              <TableHead className="text-muted-foreground font-medium">Reference Price</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Current Price</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Change</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">% Change</TableHead>
              <TableHead className="text-muted-foreground font-medium w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {watchlist.instruments.map((instrument, index) => {
              const { absoluteChange, percentChange, isPositive } = calculateChange(instrument);
              
              return (
                <motion.tr
                  key={instrument.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-border hover:bg-muted/30 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                        <span className="text-sm font-semibold text-foreground">
                          {instrument.ticker.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">
                            {instrument.ticker}
                          </span>
                          <Badge
                            variant="secondary"
                            className="text-[10px] px-1.5 py-0 h-5 bg-muted text-muted-foreground"
                          >
                            {instrument.market}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {instrument.name}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-mono text-foreground">
                        {instrument.market === 'CRYPTO' ? '$' : '₹'}
                        {instrument.referencePrice.toLocaleString('en-IN', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      <Badge
                        variant="outline"
                        className={cn(
                          'w-fit text-[10px] mt-1',
                          instrument.referenceType === 'custom'
                            ? 'border-warning/50 text-warning bg-warning/10'
                            : 'border-border text-muted-foreground'
                        )}
                      >
                        {instrument.referenceType === 'custom' ? 'Custom' : 'Market'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-foreground font-medium">
                    {instrument.market === 'CRYPTO' ? '$' : '₹'}
                    {instrument.currentPrice.toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className={cn(
                      'flex items-center justify-end gap-1 font-mono',
                      isPositive ? 'text-gain' : 'text-loss'
                    )}>
                      {isPositive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span>
                        {isPositive ? '+' : ''}
                        {instrument.market === 'CRYPTO' ? '$' : '₹'}
                        {Math.abs(absoluteChange).toLocaleString('en-IN', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={cn(
                        'inline-flex items-center px-2 py-1 rounded font-mono text-sm font-medium',
                        isPositive
                          ? 'bg-gain/15 text-gain'
                          : 'bg-loss/15 text-loss'
                      )}
                    >
                      {isPositive ? '+' : ''}
                      {percentChange.toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-popover border-border"
                      >
                        <DropdownMenuItem
                          onClick={() => onEditInstrument(instrument)}
                          className="cursor-pointer"
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onRemoveInstrument(instrument.id)}
                          className="cursor-pointer text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
