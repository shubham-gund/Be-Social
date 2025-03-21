import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuroraBackground } from "../../../components/ui/aurora-background";
import XSvg from "../../../components/svgs/Logo";
import { MdOutlineMail, MdPassword } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Header from "../../../components/landing/Header";

interface FormData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async ({ username, password }: FormData) => {
      const res = await fetch("https://be-social-8uqb.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || "Something went wrong");
      }
      const jwt = data.token;
      localStorage.setItem("token", jwt);
      return data;
    },
    onSuccess: () => {
      toast.success("Login Successful");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  document.documentElement.classList.add("dark"); // login page by default dark theme

  return (
    <div className="text-white min-h-screen flex items-center justify-center overflow-hidden">
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
          className="relative flex flex-col gap-4 items-center justify-center px-4 z-10"
        >
          {/* New background div with gradient and blur effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 blur-3xl opacity-50" />

          <div className="max-w-screen-xl mx-auto flex h-full w-full justify-center items-center relative">
            <div className="flex-1 hidden lg:flex items-center justify-center px-16">
              <XSvg fill="#FFFFFF" className="lg:w-80" />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center backdrop-blur-lg bg-black bg-opacity-30 p-8 rounded-3xl shadow-2xl">
              <form
                className="lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col"
                onSubmit={handleSubmit}
              >
                <XSvg fill="#FFFFFF" className="w-24 lg:hidden" />
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 p-1">{"Let's"} go.</h1>
                <label className="input input-bordered rounded-2xl bg-black bg-opacity-60 flex items-center gap-2">
                  <MdOutlineMail className="text-white" />
                  <input
                    type="text"
                    className="grow bg-transparent text-white placeholder-white"
                    placeholder="Username"
                    name="username"
                    onChange={handleInputChange}
                    value={formData.username}
                  />
                </label>

                <label className="input input-bordered rounded-2xl bg-black bg-opacity-60 flex items-center gap-2">
                  <MdPassword className="text-white" />
                  <input
                    type={isShowPassword ? "text" : "password"}
                    className="grow bg-transparent text-white placeholder-white"
                    placeholder="Password"
                    name="password"
                    onChange={handleInputChange}
                    value={formData.password}
                  />
                  <div
                    onClick={toggleShowPassword}
                    className="cursor-pointer pl-2 text-white"
                  >
                    {isShowPassword ? (
                      <FaRegEye size={22} className="text-primary" />
                    ) : (
                      <FaRegEyeSlash size={22} className="text-primary" />
                    )}
                  </div>
                </label>
                <button className="btn rounded-full font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-lg hover:opacity-90 transition-opacity">
                  {isPending ? "Loading..." : "Login"}
                </button>
                {isError && <p className="text-red-500">{error.message}</p>}
              </form>
              <div className="flex flex-col gap-2 mt-4">
                <p className="text-white text-lg">
                  {"Don't"} have an account?{" "}
                  <Link to="/signup">
                    <span className="text-blue-500 underline hover:text-blue-400 transition-colors">Sign-Up</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AuroraBackground>
    </div>
  );
};

export default LoginPage;

