"use client";
import { setSearchTerm } from "@/store/features/userSlice";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";

const SearchUser = () => {
  const dispatch = useDispatch();
  const path = usePathname();

  if (path !== "/") return;

  return (
    <input
      type="search"
      name="search"
      id="search"
      className="flex h-9 w-full rounded-md border border-slate-400/50 bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
      placeholder="Search User"
      aria-label="Search User"
      aria-describedby="search-addon"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(e.target.value));
      }}
    />
  );
};

export default SearchUser;
