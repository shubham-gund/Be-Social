import { FaRegComment, FaRegHeart, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CommentType, PostType, UserType } from "../../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import { formatPostDate } from "../../utils/date";

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  const queryClient = useQueryClient()
  const [comment, setComment] = useState<string>("");
  const {data:authUser} = useQuery<UserType>({queryKey:["authUser"]});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const postOwner = post.user;
  const isLiked = authUser ? post.likes.includes(authUser._id) : false;
  const isMyPost = authUser?._id === post.user._id;

  const {mutate:deletePost, isPending:isDeleting} = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`https://socialmedia-backend-production-5eb9.up.railway.app/api/posts/${post._id}`,{
          method: "DELETE",
          credentials: 'include',
          headers:{
            Authorization: `${localStorage.getItem("token")}` ,
          }
        })
        const data = await res.json();
        if(!res.ok){
          throw new Error(data.message || data.error || "Something went wrong");
        }
        return data;
      } catch (error:any) {
        throw new Error (error)
      }
    },
    onSuccess:()=>{
      toast.success("Post deleted successfully");
      //invalidate query
      queryClient.invalidateQueries({queryKey:["posts"]})
    }
  })
  const {mutate:likePost, isPending:isLiking} = useMutation({
    mutationFn:async()=>{
      try {
        const res = await fetch(`https://socialmedia-backend-production-5eb9.up.railway.app/api/posts/like/${post._id}`,{
          method:"POST",
          credentials: 'include',
          headers:{
            Authorization: `${localStorage.getItem("token")}` ,
          }
        });
        const data = await res.json();
        if(!res.ok){
          throw new Error(data.message || data.error || "Something went wrong");
        }
        return data;
      } catch (error:any) {
          throw new Error (error)
      }
    },
    onSuccess:(updatedLikes)=>{
      queryClient.setQueryData(["posts"],(oldData: PostType[])=>{
        return oldData.map((p)=>{
          if(p._id === post._id){
            return {...p,likes:updatedLikes}
          }
          return p;
        })
      })
    },

    onError:(error:any)=>{
      toast.error(error.message);
    }
  })

  const {mutate:commentPost ,isPending:isCommenting} = useMutation({
    mutationFn:async()=>{
      try {
        const res = await fetch(`https://socialmedia-backend-production-5eb9.up.railway.app/api/posts/comment/${post._id}`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            Authorization: `${localStorage.getItem("token")}` ,
          },
          body:JSON.stringify({text:comment}),
          credentials: 'include',
        })
        const data = await res.json();
        if(!res.ok){
          throw new Error(data.message || data.error || "Something went wrong");
        }
        return data;
      } catch (error:any) {
          throw new Error (error)
      }
    },
    onSuccess:()=>{
      toast.success("Comment posted successfully!");
      queryClient.invalidateQueries({queryKey:["posts"]})
    }
  })

  const handleDeletePost = () => {
    deletePost();
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if(isCommenting) return;
    commentPost();
  };

  const handleLikePost = () => {
    if(isLiking) return;
    likePost();

  };

  return (
    <>
      <div className="flex gap-2 items-start p-4 border-b border-gray-700">
        <div className="avatar">
          <Link to={`/profile/${postOwner.username}`} className="w-8 rounded-full overflow-hidden">
            <img src={postOwner.profileImg || "/avatar-placeholder.png"} alt="Profile" />
          </Link>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-2 items-center">
            <span className="text-gray-500  flex gap-1 text-sm">
              <Link to={`/profile/${postOwner.username}`}>@{postOwner.username}</Link>
              <span>·</span>
              <span className="text-gray-500">{formatPostDate(post.createdAt)}</span>
            </span>
            {isMyPost && (
              <span className="flex justify-end flex-1">
                {!isDeleting && <FaTrash className="cursor-pointer hover:text-red-500" onClick={handleDeletePost} />}

                {isDeleting && (
                  <LoadingSpinner size='sm'/> 
                
                )}

              </span>
            )}
          </div>
          <div className="flex flex-col gap-3 overflow-hidden">
            <span>{post.text}</span>
            {post.img && (
              <img
                src={post.img}
                className="h-80 object-contain rounded-lg border border-gray-700"
                alt="Post"
              />
            )}
          </div>
          <div className="flex justify-start mt-3 ">
            <div className="flex gap-4 items-center w-2/3 pr-5">
            <div className="flex gap-1 items-center group cursor-pointer sm:pr-5" onClick={handleLikePost}>
                {isLiking && <LoadingSpinner size='sm' />}
								{!isLiked && !isLiking && (
									<FaRegHeart className='w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500' />
								)}
								{isLiked && !isLiking && (
									<FaRegHeart className='w-4 h-4 cursor-pointer text-pink-500 ' />
								)}
                <span
                  className={`text-sm text-slate-500 group-hover:text-pink-500 ${
                    isLiked ? "text-pink-500" : ""
                  }`}
                >
                  {post.likes.length}
                </span>
              </div>
              
              <div
                className="flex gap-1 items-center cursor-pointer group"
                onClick={() => setIsModalOpen(true)}
              >
                <FaRegComment className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
                <span className="text-sm text-slate-500 group-hover:text-sky-400">
                  {post.comments.length}
                </span>
              </div>
              {isModalOpen && (
                <dialog open className="modal border-none outline-none">
                  <div className="modal-box rounded border border-gray-600">
                    <h3 className="font-bold text-lg mb-4">COMMENTS</h3>
                    <div className="flex flex-col gap-3 max-h-60 overflow-auto">
                      {post.comments.length === 0 && (
                        <p className="text-sm text-slate-500">
                          No comments yet 🤔 Be the first one 😉
                        </p>
                      )}
                      {post.comments.map((comment: CommentType) => (
                        <div key={comment._id} className="flex gap-2 items-start">
                          <div className="avatar">
                            <div className="w-8 rounded-full">
                              <img
                                src={comment.user.profileImg || "/avatar-placeholder.png"}
                                alt="Commenter"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500 text-sm">
                                @{comment.user.username}
                              </span>
                            </div>
                            <div className="text-sm">{comment.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <form
                      className="flex gap-2 items-center mt-4 border-t border-gray-600 pt-2"
                      onSubmit={handlePostComment}
                    >
                      <textarea
                        className="textarea w-full p-1 rounded text-md resize-none border focus:outline-none border-gray-800"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button className="btn btn-primary rounded-full btn-sm text-white px-4">
                        {isCommenting ? (
                          <LoadingSpinner size='md'/>
                        ) : (
                          "Post"
                        )}
                      </button>
                    </form>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="outline-none"
                    >
                      close
                    </button>
                  </form>
                </dialog>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
