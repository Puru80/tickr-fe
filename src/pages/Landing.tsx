import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, Zap, BarChart3 } from 'lucide-react';
import logo from '@/assets/logo.png';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-dark dark">
      {/* Navigation */}
      <nav className="p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <img src={logo} alt="Tickr" className="h-8 w-8" />
            <span className="text-2xl font-bold text-foreground">Tickr</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <Link to="/login">
              <Button variant="ghost" className="text-foreground hover:text-accent">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="gradient" className="shadow-glow">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-foreground mb-6"
          >
            Track Stocks & Crypto
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Like Never Before
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
          >
            Real-time insights. Custom price alerts. Built for serious investors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/register">
              <Button size="lg" variant="gradient" className="text-lg px-8 py-6 shadow-glow animate-glow">
                Start Trading
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Sign In
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16"
          >
            Everything you need to stay ahead
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Real-time Data",
                description: "Live market data and instant price updates"
              },
              {
                icon: Shield,
                title: "Secure Platform",
                description: "Bank-level security for your investments"
              },
              {
                icon: Zap,
                title: "Smart Alerts",
                description: "Custom notifications for price movements"
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Comprehensive charts and technical analysis"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-card p-6 rounded-lg shadow-card border border-border hover:shadow-glow transition-all duration-300"
              >
                <feature.icon className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center bg-gradient-card p-12 rounded-2xl shadow-card border border-border"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to revolutionize your trading?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of investors already using Tickr to make smarter decisions.
          </p>
          <Link to="/register">
            <Button size="lg" variant="gradient" className="text-lg px-12 py-6 shadow-glow">
              Get Started for Free
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src={logo} alt="Tickr" className="h-6 w-6" />
            <span className="text-xl font-bold text-foreground">Tickr</span>
          </div>
          <p className="text-muted-foreground">
            © 2025 Tickr. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;