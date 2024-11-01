import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuroraBackground } from "../../../components/ui/aurora-background" ;
import XSvg from "../../../components/svgs/Logo";

import { MdOutlineMail, MdPassword } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface FormData{
	username: string;
	password: string;
}

const LoginPage = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

	const queryClient = useQueryClient();
	const {mutate, isPending ,isError, error} = useMutation({
		mutationFn:async({username,password}:FormData)=>{
			try {
				const res = await fetch("https://socialmedia-backend-production-5eb9.up.railway.app/api/auth/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						},
						body: JSON.stringify({username,password}),
						credentials: 'include',
				});
				const data = await res.json();
				const jwt = data.token;
				console.log(jwt)
				localStorage.setItem("token", jwt);
				if(!res.ok) {
					throw new Error(data.error || data.message || "Something went wrong")
				}
			} catch (error:any) {
				throw new Error(error.message)
			}
		},
		onSuccess:()=>{
			toast.success("Login Successful")
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		}
	})

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutate(formData)
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
				<div className='max-w-screen-xl mx-auto flex h-screen text-white'>
					<div className='flex-1 hidden lg:flex items-center justify-center px-16'>
						<XSvg className='lg:w-80 fill-white' />
					</div>
					<div className='flex-1 flex flex-col justify-center items-center'>
						<form className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col' onSubmit={handleSubmit}>
							<XSvg className='w-24 lg:hidden fill-white' />
							<h1 className='text-4xl font-extrabold text-white'>{"Let's"} go.</h1>
							<label className='input input-bordered rounded-2xl bg-black bg-opacity-40 flex items-center gap-2'>
								<MdOutlineMail  className="text-white"/>
								<input
									type='text'
									className='grow'
									placeholder='Username'
									name='username'
									onChange={handleInputChange}
									value={formData.username}
								/>
							</label>

							<label className='input input-bordered rounded-2xl bg-black bg-opacity-40 flex items-center gap-2'>
								<MdPassword className="text-white" />
								<input
									type={isShowPassword ? "text" : "password"}
									className='grow '
									placeholder='Password'
									name='password'
									onChange={handleInputChange}
									value={formData.password}
								/>
								<div onClick={toggleShowPassword} className="cursor-pointer pl-2">
										{isShowPassword ? <FaRegEye size={22} className="text-primary" /> : <FaRegEyeSlash size={22} className="text-primary" />}
								</div>
							</label>
							<button className='btn rounded-full btn-primary text-white text-lg'>{isPending ? "Loading..." : "Login"}</button>
							{isError && <p className='text-red-500'>{error.message}</p>}
						</form>
						<div className='flex flex-col gap-2 mt-4'>
							<p className='text-white text-lg'>{"Don't"} have an account? <Link to='/signup'>
								<span className="text-blue-500 underline">Sign-Up</span>
							</Link></p>
							
						</div>
					</div>
				</div>
			</motion.div>
    </AuroraBackground>
	);
};
export default LoginPage;
