"use client";

import { AXIOS_API } from "@/lib/axiosInstance";
import {
  removeCurrentUser,
  setCurrentUser,
  usersSelector,
} from "@/store/features/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { userSchema } from "@/schema/userSchema";

const UserPage = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  if (!userId)
    return (
      <div>
        <h1>User Not Found!</h1>
      </div>
    );

  const dispatch = useDispatch();
  const { currentUser } = useSelector(usersSelector);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    try {
      const { data }: { data: IUserResponse } = await AXIOS_API.get(
        `/user/${userId}`
      );
      //   toast.success(data.message);
      dispatch(setCurrentUser(data.data));
      return data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "User not found");
      } else if (error instanceof Error) {
        toast.error(error.message || "User not found");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();

    return () => {
      dispatch(removeCurrentUser());
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    if (currentUser) {
      reset(currentUser);
    }
  }, [currentUser]);

  const onSubmit = async (values: IUser) => {
    try {
      setLoading(true);
      const { data }: { data: IUserResponse } = await AXIOS_API.patch(
        `/user/${userId}`,
        values
      );
      toast.success(data.message);
      setLoading(false);
      dispatch(setCurrentUser(data.data));
      return data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "User not updated!");
      } else if (error instanceof Error) {
        toast.error(error.message || "User not updated!");
      }
      setLoading(false);
    }
  };

  return (
    <div className="my-20 border max-w-lg mx-auto px-20 py-10 rounded-md">
      <h1 className="text-3xl font-semibold text-center">Edit User</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-md space-y-3"
      >
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            {...register("firstName")}
          />
          {errors.firstName?.message && (
            <p className={`text-red-500 text-sm`}>
              {errors.firstName?.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            {...register("lastName")}
          />
          {errors.lastName?.message && (
            <p className={`text-red-500 text-sm`}>{errors.lastName?.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            type="number"
            {...register("age", {
              valueAsNumber: true,
            })}
          />
          {errors.age?.message && (
            <p className={`text-red-500 text-sm`}>{errors.age?.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            type="number"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber?.message && (
            <p className={`text-red-500 text-sm`}>
              {errors.phoneNumber?.message}
            </p>
          )}
        </div>

        <div className="">
          <button className="h-10 px-6 py-2 bg-black text-white shadow hover:bg-black/90 rounded-md w-full">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserPage;
