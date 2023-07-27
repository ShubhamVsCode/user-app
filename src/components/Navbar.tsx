import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between px-20 py-5 border-b">
        <Link href={"/"}>Admin Dashboard</Link>
        <div className="flex gap-10">
          <Link href={"/users"}>Users</Link>
          <Link href={"/users/create"}>Create User</Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
