import { Router } from './components/Router';
import { ProtectedRoute } from './components/ProtectedRoute';
import App from './App';
import AdminUpload from './pages/AdminUpload';

export default function AppWithRouter() {
  return (
    <Router>
      {[
        {
          path: '/',
          element: <App />,
        },
        {
          path: '/admin/upload',
          element: (
            <ProtectedRoute>
              <AdminUpload />
            </ProtectedRoute>
          ),
        },
      ]}
    </Router>
  );
}
