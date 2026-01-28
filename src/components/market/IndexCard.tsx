import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { MarketIndex } from '@/types';
import { cn } from '@/lib/utils';

interface IndexCardProps {
  index: MarketIndex;
  delay?: number;
}

export function IndexCard({ index, delay = 0 }: IndexCardProps) {
  const change = index.lastPrice - index.close;
  const changePercent =
    index.close === 0 ? 0 : (change / index.close) * 100;
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        'relative overflow-hidden rounded-xl border border-border p-4',
        isPositive ? 'bg-gain' : 'bg-loss'
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {index.instrumentName}
          </p>
          <p className="text-2xl font-semibold font-mono text-foreground mt-1">
            {index.lastPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div
          className={cn(
            'flex items-center justify-center w-8 h-8 rounded-lg',
            isPositive ? 'bg-gain/50' : 'bg-loss/50'
          )}
        >
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-gain" />
          ) : (
            <TrendingDown className="w-4 h-4 text-loss" />
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <span
          className={cn(
            'text-sm font-medium font-mono',
            isPositive ? 'text-gain' : 'text-loss'
          )}
        >
          {isPositive ? '+' : ''}
          {change.toFixed(2)}
        </span>
        <span
          className={cn(
            'px-1.5 py-0.5 text-xs font-medium rounded',
            isPositive
              ? 'bg-gain/20 text-gain'
              : 'bg-loss/20 text-loss'
          )}
        >
          {isPositive ? '+' : ''}
          {changePercent.toFixed(2)}%
        </span>
      </div>

      {/* Decorative gradient */}
      <div
        className={cn(
          'absolute -right-8 -bottom-8 w-24 h-24 rounded-full opacity-20 blur-2xl',
          isPositive ? 'bg-gain' : 'bg-loss'
        )}
      />
    </motion.div>
  );
}
