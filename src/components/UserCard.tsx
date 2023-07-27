import { setCurrentUser, setDeleteModalOpen } from "@/store/features/userSlice";
import { User2, Pencil, Phone, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const UserCard = ({ user }: { user: IUser; index: number }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={`relative border border-black/30 bg-slate-100 text-center h-48 grid place-content-center rounded-md space-y-3 shadow-sm hover:shadow-lg duration-200`}
    >
      <p className="text-2xl font-bold flex justify-center items-center gap-2">
        <User2 /> {user.firstName} {user.lastName}
      </p>
      <div>
        <p className="text-lg flex justify-center items-center gap-2">
          <Phone className="w-5" />
          {user.phoneNumber}
        </p>
        <p className="text-lg">Age: {user.age}</p>
      </div>

      <Link
        className="absolute gap-2 rounded-full flex border border-black/20 hover:bg-green-100 px-3 py-2 right-2 bottom-2 bg-transparent duration-200"
        href={`/users/${user._id}`}
      >
        <Pencil className="text-green-500" /> Edit
      </Link>

      <button
        className="absolute gap-2 rounded-full flex border border-black/20 hover:bg-red-100 px-3 py-2 left-2 bottom-2 bg-transparent duration-200"
        onClick={() => {
          dispatch(setCurrentUser(user));
          dispatch(setDeleteModalOpen(true));
        }}
      >
        <Trash className="text-red-500" /> Delete
      </button>
    </div>
  );
};

export default UserCard;
