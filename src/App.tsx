import { useState, useEffect } from 'react';
import { ProtectedRoute } from './components/ProtectedRoute';
import AdminUpload from './pages/AdminUpload';
import PortfolioPage from './pages/PortfolioPage';

export function navigate(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  if (currentPath === '/admin/upload') {
    return (
      <ProtectedRoute>
        <AdminUpload />
      </ProtectedRoute>
    );
  }

  return <PortfolioPage />;
}
