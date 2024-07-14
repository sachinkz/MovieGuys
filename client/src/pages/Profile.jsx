import React, { useEffect, useState, startTransition } from 'react';
import { ChevronDown, Edit, Trash } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const [collapsedPost, setCollapsedPost] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const { logout, user } = useAuth();

    const fetchBlogs = async () => {
        try {
            const res = await axios.get(`https://movieguys.onrender.com/user/get-posts/${user?.user._id}`, {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            });
            startTransition(() => {
                setBlogs(res.data.posts.reverse());
            });
        } catch (err) {
            console.log(err?.response?.data);
            if (err.response?.data?.redirect) {
                logout();
            }
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const deletePost = async (id) => {
        try {
            await axios.delete(`https://movieguys.onrender.com/user/delete-post/${id}`, {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            });
            fetchBlogs();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='w-full min-h-screen dark:bg-gray-900 px-12 max-md:px-3 pt-20 text-white'>
            <div className='w-full bg-gray-800 my-5 h-28 flex flex-col items-center justify-evenly'>
                <h1 className='text-3xl font-bold'>{user?.user.username}</h1>
                <p className='text-lg'><span className='text-xl font-bold mr-2'>{blogs.length}</span>Posts</p>
            </div>
            <div className='w-full flex flex-col gap-5 items-center '>
                {blogs.map((blog, i) => (
                    <div key={i} className={`relative w-full max-md:flex-col flex justify-between items-center border-2 bg-gray-800/40 border-black/30 shadow-md max-md:p-3 p-10 ${i % 2 !== 0 ? "flex-row-reverse" : "flex-row"}`}>
                        <img src={blog.image} alt="" className='h-auto w-1/3 max-md:w-full' />
                        <div className=' w-2/3 flex flex-col max-md:items-center gap-5 p-10 max-md:p-0 max-md:w-full'>
                            <ChevronDown onClick={() => setCollapsedPost(collapsedPost === i ? null : i)} className={`ml-auto max-md:bg-black/70 max-md:h-6 max-md:w-6 cursor-pointer h-10 w-10 absolute top-5 ${i % 2 === 0 ? "right-5" : "left-5"} ${collapsedPost === i && "rotate-180"}`} />
                            <h1 className='text-2xl max-md:text-lg max-md:mt-5 font-bold uppercase ' >{blog.title}</h1>
                            <p hidden={collapsedPost !== i} className='text-xl font-thin'>{blog.desc}</p>
                            <p hidden={collapsedPost !== i}>{blog.content}</p>
                            <p className='italic text-white/60'>movie : <span className='font-bold capitalize'>{blog.movie}</span></p>
                            <div className='flex gap-5 max-md:justify-evenly'>
                                <Link to={`/edit-post/${blog._id}`}>
                                    <button type="submit" className="w-fit px-10 max-md:p-3 max-md:h-fit flex items-center justify-center gap-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm  py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"><Edit /> Edit Post</button>
                                </Link>
                                <button onClick={() => deletePost(blog._id)} type="submit" className="w-fit max-md:p-3 max-md:h-fit px-10 flex items-center justify-center gap-2 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm  py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"><Trash /> Delete Post</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
