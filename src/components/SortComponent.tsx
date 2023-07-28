"use client";

import { setSortOption, usersSelector } from "@/store/features/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SortComponent = () => {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOption(e.target.value));
  };

  return (
    <div>
      <label htmlFor="sorting">Sort By</label>
      <select
        name="sorting"
        id="sorting"
        className="border"
        onChange={handleChange}
      >
        <option value="none">None</option>
        <option value="nameAsc">Name Asc</option>
        <option value="nameDesc">Name Desc</option>
        <option value="ageAsc">Age Asc</option>
        <option value="ageDesc">Age Desc</option>
        <option value="createdAtAsc">CreatedAt Asc</option>
        <option value="createdAtDesc">CreatedAt Desc</option>
      </select>
    </div>
  );
};

export default SortComponent;
