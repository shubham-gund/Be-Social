import Post from "./Post";
import PostSkeleton from "../skeleton/PostSkeleton.js";
import { PostType } from "../../types.js";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
 
interface PostsProps {
  feedType: "posts" | "likes" | "forYou" | "following" ;
  username?: string;
  userId?: string;
}
const Posts:React.FC<PostsProps> = ({feedType,username, userId }) => {

	const getPostEndPoint = ()=>{
		switch(feedType){
			case "forYou" :
					return "https://socialmedia-backend-production-5eb9.up.railway.app//api/posts/all";
			case "following" :
					return "https://socialmedia-backend-production-5eb9.up.railway.app//api/posts/following";
			case "posts":
				return `https://socialmedia-backend-production-5eb9.up.railway.app//api/posts/user/${username}`;
			case "likes":
				return `https://socialmedia-backend-production-5eb9.up.railway.app//api/posts/like/${userId}`;
			default:
					return "https://socialmedia-backend-production-5eb9.up.railway.app//api/posts/all"
		}
	}

	const POST_ENDPOINT = getPostEndPoint();
	const {data:posts , isLoading, refetch, isRefetching}= useQuery({
		queryKey: ["posts"],
		queryFn: async ()=>{
			try {
				const res = await fetch (POST_ENDPOINT,{
					headers:{
						Authorization: `${localStorage.getItem("token")}`
					}
				});
					const data = await res.json();
					if(!res.ok){
						throw new Error(data.error||"Something went wrong");
					}
					return data;
			} catch (error:any) {
				throw new Error (error);
			}	
		} 
	})

	useEffect(()=>{
		refetch();
	},[feedType,refetch,username,])

	return (
		<>
			{(isLoading || isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && !isRefetching && posts && (
				<div>
					{posts.map((post:PostType) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};

export default Posts;
