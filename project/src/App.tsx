import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthGuard } from './components/auth/AuthGuard';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { DashboardHome } from './pages/admin/DashboardHome';
import { useAuthStore } from './store/authStore';
import { initializeAuth } from './lib/auth';

const queryClient = new QueryClient();

function App() {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = initializeAuth(setUser, setLoading);
    return () => unsubscribe();
  }, [setUser, setLoading]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected business routes */}
          <Route
            path="/admin"
            element={
              <AuthGuard allowedRoles={['admin', 'staff']}>
                <AdminDashboard />
              </AuthGuard>
            }
          >
            <Route index element={<DashboardHome />} />
            {/* Other admin routes will be added here */}
          </Route>
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </QueryClientProvider>
  );
}

export default App;