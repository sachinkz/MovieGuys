import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { MenuIcon } from 'lucide-react'

const Navbar = () => {

  const { logout } = useAuth()

  return (
    <div className='w-full z-50 bg-gray-700 h-16 fixed top-0 left-0 flex text-white justify-between items-center px-10'>
      <h1 className='text-2xl font-extrabold'>Movie<span className='text-orange-600'>Guys</span></h1>
      <ul className='flex gap-5 items-center max-md:hidden'>
        <Link className='focus:underline underline-offset-8' to={"/"} >All Blogs</Link>
        <Link className='focus:underline underline-offset-8' to={"/create-post"}>Create Post</Link>
        <Link className='focus:underline underline-offset-8' to={"/profile"}>My Posts</Link>
        <Link className='focus:underline underline-offset-8' onClick={logout}>Logout</Link>
      </ul>
      <div className='md:hidden'>
          <MenuIcon/>
      </div>
    </div>
  )
}

export default Navbar