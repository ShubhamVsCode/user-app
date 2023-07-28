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
import Link from "next/link";
import { Download } from "lucide-react";

const CreatePage = () => {
  const { usersFromCSV } = useSelector(usersSelector);

  return (
    <section className="px-5 md:px-20">
      <h1 className="text-3xl font-semibold text-center mt-7 mb-5">
        Create User from CSV
      </h1>
      <div className="text-center mb-5 flex justify-center items-center gap-2">
        <a
          href={"/SampleUserData.csv"}
          className="border border-black/30 rounded-md px-2 py-1 bg-transparent hover:bg-slate-200 duration-300 flex group"
        >
          <Download />
        </a>

        <Link
          href={
            "https://docs.google.com/spreadsheets/d/1g8rT2JJfECY8s2drXypp-l2BQOI-VkKVZ6xR9JXCHx8/edit?usp=sharing"
          }
          className="border border-black/30 rounded-md px-3 py-1 bg-transparent hover:bg-slate-200 duration-300"
          target="_blank"
        >
          Sample File
        </Link>
      </div>

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
