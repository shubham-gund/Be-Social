import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "../../../components/ui/aurora-background";
import XSvg from "../../../components/svgs/Logo";

import { MdOutlineMail } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash, FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Header from "../../../components/landing/Header";

interface FormData {
  email: string;
  password: string;
  fullName: string;
  username: string;
}

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const queryClient = useQueryClient();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, username, fullName, password }: FormData) => {
      try {
        const res = await fetch(
          "https://be-social-8uqb.onrender.com/api/auth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, username, fullName, password }),
            credentials: "include",
          }
        );

        const data = await res.json();
        const jwt = data.token;
        console.log(jwt);
        localStorage.setItem("token", jwt);
        if (!res.ok)
          throw new Error(
            data.error || data.message || "Failed to create account"
          );
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // page won't reload
    mutate(formData);
  };

  document.documentElement.classList.add("dark");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center overflow-hidden ">
      <AuroraBackground className="bg-transparent absolute inset-0">
        <Header />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4 z-10 pt-16"
        >
          {/* New background div with gradient and blur effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 blur-3xl opacity-50" />

          <div className="max-w-screen-xl mx-auto flex h-full w-full justify-center items-center relative">
            <div className="flex-1 hidden lg:flex items-center justify-center">
              <XSvg className="lg:w-2/3 fill-white" />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center backdrop-blur-lg bg-black bg-opacity-30 p-8 rounded-3xl shadow-2xl">
              <form
                className="lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col"
                onSubmit={handleSubmit}
              >
                <XSvg className="w-24 lg:hidden fill-white" />
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  Join today.
                </h1>
                <label className="bg-black bg-opacity-40 input input-bordered rounded-2xl flex items-center gap-2">
                  <MdOutlineMail className="text-white" />
                  <input
                    type="email"
                    className="grow text-white bg-transparent"
                    placeholder="Email"
                    name="email"
                    onChange={handleInputChange}
                    value={formData.email}
                  />
                </label>
                <div className="flex gap-4 flex-wrap">
                  <label className="bg-black bg-opacity-40 input input-bordered rounded-2xl flex items-center gap-2 flex-1">
                    <FaUser className="text-white" />
                    <input
                      type="text"
                      className="grow text-white bg-transparent"
                      placeholder="Username"
                      name="username"
                      onChange={handleInputChange}
                      value={formData.username}
                    />
                  </label>
                  <label className="bg-black bg-opacity-40 input input-bordered rounded-2xl flex items-center gap-2 flex-1">
                    <MdDriveFileRenameOutline className="text-white" />
                    <input
                      type="text"
                      className="grow text-white bg-transparent"
                      placeholder="Full Name"
                      name="fullName"
                      onChange={handleInputChange}
                      value={formData.fullName}
                    />
                  </label>
                </div>
                <label className="bg-black bg-opacity-40 input input-bordered rounded-2xl flex items-center gap-2">
                  <MdPassword className="text-white" />
                  <input
                    type={isShowPassword ? "text" : "password"}
                    className="grow text-white bg-transparent"
                    placeholder="Password"
                    name="password"
                    onChange={handleInputChange}
                    value={formData.password}
                  />
                  <div onClick={toggleShowPassword} className="cursor-pointer pl-2">
                    {isShowPassword ? (
                      <FaRegEye size={22} className="text-primary" />
                    ) : (
                      <FaRegEyeSlash size={22} className="text-primary" />
                    )}
                  </div>
                </label>
                <button className="btn rounded-full font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-white text-lg hover:opacity-90 transition-opacity">
                  {isPending ? "Loading..." : "Sign up"}
                </button>
                {isError && <p className="text-red-500">{error.message}</p>}
              </form>
              <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
                <p className="text-white text-lg">
                  Already have an account?{" "}
                  <Link to="/login">
                    <span className="text-blue-500 underline w-full hover:text-blue-400 transition-colors">
                      Login
                    </span>
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AuroraBackground>
    </div>
  );
};

export default SignUpPage;

