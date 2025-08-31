import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import Loader from '@/components/common/Loader';

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const Chat = lazy(() => import('@/pages/Chat'));
const Groups = lazy(() => import('@/pages/Groups'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader message="Loading Chatify..." />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/groups" element={<Groups />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
