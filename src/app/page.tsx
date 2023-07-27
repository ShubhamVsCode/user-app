"use client";

import UserCard from "@/components/UserCard";
import { AXIOS_API } from "@/lib/axiosInstance";
import { setUsers, usersSelector } from "@/store/features/userSlice";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const { users } = useSelector(usersSelector);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="px-20 py-10">
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
    </main>
  );
}
