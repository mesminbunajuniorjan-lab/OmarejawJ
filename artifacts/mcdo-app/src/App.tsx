import React from 'react';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AnimatePresence } from 'framer-motion';

import { AuthProvider, useAuth } from './context/AuthContext';
import { AppShell } from './components/layout/AppShell';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import MyProducts from './pages/MyProducts';
import Missions from './pages/Missions';
import Team from './pages/Team';
import Account from './pages/Account';
import History from './pages/History';
import Recharge from './pages/Recharge';
import Withdraw from './pages/Withdraw';
import Checkin from './pages/Checkin';
import About from './pages/About';
import Rules from './pages/Rules';
import Support from './pages/Support';
import BankAccounts from './pages/BankAccounts';
import AddBank from './pages/AddBank';
import RechargeHistory from './pages/RechargeHistory';
import WithdrawHistory from './pages/WithdrawHistory';

import NotFound from './pages/not-found';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  React.useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/login');
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) return null;

  return <Component />;
}

function Router() {
  const [location] = useLocation();

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <Switch location={location} key={location}>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          
          <Route path="/"><ProtectedRoute component={Home} /></Route>
          <Route path="/products"><ProtectedRoute component={Products} /></Route>
          <Route path="/my-products"><ProtectedRoute component={MyProducts} /></Route>
          <Route path="/missions"><ProtectedRoute component={Missions} /></Route>
          <Route path="/team"><ProtectedRoute component={Team} /></Route>
          <Route path="/account"><ProtectedRoute component={Account} /></Route>
          <Route path="/history"><ProtectedRoute component={History} /></Route>
          <Route path="/recharge"><ProtectedRoute component={Recharge} /></Route>
          <Route path="/withdraw"><ProtectedRoute component={Withdraw} /></Route>
          <Route path="/checkin"><ProtectedRoute component={Checkin} /></Route>
          <Route path="/about"><ProtectedRoute component={About} /></Route>
          <Route path="/rules"><ProtectedRoute component={Rules} /></Route>
          <Route path="/support"><ProtectedRoute component={Support} /></Route>
          <Route path="/bank-accounts"><ProtectedRoute component={BankAccounts} /></Route>
          <Route path="/add-bank"><ProtectedRoute component={AddBank} /></Route>
          <Route path="/recharge-history"><ProtectedRoute component={RechargeHistory} /></Route>
          <Route path="/withdraw-history"><ProtectedRoute component={WithdrawHistory} /></Route>

          <Route component={NotFound} />
        </Switch>
      </AnimatePresence>
    </AppShell>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </WouterRouter>
        <Toaster position="top-center" />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;