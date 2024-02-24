import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export const Signup = () => {
  return (
    <div className="min-h-screen mt-20">
      {/**
       * left
       */}
      <div className="flex flex-col md:flex-row md:items-center gap-5 p-3 max-w-3xl mx-auto ">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Samar's
            </span>
            blog
          </Link>
          <p className="text-sm mt-5">
            This is demo blog application using reactjs and redux toolkit
          </p>
        </div>
        {/**
         * right
         */}
        <div className="flex-1">
          <form className="flex max-w-md flex-col gap-4">
            <div className="">
            <Label value="Username" />
            <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div className="">
            <Label value="User email" />
            <TextInput type="text" placeholder="Email" id="email" />
            </div>
            <div className="">
            <Label value="User password" />
            <TextInput type="password" placeholder="Password" id="password"/>
            </div>
           
            <Button gradientDuoTone='purpleToPink'  >
              Sign up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
              <span>Have an account?</span>
              <Link to="/sign-in" className="text-blue-500"> Sign In</Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};
