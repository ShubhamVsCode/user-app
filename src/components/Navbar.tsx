import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between px-5 py-2 md:px-20 md:py-4 border-b items-center">
      <Link href={"/"}>Admin Dashboard</Link>
      <div className="flex gap-10">
        {/* <Link href={"/users"}>Users</Link> */}
        <Link
          href={"/users/create"}
          className="h-10 px-6 py-2 bg-gray-800 text-white shadow hover:bg-gray-800/90 rounded-md w-full"
        >
          Create User
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
