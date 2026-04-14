import { Routes, Route } from 'react-router';
import { LandingPage } from './pages/guest/LandingPage';
import { AdminLogin } from './admin/pages/AdminLogin';
import { AdminPanel } from './admin/pages/AdminPanel';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" expand={false} richColors />
      <Routes>
        {/* Guest Routes */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        
        {/* Catch all */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </AuthProvider>
  );
}