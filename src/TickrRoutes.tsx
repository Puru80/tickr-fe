import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import Screeners from "./pages/Screeners";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

/**
 * Tickr Dashboard Routes
 *
 * Usage in your existing app:
 *
 * import { TickrRoutes } from "./TickrRoutes";
 *
 * // In your router configuration:
 * <Route path="/dashboard/*" element={<TickrRoutes />} />
 *
 * This will mount all Tickr routes under /dashboard:
 * - /dashboard → Main watchlist dashboard
 * - /dashboard/alerts → Alerts page
 * - /dashboard/screeners → Screeners page
 * - /dashboard/settings → Settings page
 */
export function TickrRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/screeners" element={<Screeners />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default TickrRoutes;
