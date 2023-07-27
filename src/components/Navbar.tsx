import { setSearchTerm } from "@/store/features/userSlice";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import SearchUser from "./SearchUser";

const Navbar = () => {
  return (
    <nav className="flex justify-between px-5 py-2 md:px-20 md:py-4 border-b items-center">
      <Link href={"/"}>Admin Dashboard</Link>

      <div>
        <SearchUser />
      </div>

      <div className="flex gap-10">
        {/* <Link href={"/users"}>Users</Link> */}
        <Link
          href={"/users/create"}
          className="h-10 px-6 py-2 bg-gray-800 text-white shadow hover:bg-gray-800/90 rounded-md"
        >
          Create User
        </Link>
        <Link
          href={"/users/create/csv"}
          className="h-10 px-6 py-2 bg-gray-800 text-white shadow hover:bg-gray-800/90 rounded-md"
        >
          Create Multiple User
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
