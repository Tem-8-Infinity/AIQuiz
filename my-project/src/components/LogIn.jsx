import React, { useState } from 'react';
import { useFormik } from 'formik';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";
import useUserStore from "../context/store";
import { toast } from "react-toastify";
import { isUserBlocked } from "../services/user.services";
import { loginSchema } from '../schemas';

const LogIn = () => {
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        if (await isUserBlocked(values.email)) {
          toast.error("Account is blocked");
          return;
        }
        await signInWithEmailAndPassword(auth, values.email, values.password);
        toast.success("Logged in Successfully");
        navigate("/");
      } catch (error) {
        setLoginError("Failed to login. Please check your credentials.");
      }
    },
  });

  return (
    <div className="hero min-h-screen bg-gray-300">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Welcome back, Quiz Master!</h1>
          <p className="py-6">
            Enter your details to dive into a sea of intriguing quizzes and
            challenges.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={formik.handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500">{formik.errors.email}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500">{formik.errors.password}</p>
              )}
            </div>
            {loginError && <p className="text-red-500">{loginError}</p>}
            <div className="form-control mt-6">
              <button
                className="btn btn-primary bg-blue-400"
                style={{ border: "none", padding: "3%" }}
                type="submit"
              >
                Login
              </button>
            </div>
            <div className="flex justify-end">
              <a className="btn btn-link " href="./SignUp">
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
