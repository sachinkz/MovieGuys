import React, { useState } from "react";
import { CameraOffIcon, LoaderIcon } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { useAuth } from "../context/AuthContext";

const CreatePost = () => {

    const form = useForm();
    const { register, handleSubmit, formState } = form;
    const [image, setImage] = useState(null);
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();
    const {user}=useAuth()

    const onSubmit = async (data) => {
        if(!image){
            setErrMsg("Please add an image")
            return;
        }
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "pca6lohi");
        let res;
        try {
            res = await axios.post(
                "https://api.cloudinary.com/v1_1/djyqjmd1o/image/upload/",
                formData
            );
            console.log(res.data);

        } catch (err) {
            console.log(err);
        }

        if (res.data) {

            data.image = res.data.secure_url
            try {
                const response = await axios.post(
                    "http://localhost:5000/user/create-post", data, {
                    headers: {
                        Authorization: `Bearer ${user.token} `
                    }
                })
                console.log(response.data);
                navigate("/");
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="w-full min-h-screen px-10 flex bg-gray-800 pt-24 text-white">
            {
                formState.isSubmitting &&
                <div className="absolute w-full h-screen flex justify-center items-center top-0 left-0 bg-[#00000050]">
                    <LoaderIcon className="h-28 w-28 animate-spin" />
                </div>
            }
            <div className="w-1/2 flex justify-center items-center pr-10">
                {!image ? (
                    <CameraOffIcon className="h-36 w-36 opacity-25" />
                ) : (
                    <div>
                        <img
                            src={URL.createObjectURL(image)}
                            alt=""
                            className="max-h-screen"
                        />
                    </div>
                )}
            </div>
            <form
                className=" md:space-y-6 w-1/2"
                action="#"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <label
                        htmlFor="moviename"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Movie Name
                    </label>
                    <input
                        {...register("movie", {
                            required: {
                                value: true,
                                message: "Please enter a movie name"
                            }, maxLength: {
                                value: 60,
                                message: "Must not exceed 60 characters"

                            }
                        })}
                        type="text"
                        id="movie"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Oppenheimer"
                        required=""
                    />
                    <p className="text-red-500 text-sm mt-2">{formState.errors.movie?.message}</p>
                </div>
                <div>
                    <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Title
                    </label>
                    <input
                        {...register("title", {
                            required: {
                                value: true,
                                message: "Please enter your title"
                            }, maxLength: {
                                value: 100,
                                message: "Must not exceed 100 characters"

                            }
                        })}
                        type="text"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Title of your post"
                        required=""
                    />
                    <p className="text-red-500 text-sm mt-2">{formState.errors.title?.message}</p>
                </div>
                <div>
                    <label
                        htmlFor="image"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Image
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        accept=".jpg, .png, .jpeg"
                        id="image"
                        placeholder="image-file"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                    />
                    {!image && errMsg &&<p className="text-red-500 text-sm mt-2">{errMsg}</p>}
                </div>
                <div>
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Description
                    </label>
                    <textarea
                        {...register("desc", {
                            required: {
                                value: true,
                                message: "Please enter a description"
                            }, maxLength: {
                                value: 300,
                                message: "Must not exceed 300 characters"

                            }
                        })}
                        type="text"

                        id="description"
                        placeholder="blog description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                    />
                    <p className="text-red-500 text-sm mt-2">{formState.errors.desc?.message}</p>
                </div>
                <div>
                    <label
                        htmlFor="content"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Content
                    </label>
                    <textarea
                        {...register("content", {
                            required: {
                                value: true,
                                message: "Please enter your content"
                            }, maxLength: {
                                value: 1000,
                                message: "Must not exceed 1000 characters"

                            }
                        })}
                        type="text"
                        name="content"
                        id="content"
                        placeholder="Blog Content"
                        className="bg-gray-50 border border-gray-300 h-28 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                    />
                    <p className="text-red-500 text-sm mt-2">{formState.errors.content?.message}</p>
                </div>

                <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    Create Post
                </button>
            </form>
        </div>
    );
}


export default CreatePost;
