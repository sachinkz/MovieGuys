import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { LoaderIcon } from 'lucide-react';

import Home from './pages/Home';
import LogIn from './pages/Login';
import Signup from './pages/Signup';
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import EditPost from './pages/EditPost';
// const Home = lazy(() => import('./pages/Home'));
// const LogIn = lazy(() => import('./pages/Login'));
// const Signup = lazy(() => import('./pages/Signup'));
// const CreatePost = lazy(() => import('./pages/CreatePost'));
// const Profile = lazy(() => import('./pages/Profile'));
// const Navbar = lazy(() => import('./components/Navbar'));
// const EditPost = lazy(() => import('./pages/EditPost'));

function App() {
  const { user } = useAuth();

  let routes;

  if (!user) {
    routes = (
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-post/:postId" element={<EditPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    );
  }

  return (
    <Suspense fallback={
      <div className='w-full h-screen flex justify-center items-center'>
        <LoaderIcon className="h-14 w-14 animate-spin text-white" />
      </div>
    }>
      {routes}
    </Suspense>
  );
}

export default App;
