import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form'
import React, { useContext } from 'react'
import axios from "axios";
import { AuthContext, useAuth } from '../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from '@react-oauth/google'

const LogIn = () => {

    const form = useForm();
    const { register, handleSubmit, formState } = form;
    // const { login } = useAuth()
    const { login } = useContext(AuthContext)

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
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
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
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button disabled={formState.isSubmitting} type="submit" className="w-[50%] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <Link to={"/signup"}>
                                <p className="text-sm font-light text-gray-500 mt-2 dark:text-gray-400">
                                    Don’t have an account yet? <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</span>
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