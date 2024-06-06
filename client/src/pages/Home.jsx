import React, { useEffect, useState,useContext } from 'react';
import Post from '../components/Post';
import axios from 'axios';
import { useAuth } from "../context/AuthContext"
import { LoaderIcon } from 'lucide-react';

const Home = () => {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState();

  const { logout, user } = useAuth()

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const res = await axios.get("https://movieguys.onrender.com/user/get-posts", {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      setBlogs(res.data.posts.reverse())
      setLoading(false)
    } catch (err) {
      if (err.response?.data?.redirect) {
        setLoading(false)
        logout()
      }
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])



  return (
    <div className='w-full min-h-screen dark:bg-gray-900 px-12 max-md:px-4 pt-20 text-white'>
      {loading && (
        <div className="absolute w-full h-screen flex justify-center items-center top-0 left-0 bg-[#00000050]">
          <LoaderIcon className="h-28 w-28 animate-spin" />
        </div>
      )}
      <div className='w-full flex flex-col  justify-center gap-5 items-center '>
        {blogs.map((blog, i) => (
          <Post key={i}  blog={blog} i={i} />
        ))}
        {blogs.length===0&& !loading &&(
          <p className='text-white/70 mt-36'>No Blogs. Create One</p>
        )}
      </div>
    </div>
  )
}

export default Home