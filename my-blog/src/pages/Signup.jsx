import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const username = useRef("");
  const email = useRef("");
  const password = useRef("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const handleSubmit = async (e) => {
    //e.preventDefault();
    // if (
    //   username.current.value == "" ||
    //   email.current.value == "" ||
    //   password.current.value == ""
    // ) {
    //   return setErrorMessage("Please fill out all the details !!!");
    // }

    try {
      setIsLoading(true);
      setErrorMessage(null);
      let payload = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      const res = await fetch("http://127.0.0.1:4000/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      //console.log("res:  ",res)
      if (!res.ok) {
        if (Array.isArray(data.message)) {
          let msg = ``;
          data.message.forEach((element) => {
            msg += element.msg;
            msg += ", ";
          });
          throw new Error(msg);
        } else {
          throw new Error(data.message);
        }
      }
      setIsLoading(false);
      if(res.ok){
        navigate('/sign-in')
      }
      
    } catch (error) {
      setIsLoading(false);
      return setErrorMessage(error.message);
    }
  };

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
          <form
            className="flex max-w-md flex-col gap-4"
            // onSubmit={handleSubmit}
          >
            <div className="">
              <Label value="Username" />
              <TextInput
                type="text"
                ref={username}
                placeholder="Username"
                id="username"
              />
            </div>
            <div className="">
              <Label value="User email" />
              <TextInput
                type="email"
                ref={email}
                placeholder="Email"
                id="email"
              />
            </div>
            <div className="">
              <Label value="User password" />
              <TextInput
                type="password"
                ref={password}
                placeholder="Password"
                id="password"
              />
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading ...</span>
                </>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              {" "}
              Sign In
            </Link>
          </div>
          <div className="flex gap-2 text-sm mt-5">
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
