import { useState, useEffect, lazy, Suspense } from 'react';
import { ProtectedRoute } from './components/ProtectedRoute';
import PortfolioPage from './pages/PortfolioPage';

const AdminUpload = lazy(() => import('./pages/AdminUpload'));

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
        <Suspense fallback={<div>Loading...</div>}>
          <AdminUpload />
        </Suspense>
      </ProtectedRoute>
    );
  }

  return <PortfolioPage />;
}