import { AXIOS_API } from "@/lib/axiosInstance";
import { removeCurrentUser } from "@/store/features/userSlice";
import { User2, Phone, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";

const UserCard = ({ user }: { user: IUser }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    console.log(`deleting ${user?._id}`);
    try {
      const { data }: { data: { message: string } } = await AXIOS_API.delete(
        `/user/${user?._id}`
      );
      toast.success(data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Unable to Create User");
      } else if (error instanceof Error) {
        toast.error(error.message || "Unable to Create User");
      }
    }
  };

  return (
    <div className="relative border bg-slate-100 text-center h-48 grid place-content-center rounded-md space-y-3 shadow-sm hover:shadow-lg duration-200">
      <p className="text-2xl font-bold flex justify-center items-center gap-2">
        <User2 /> {user.firstName} {user.lastName}
      </p>
      <div>
        <p className="text-lg flex justify-center items-center gap-2">
          {/* <Phone className="w-5" /> */}
          {user.phoneNumber}
        </p>
        <p className="text-lg">Age: {user.age}</p>
      </div>

      <Link
        className="absolute gap-2 rounded-full flex border border-black/20 hover:bg-green-100 px-3 py-2 right-2 bottom-2"
        href={`/users/${user._id}`}
      >
        <Pencil className="text-green-500" /> Edit
      </Link>

      <button className="absolute gap-2 rounded-full flex border border-black/20 hover:bg-red-100 px-3 py-2 left-2 bottom-2">
        <Trash className="text-red-500" onClick={handleDelete} /> Delete
      </button>
    </div>
  );
};

export default UserCard;
