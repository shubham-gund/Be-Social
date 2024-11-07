import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FormData } from "../pages/profile/EditProfileModal";

interface UpdateProfileArgs {
	formData?: FormData;
	coverImg?: string | ArrayBuffer | null;
	profileImg?: string | ArrayBuffer | null;
}

const useUpdateUserProfile = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: updateProfile, isPending: isUpdating } = useMutation<any, Error, UpdateProfileArgs, void>({
		mutationFn: async ({formData , coverImg, profileImg}:UpdateProfileArgs) => {
			try {
				const res = await fetch(`https://socialmedia-backend-production-5eb9.up.railway.app/api/users/update`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `${localStorage.getItem("token")}` ,
					},
					body: formData ? JSON.stringify(formData) : JSON.stringify({ coverImg, profileImg }) ,
					credentials: 'include',
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data;
			} catch (error:any) {
				throw new Error(error.message);
			}
		},
		onSuccess: () => {
			toast.success("Profile updated successfully");
			Promise.all([
				queryClient.invalidateQueries({ queryKey: ["authUser"] }),
				queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
			]);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { updateProfile, isUpdating };
};

export default useUpdateUserProfile;