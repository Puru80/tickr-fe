import { motion } from 'framer-motion';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Filter, Lock } from 'lucide-react';

export default function Screeners() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground">Screeners</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Filter and discover stocks based on your criteria.
            </p>
          </div>

          {/* Coming Soon State */}
          <div className="relative overflow-hidden rounded-xl border border-dashed border-border/50 bg-card/30">
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <Filter className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-primary" />
                <h3 className="text-lg font-medium text-foreground/70">
                  Coming Soon
                </h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm">
                Advanced screeners with technical and fundamental filters are currently in development.
              </p>
              <span className="mt-4 px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                Expected Q2 2024
              </span>
            </div>

            {/* Blur overlay */}
            <div className="absolute inset-0 bg-background/10 backdrop-blur-[2px]" />
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
