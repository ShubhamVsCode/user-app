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
import { userSchema } from "@/schema/userSchema";

const CreatePage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(usersSelector);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (values: IUser) => {
    try {
      const { data }: { data: IUserResponse } = await AXIOS_API.post(
        `/user/create`,
        values
      );
      toast.success(data.message);
      dispatch(setCurrentUser(data.data));

      // Removing Focus When We Submit the Data while we are on PhoneNumber field
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      reset();
      return data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Unable to Create User");
      } else if (error instanceof Error) {
        toast.error(error.message || "Unable to Create User");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(removeCurrentUser());
    };
  }, []);

  return (
    <div className="my-20 border max-w-lg mx-auto px-20 py-10 rounded-md shadow-xl">
      <h1 className="text-3xl font-semibold text-center mb-5">Create User</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-md space-y-3"
      >
        <div>
          <label htmlFor="firstName">
            First Name
            <span className="text-red-400">*</span>
          </label>
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
          <label htmlFor="lastName">
            Last Name
            <span className="text-red-400">*</span>
          </label>
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
          <label htmlFor="age">
            Age
            <span className="text-red-400">*</span>
          </label>
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
          <label htmlFor="phoneNumber">
            Phone Number
            <span className="text-red-400">*</span>
          </label>
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
          <button className="h-10 px-6 py-2 bg-gray-800 text-white shadow hover:bg-gray-800/90 rounded-md w-full">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
