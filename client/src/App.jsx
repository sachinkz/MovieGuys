import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Lazy loading the components
const Home = lazy(() => import('./pages/Home'))
const LogIn = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const CreatePost = lazy(() => import('./pages/CreatePost'))
const Profile = lazy(() => import('./pages/Profile'))
const Navbar = lazy(() => import('./components/Navbar'))
const EditPost = lazy(() => import('./pages/EditPost'))

function App() {


  const { user } = useAuth()

  let routes

  if (!user) {
    routes = <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    </>
  } else {
    routes = <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/edit-post/:postId" element={<EditPost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  }


  return (
    <>
      {routes}
    </>
  )
}

export default App