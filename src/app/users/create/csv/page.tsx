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
import FileComponent from "@/components/FileComponent";
import CreateUserForm from "@/components/CreateUserForm";

const CreatePage = () => {
  const { usersFromCSV } = useSelector(usersSelector);

  return (
    <section className="px-5 md:px-20">
      <h1 className="text-3xl font-semibold text-center mt-7 mb-5">
        Create User from CSV
      </h1>

      <div className="max-w-lg mx-auto">
        <FileComponent />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-10 gap-y-5 mt-7">
        {usersFromCSV.map((user, i) => (
          <CreateUserForm key={i} index={i} user={user} />
        ))}
      </div>
    </section>
  );
};

export default CreatePage;
