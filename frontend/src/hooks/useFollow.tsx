import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useFollow = ()=>{

  const queryClient = useQueryClient();

  const {mutate:followUnfollow,isPending} = useMutation({
    mutationFn: async (id:string)=>{
     try {
      const res = await fetch(`https://be-social-8uqb.onrender.com/api/users/follow/${id}`,{
        method: "POST",
        credentials: 'include',
      })
      const data = await res.json();
      if(!res.ok){
          throw new Error(data.message || data.error || "SOmething went wrong");
      }
      return data;
     } catch (error:any) {
      throw new Error(error)
     }
    },
    onSuccess: ()=>{
      Promise.all([
        queryClient.invalidateQueries({queryKey:['suggestedUsers']}),
        queryClient.invalidateQueries({queryKey:['authUser']})
      ])
    },
    onError:(error)=>{
      toast.error(error.message)
    }
  })
  return {followUnfollow,isPending}
}

export default useFollow;