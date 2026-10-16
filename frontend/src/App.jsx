import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AuthModal from './components/AuthModal.jsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('applio_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        localStorage.removeItem('applio_user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('applio_token');
    localStorage.removeItem('applio_user');
    setUser(null);
    setCurrentPage('landing');
  };

  const handleGoToDashboard = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setCurrentPage('dashboard');
  };

  const handleAuthSuccess = (newUser) => {
    setUser(newUser);
    setCurrentPage('dashboard');
  };

  return (
    <>
      {currentPage === 'landing' || !user ? (
        <LandingPage
          onGoToDashboard={handleGoToDashboard}
          user={user}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
        />
      ) : (
        <Dashboard
          user={user}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
          onGoHome={() => setCurrentPage('landing')}
        />
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}
