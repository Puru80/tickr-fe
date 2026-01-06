import { motion } from 'framer-motion';
import { IndexCard } from './IndexCard';
import { mockMarketIndices } from '@/data/mockData';

export function MarketOverview() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Market Overview</h2>
        <span className="text-xs text-muted-foreground">
          Last updated: Just now
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockMarketIndices.map((index, i) => (
          <IndexCard key={index.id} index={index} delay={i * 0.1} />
        ))}
      </div>
    </motion.section>
  );
}
