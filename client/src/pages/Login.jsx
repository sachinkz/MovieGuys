import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form'
import React, { useContext, useState } from 'react'
import axios from "axios";
import { AuthContext, useAuth } from '../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from '@react-oauth/google'
import { LoaderCircleIcon } from "lucide-react";

const LogIn = () => {

    const form = useForm();
    const { register, handleSubmit, formState } = form;
    const { login } = useAuth()

    const onSubmit = async (data) => {
        try {
            const res = await axios.post("https://movieguys.onrender.com/auth/login", data)
            if (res.data) {
                login(res.data)
            }
        } catch (err) {
            toast(err.response?.data?.message)
        }
    }

    const handleGoogleLogin = async (data) => {

        try {
            const res = await axios.post("https://movieguys.onrender.com/auth/google-auth", { credential: data.credential })
            if (res.data) {
                login(res.data)
            }
        } catch (err) {
            toast(err.response?.data?.message)
        }
    }

    return (
        <section className="bg-gray-50 w-full h-screen flex items-center justify-center dark:bg-gray-900">
            <ToastContainer />
            <div className="flex w-1/2 max-md:w-full flex-col items-center justify-center px-6 max-md:px-2 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6 flex flex-col items-center w-full" action="#" onSubmit={handleSubmit(onSubmit)}>
                            <div className="w-full">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    type="text"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Please enter your email"
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: 'maximum length exceeded'
                                        }
                                    })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <p className="text-red-500 text-sm mt-2"> {formState.errors.email?.message}</p>
                            </div>
                            <div className="w-full">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "Please enter your password"
                                        }
                                    })} />
                                <p className="text-red-500 text-sm mt-2"> {formState.errors.password?.message}</p>
                            </div>

                            <button disabled={formState.isSubmitting} type="submit" className={`min-w-[50%] text-white bg-primary-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center    w-fit ${formState.isSubmitting && "bg-blue-300 cursor-not-allowed"} `}>{formState.isSubmitting ? <span className="flex items-center w-full justify-center">Loging In <LoaderCircleIcon className="ml-1 animate-spin w-4 h-4" /> </span> : "Login"}</button>
                            {formState.isSubmitting && <p className='text-xs text-orange-500 text-center w-full'>This might take upto a minute to load. This is because the backend is in sleep due to inactivities.This will only happen for the first request</p>}
                            <Link to={"/signup"}>
                                <p className="text-sm font-light text-gray-500 mt-2 dark:text-gray-400">
                                    Don’t have an account yet? <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup</span>
                                </p>
                            </Link>
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={(err) => { console.log(err) }}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LogIn