import React, { useState } from 'react'
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useAuth } from "../context/AuthContext"
import axios from 'axios'

const Post = ({ blog, i }) => {

    const [likes, setLikes] = useState(blog.likes);
    const [disLikes, setDisLikes] = useState(blog.dislikes);
    const { user } = useAuth()

    const handleLikePost = async () => {
        const body = {
            postId: blog._id,
        }
        try {
            const res = await axios.post('https://movieguys.onrender.com/user/like-post', body, {
                headers: {
                    Authorization: `Bearer ${user?.token} `
                }
            })
            if (res.data.liked) {
                setLikes([...likes, user.user._id]);
                if (disLikes.includes(user.user._id)) {
                    setDisLikes(disLikes.filter(id => id !== user.user._id));
                }
            } else {
                setLikes(likes.filter(like => like !== user.user._id));
            }
        } catch (err) {
            console.log(err)
        }
    }
    const handleDislikePost = async () => {
        const body = {
            postId: blog._id,
        }
        try {
            const res = await axios.post('https://movieguys.onrender.com/user/dislike-post', body, {
                headers: {
                    Authorization: `Bearer ${user?.token} `
                }
            })
            console.log(res.data)

            if (res.data.disliked) {
                setDisLikes([...disLikes, user.user._id]);
                if (likes.includes(user.user._id)) {
                    setLikes(likes.filter(id => id !== user.user._id));
                }
            } else {
                setDisLikes(disLikes.filter(dislike => dislike !== user.user._id));
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={`w-full flex justify-between max-lg:flex-col max-lg:items-center  border-2 gap-10 hover:bg-gray-800/50 bg-gray-800/40 border-black/30 shadow-md p-10 max-md:p-4 ${i % 2 !== 0 ? "flex-row-reverse" : "flex-row"}`}>
            <img src={blog.image} alt="" className='h-fit w-1/3 max-lg:w-full' />
            <div className='w-2/3 flex flex-col gap-5 max-lg:w-full'>
                <h1 className='text-2xl font-bold uppercase text-orange-500' >{blog.title}</h1>
                <p className='text-xl font-thin'>{blog.desc}</p>
                <p>{blog.content}</p>
                <p className='italic text-white/60'>posted by : <span className='font-bold capitalize'>{blog.userId.username}</span></p>
                <p className='italic text-white/60'>movie : <span className='font-bold capitalize'>{blog.movie}</span></p>
                <div className='flex gap-5'>
                    <div className='flex items-center gap-2'>
                        <ThumbsUp className={` ${likes.includes(user.user._id) && "text-red-500"} cursor-pointer`} onClick={handleLikePost} />
                        <p className={`text-sm ${likes.includes(user.user._id) && "text-red-500"}`}>{likes.length}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <ThumbsDown onClick={handleDislikePost} className={` ${disLikes.includes(user.user._id) ? "text-red-500" : "text-white"} mt-2 cursor-pointer`} />
                        <p className={`text-sm ${disLikes.includes(user.user._id) ? "text-red-500" : "text-white"}`}>{disLikes.length}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post