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
import dayjs from "dayjs";
import SortComponent from "@/components/SortComponent";
import ExportUsers from "@/components/ExportUsers";

export default function Home() {
  const dispatch = useDispatch();
  const { users, currentUser, filteredUsers, searchTerm, sortOption } =
    useSelector(usersSelector);
  const [loading, setLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showUndoToast, setShowUndoToast] = useState(false);
  const timeoutRef = useRef<number | null>(null);

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

    setIsDeleted(false);
    const delayTime = 3000;
    timeoutRef.current = window.setTimeout(performDelete, delayTime);
  };

  const undoDelete = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
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
    setLoading(true);
    const getUsers = async () => {
      try {
        const { data }: { data: IUsersResponse } = await AXIOS_API.get(
          "/users"
        );
        // toast.success(data.message);
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
    getUsers();
  }, [dispatch]);

  return (
    <main className="px-5 py-2 md:px-20 md:py-10">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-5">
        <div className="text-center mx-auto rounded-lg shadow-lg w-60 h-40 space-y-3 grid place-content-center border border-black/20 hover:shadow-xl duration-200">
          <p className="text-5xl font-bold">{users.length}</p>
          <p className="text-xl">Total Users</p>
        </div>

        <div className="text-center mx-auto rounded-lg shadow-lg w-60 h-40 space-y-3 grid place-content-center border hover:shadow-xl duration-200 border-black/20">
          <p className="text-5xl font-bold">
            {
              users.filter((user, i) => {
                return dayjs(user.createdAt).isSame(dayjs(), "day");
              })?.length
            }
          </p>
          <p className="text-xl">Users Created Today</p>
        </div>
      </section>

      <section className="my-10">
        <div className="flex justify-between items-center my-3">
          <h1 className="text-xl">Users</h1>
          <div className="flex gap-5 items-center">
            <SortComponent />
            <ExportUsers />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-5">
          {loading &&
            users.length === 0 &&
            new Array(4)
              .fill("-")
              .map((_, i) => (
                <div
                  key={i}
                  className="border border-black/30 bg-slate-200 text-center h-48 w-full grid place-content-center rounded-md space-y-3 shadow-sm hover:shadow-lg duration-200 animate-pulse"
                ></div>
              ))}

          {searchTerm || sortOption !== "none" ? (
            filteredUsers.length > 0 ? (
              filteredUsers.map((user: IUser, i) => (
                <UserCard key={user._id} user={user} index={i} />
              ))
            ) : (
              <>{searchTerm && <h1 className="text-2xl">No Users Found!</h1>}</>
            )
          ) : (
            users.map((user: IUser, i) => (
              <UserCard key={user._id} user={user} index={i} />
            ))
          )}
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
