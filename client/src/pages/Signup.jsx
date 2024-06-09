import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import { LoaderCircleIcon } from 'lucide-react';
import React, { startTransition } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {


    const form = useForm();
    const { register, handleSubmit, formState, getValues } = form;

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const res = await axios.post("https://movieguys.onrender.com/auth/register", data)
            if (res.data) {
                startTransition(() => {
                    navigate("/");
                });
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
        <section className="bg-gray-50 dark:bg-gray-900 h-screen">
            <ToastContainer />
            <div className="flex w-1/2 max-md:w-full flex-col items-center justify-center px-6 py-8 max-md:px-2 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create and account
                        </h1>
                        <form className="gap-3 flex flex-col items-center" action="#" onSubmit={handleSubmit(onSubmit)}>
                            <div className='w-full'>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <input {...register("username", {
                                    required: "username is required",
                                    minLength: {
                                        value: 3,
                                        message: "Minimum 3 characters required"
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "Maximum 20 characters allowed"
                                    }
                                })} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required="" />
                                <p className="text-red-500 text-sm mt-2"> {formState.errors.username?.message}</p>

                            </div>
                            <div className='w-full'>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Enter a valid email address"
                                    },
                                    maxLength: {
                                        value: 60,
                                        message: "Maximum 60 characters allowed"
                                    }
                                })} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                <p className="text-red-500 text-sm mt-2"> {formState.errors.email?.message}</p>

                            </div>
                            <div className='w-full'>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input {...register("password", {
                                    required: "Password is required",
                                    validate: {
                                        hasDigit: value => /\d/.test(value) || "Password must contain at least one digit",
                                        hasUppercase: value => /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                                        hasLowercase: value => /[a-z]/.test(value) || "Password must contain at least one lowercase letter",

                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Password must contain at least 6 characters",
                                    }
                                })} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <p className="text-red-500 text-sm mt-2"> {formState.errors.password?.message}</p>

                            </div>
                            <div className='w-full'>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input {...register("cPassword", {
                                    validate: value => value === getValues("password") || "Passwords do not match",
                                })} type="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                <p className="text-red-500 text-sm mt-2"> {formState.errors.cPassword?.message}</p>
                            </div>
                            <div className="flex items-start">
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center">{formState.isSubmitting ? <span className="flex items-center">Creating Account <LoaderCircleIcon className="ml-1 animate-spin w-4 h-4" /> </span> : "Create Account"}</button>
                            {formState.isSubmitting && <p className='text-xs text-orange-500 text-center'>This might take upto a minute to load. This is because the backend is in sleep due to inactivities.This will only happen for the first request</p>}
                            <Link to={"/"}>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</span>
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

export default SignUp