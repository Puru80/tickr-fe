import { motion } from 'framer-motion';
import { Lock, Sparkles } from 'lucide-react';

export function ComingSoonSection() {
  const sections = [
    {
      title: 'Stock Screeners',
      description: 'Filter and discover stocks based on technical and fundamental criteria.',
      icon: Sparkles,
    },
    {
      title: 'Advanced Indicators',
      description: 'RSI, MACD, Bollinger Bands and more technical analysis tools.',
      icon: Lock,
    },
  ];

  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-foreground mb-4">Coming Soon</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-xl border border-dashed border-border/50 p-6 bg-muted/20"
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted/50">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-foreground/70">
                    {section.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {section.description}
                  </p>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary">
                  Soon
                </span>
              </div>
              
              {/* Blur overlay */}
              <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px]" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
