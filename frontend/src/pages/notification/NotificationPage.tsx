import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUser, FaHeart } from "react-icons/fa6";
import { NotificationType } from "../../types";
import { useQuery , useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const NotificationPage = () => {

  const queryClient = useQueryClient();

  const {data:notifications,isLoading} = useQuery<NotificationType[]>({
    queryKey: ["notification"],
    queryFn: async () => {
      try {
        const res = await fetch("https://socialmedia-backend-production-5eb9.up.railway.app/api/notification",{
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
        throw new Error(error)
      }
    }
  })
  const {mutate:deleteNotifications} = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("https://socialmedia-backend-production-5eb9.up.railway.app/api/notification",{
          method:"DELETE",
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
        throw new Error(error)
      }
    },
    onSuccess: () => {
      toast.success("Notifications deleted successfully");
      queryClient.invalidateQueries({queryKey:["notification"]})
    },
    onError:(error:any)=>{
      toast.error(error.message)
    }
  });

  return (
    <>
      <div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <p className="font-bold">Notifications</p>
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="m-1">
              <IoSettingsOutline className="w-4" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-red-400 border-slate-600 w-52 relative right-9 rounded-2xl font-semibold "
            >
              <li>
                <a onClick={()=>deleteNotifications()}>Delete all notifications</a>
              </li>
            </ul>
          </div>
        </div>
        {isLoading && (
          <div className="flex justify-center h-full items-center">
            <LoadingSpinner size="lg" />
          </div>
        )}
        {notifications?.length === 0 && (<div className="text-center p-4 font-bold">No notifications 🤔</div>)}
        {notifications?.map((notification) => (
          <div className="border-b border-gray-700" key={notification._id}>
            <div className="flex gap-2 p-4">
              {notification.type === "follow" && <FaUser className="w-7 h-7 text-primary" />}
              {notification.type === "like" && <FaHeart className="w-7 h-7 text-red-500" />}
              <Link to={`/profile/${notification.from.username}`}>
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img src={notification.from.profileImg || "/avatar-placeholder.png"} />
                  </div>
                </div>
                <div className="flex gap-1">
                  <span className="font-bold">@{notification.from.username}</span>{" "}
                  {notification.type === "follow" ? "followed you" : "liked your post"}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NotificationPage;
