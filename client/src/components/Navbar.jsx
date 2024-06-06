import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

const Navbar = () => {
  const isLoggedIn = true

  const [toggleBtn, setToggleBtn] = useState(true)
  const {logout} =useAuth()

  return (
    <div className='w-full z-50 bg-gray-700 h-16 fixed top-0 left-0 flex text-white justify-between items-center px-10'>
      <h1 className='text-2xl font-extrabold'>Movie<span className='text-orange-600'>Guys</span></h1>
      {isLoggedIn &&
        <ul className='flex gap-5 items-center '>
          <Link className='focus:underline underline-offset-8' to={"/"} >All Blogs</Link>
          <Link className='focus:underline underline-offset-8' to={"/create-post"}>Create Post</Link>
          <Link className='focus:underline underline-offset-8' to={"/profile"}>My Posts</Link>
          <Link className='focus:underline underline-offset-8' onClick={logout}>Logout</Link>
        </ul>
      }
    </div>
  )
}

export default Navbar