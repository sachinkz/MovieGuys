import{r as p,A as h,j as e,a as b,G as f}from"./index-DUBQGg9L.js";import{u as k}from"./index.esm-D_EkCCYt.js";import{a as n}from"./axios-Cm0UX6qg.js";import{Q as j,B as c}from"./ReactToastify-pwKTp_f9.js";const F=()=>{var m,l;const g=k(),{register:i,handleSubmit:x,formState:o}=g,{login:d}=p.useContext(h),u=async a=>{var s,t;try{const r=await n.post("https://movieguys.onrender.com/auth/login",a);r.data&&d(r.data)}catch(r){c((t=(s=r.response)==null?void 0:s.data)==null?void 0:t.message)}},y=async a=>{var s,t;try{const r=await n.post("https://movieguys.onrender.com/auth/google-auth",{credential:a.credential});r.data&&d(r.data)}catch(r){c((t=(s=r.response)==null?void 0:s.data)==null?void 0:t.message)}};return e.jsxs("section",{className:"bg-gray-50 w-full h-screen flex items-center justify-center dark:bg-gray-900",children:[e.jsx(j,{}),e.jsx("div",{className:"flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0",children:e.jsx("div",{className:"w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700",children:e.jsxs("div",{className:"p-6 space-y-4 md:space-y-6 sm:p-8",children:[e.jsx("h1",{className:"text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white",children:"Sign in to your account"}),e.jsxs("form",{className:"space-y-4 md:space-y-6 flex flex-col items-center w-full",action:"#",onSubmit:x(u),children:[e.jsxs("div",{className:"w-full",children:[e.jsx("label",{htmlFor:"email",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Your email"}),e.jsx("input",{type:"text",...i("email",{required:{value:!0,message:"Please enter your email"},maxLength:{value:60,message:"maximum length exceeded"}}),className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}),e.jsxs("p",{className:"text-red-500 text-sm mt-2",children:[" ",(m=o.errors.email)==null?void 0:m.message]})]}),e.jsxs("div",{className:"w-full",children:[e.jsx("label",{htmlFor:"password",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Password"}),e.jsx("input",{type:"password",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",...i("password",{required:{value:!0,message:"Please enter your password"}})}),e.jsxs("p",{className:"text-red-500 text-sm mt-2",children:[" ",(l=o.errors.password)==null?void 0:l.message]})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-start",children:[e.jsx("div",{className:"flex items-center h-5",children:e.jsx("input",{id:"remember","aria-describedby":"remember",type:"checkbox",className:"w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800",required:""})}),e.jsx("div",{className:"ml-3 text-sm",children:e.jsx("label",{htmlFor:"remember",className:"text-gray-500 dark:text-gray-300",children:"Remember me"})})]}),e.jsx("a",{href:"#",className:"text-sm font-medium text-primary-600 hover:underline dark:text-primary-500",children:"Forgot password?"})]}),e.jsx("button",{disabled:o.isSubmitting,type:"submit",className:"w-[50%] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",children:"Sign in"}),e.jsx(b,{to:"/signup",children:e.jsxs("p",{className:"text-sm font-light text-gray-500 mt-2 dark:text-gray-400",children:["Don’t have an account yet? ",e.jsx("span",{className:"font-medium text-primary-600 hover:underline dark:text-primary-500",children:"Sign up"})]})}),e.jsx(f,{onSuccess:y,onError:a=>{console.log(a)}})]})]})})})]})};export{F as default};