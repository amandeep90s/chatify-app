import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import Loader from '@/components/common/Loader';

import ProtectedRoute from './components/auth/ProtectedRoute';

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const Chat = lazy(() => import('@/pages/Chat'));
const Groups = lazy(() => import('@/pages/Groups'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const user = false;

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader message="Loading Chatify..." />}>
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <Login />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
