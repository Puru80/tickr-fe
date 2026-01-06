import { motion } from 'framer-motion';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { User, Bell, Shield, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your account and preferences.
            </p>
          </div>

          <div className="space-y-6">
            {/* Profile Section */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium text-foreground">Profile</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Display Name</p>
                    <p className="text-sm text-muted-foreground">Arjun Sharma</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">arjun@tickr.io</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium text-foreground">Notifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="price-alerts" className="text-sm font-medium">
                      Price Alerts
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Get notified when prices hit your targets
                    </p>
                  </div>
                  <Switch id="price-alerts" defaultChecked />
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="market-news" className="text-sm font-medium">
                      Market News
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Daily market summary and updates
                    </p>
                  </div>
                  <Switch id="market-news" />
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium text-foreground">Security</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Password</p>
                    <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="2fa" className="text-sm font-medium">
                      Two-Factor Authentication
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Switch id="2fa" />
                </div>
              </div>
            </div>

            {/* Appearance Section */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium text-foreground">Appearance</h2>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Theme</p>
                  <p className="text-sm text-muted-foreground">Dark mode is currently active</p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Dark
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
