import{a as h,j as e,L as b}from"./index-CrrZELZ4.js";import{a as y}from"./axios-Cm0UX6qg.js";import{u as f}from"./index.esm-B31c06Ro.js";import{Q as k,B as w}from"./ReactToastify-BexCTUx1.js";const P=()=>{var t,d,o,m;const n=f(),{register:a,handleSubmit:u,formState:s,getValues:g}=n,x=h(),p=async r=>{var i,l;try{(await y.post("https://movieguys.onrender.com/auth/register",r)).data&&x("/")}catch(c){w((l=(i=c.response)==null?void 0:i.data)==null?void 0:l.message)}};return e.jsxs("section",{className:"bg-gray-50 dark:bg-gray-900",children:[e.jsx(k,{}),e.jsx("div",{className:"flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0",children:e.jsx("div",{className:"w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700",children:e.jsxs("div",{className:"p-6 space-y-4 md:space-y-6 sm:p-8",children:[e.jsx("h1",{className:"text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white",children:"Create and account"}),e.jsxs("form",{className:"space-y-4 md:space-y-6",action:"#",onSubmit:u(p),children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Username"}),e.jsx("input",{...a("username",{required:"username is required",minLength:{value:3,message:"Minimum 3 characters required"},maxLength:{value:20,message:"Maximum 20 characters allowed"}}),type:"text",name:"username",id:"username",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"username",required:""}),e.jsxs("p",{className:"text-red-500 text-sm mt-2",children:[" ",(t=s.errors.username)==null?void 0:t.message]})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Your email"}),e.jsx("input",{...a("email",{required:"Email is required",pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:"Enter a valid email address"},maxLength:{value:60,message:"Maximum 60 characters allowed"}}),className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"name@company.com",required:""}),e.jsxs("p",{className:"text-red-500 text-sm mt-2",children:[" ",(d=s.errors.email)==null?void 0:d.message]})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"password",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Password"}),e.jsx("input",{...a("password",{required:"Password is required",validate:{hasDigit:r=>/\d/.test(r)||"Password must contain at least one digit",hasUppercase:r=>/[A-Z]/.test(r)||"Password must contain at least one uppercase letter",hasLowercase:r=>/[a-z]/.test(r)||"Password must contain at least one lowercase letter"},minLength:{value:6,message:"Password must contain at least 6 characters"}}),type:"password",name:"password",id:"password",placeholder:"••••••••",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}),e.jsxs("p",{className:"text-red-500 text-sm mt-2",children:[" ",(o=s.errors.password)==null?void 0:o.message]})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"confirm-password",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Confirm password"}),e.jsx("input",{...a("cPassword",{validate:r=>r===g("password")||"Passwords do not match"}),type:"password",placeholder:"••••••••",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",required:""}),e.jsxs("p",{className:"text-red-500 text-sm mt-2",children:[" ",(m=s.errors.cPassword)==null?void 0:m.message]})]}),e.jsx("div",{className:"flex items-start"}),e.jsx("button",{type:"submit",className:"w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",children:"Create an account"}),e.jsx(b,{to:"/",children:e.jsxs("p",{className:"text-sm font-light text-gray-500 dark:text-gray-400",children:["Already have an account? ",e.jsx("span",{className:"font-medium text-primary-600 hover:underline dark:text-primary-500",children:"Login here"})]})})]})]})})})]})};export{P as default};
