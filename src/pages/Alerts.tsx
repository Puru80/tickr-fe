import { motion } from 'framer-motion';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Alerts() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Alerts</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Get notified when your instruments hit target prices.
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Alert
            </Button>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-dashed border-border bg-card/30">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No alerts configured
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              Create price alerts to get notified when instruments reach your target levels.
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Alert
            </Button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
