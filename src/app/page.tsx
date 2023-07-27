"use client";

import Modal from "@/components/Modal";
import UserCard from "@/components/UserCard";
import { AXIOS_API } from "@/lib/axiosInstance";
import {
  removeCurrentUser,
  removeUser,
  setDeleteModalOpen,
  setUsers,
  usersSelector,
} from "@/store/features/userSlice";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const { users, currentUser } = useSelector(usersSelector);
  const [loading, setLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showUndoToast, setShowUndoToast] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const getUsers = async () => {
    try {
      setLoading(true);
      const { data }: { data: IUsersResponse } = await AXIOS_API.get("/users");
      toast.success(data.message);
      dispatch(setUsers(data.data));
      setLoading(false);
      return data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  const performDelete = async () => {
    try {
      const { data }: { data: { message: string } } = await AXIOS_API.delete(
        `/user/${currentUser?._id}`
      );
      // toast.success(data.message);
      setShowUndoToast(false);
      if (currentUser) {
        dispatch(removeCurrentUser());
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Unable to Create User");
      } else if (error instanceof Error) {
        toast.error(error.message || "Unable to Create User");
      }
    }
  };

  const handleDelete = () => {
    setShowUndoToast(true);
    dispatch(setDeleteModalOpen(false));
    if (currentUser) {
      dispatch(removeUser(currentUser));
    }

    console.log("Delete function started...");
    setIsDeleted(false);
    const delayTime = 3000;
    timeoutRef.current = window.setTimeout(performDelete, delayTime);
  };

  const undoDelete = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      console.log("Undo Complete");
      timeoutRef.current = null;
      console.log("Deletion undone!");
      setShowUndoToast(false);
      if (currentUser) {
        dispatch(setUsers([...users, currentUser]));
      }
    }
  };

  const handleRevertDeleteToggle = () => {
    if (!isDeleted) {
      undoDelete();
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <main className="px-5 py-2 md:px-20 md:py-10">
      <section className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-5">
        <div className="text-center rounded-lg shadow-lg w-60 h-40 space-y-3 grid place-content-center border hover:shadow-xl duration-200">
          <p className="text-5xl font-bold">{users.length}</p>
          <p className="text-xl">Total Users</p>
        </div>
        {/* TODO: show how many new users created today */}
        {/* TODO: show how many new users updated today */}
        {/* <div className="text-center rounded-lg shadow-lg w-60 h-40 space-y-3 grid place-content-center border hover:shadow-xl duration-200">
          <p className="text-5xl font-bold">{users.length}</p>
          <p className="text-xl">Total Users</p>
        </div> */}
      </section>

      <section className="my-10">
        <h1 className="text-xl mb-3">Users</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-5">
          {users.map((user: IUser) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      </section>

      <Modal handleDelete={handleDelete} />

      <div
        className={`fixed -bottom-28 duration-200 ${
          showUndoToast && "!bottom-5"
        } right-5 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg z-50`}
      >
        <div className="flex items-center justify-between">
          <span>User Deleted Successfully!</span>
          <button
            className="text-red-500 font-bold px-3 py-1 border rounded ml-3"
            onClick={handleRevertDeleteToggle}
          >
            Undo
          </button>
        </div>
      </div>
    </main>
  );
}
