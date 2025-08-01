import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Portfolio Value',
      value: '$24,567.89',
      change: '+12.34%',
      positive: true,
      icon: DollarSign
    },
    {
      title: 'Daily P&L',
      value: '$1,234.56',
      change: '+5.67%',
      positive: true,
      icon: TrendingUp
    },
    {
      title: 'Active Positions',
      value: '8',
      change: '+2',
      positive: true,
      icon: Activity
    },
    {
      title: 'Watchlist Items',
      value: '15',
      change: '+3',
      positive: true,
      icon: TrendingUp
    }
  ];

  const watchlistItems = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '$185.23', change: '+2.34%', positive: true },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: '$242.67', change: '-1.45%', positive: false },
    { symbol: 'BTC', name: 'Bitcoin', price: '$43,567.89', change: '+5.67%', positive: true },
    { symbol: 'ETH', name: 'Ethereum', price: '$2,634.12', change: '+3.21%', positive: true },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '$138.45', change: '+1.23%', positive: true },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your investments today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <Card key={stat.title} className="p-6 bg-gradient-card shadow-card border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className={`text-sm font-medium ${
                  stat.positive ? 'text-accent' : 'text-destructive'
                }`}>
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                stat.positive ? 'bg-accent/10' : 'bg-destructive/10'
              }`}>
                <stat.icon className={`h-6 w-6 ${
                  stat.positive ? 'text-accent' : 'text-destructive'
                }`} />
              </div>
            </div>
          </Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Watchlist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-6 bg-gradient-card shadow-card border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">Watchlist</h2>
            <div className="space-y-4">
              {watchlistItems.map((item) => (
                <div key={item.symbol} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{item.symbol}</p>
                    <p className="text-sm text-muted-foreground">{item.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{item.price}</p>
                    <p className={`text-sm font-medium ${
                      item.positive ? 'text-accent' : 'text-destructive'
                    }`}>
                      {item.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="p-6 bg-gradient-card shadow-card border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Bought AAPL</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <p className="text-sm font-medium text-foreground">+10 shares</p>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center">
                  <TrendingDown className="h-4 w-4 text-destructive" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Sold TSLA</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
                <p className="text-sm font-medium text-foreground">-5 shares</p>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Price Alert Triggered</p>
                  <p className="text-xs text-muted-foreground">BTC reached $45,000</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;