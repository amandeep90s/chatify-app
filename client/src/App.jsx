import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Loader from '@/components/common/Loader';
import AppLayout from '@/components/layouts/AppLayout';
import AuthProvider from '@/context/AuthContext';

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const Chat = lazy(() => import('@/pages/Chat'));
const Groups = lazy(() => import('@/pages/Groups'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const user = true;

const App = () => {
  return (
    <AuthProvider user={user}>
      <BrowserRouter>
        <Suspense fallback={<Loader message="Loading Chatify..." />}>
          <Routes>
            {/* Protected Routes - Require Authentication */}
            <Route element={<ProtectedRoute user={user} />}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/chat/:chatId" element={<Chat />} />
                <Route path="/groups" element={<Groups />} />
              </Route>
            </Route>

            {/* Public Routes - Redirect if already authenticated */}
            <Route
              path="/login"
              element={
                <ProtectedRoute user={user} requireAuth={false} redirect="/">
                  <Login />
                </ProtectedRoute>
              }
            />

            {/* Catch-all route for 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
