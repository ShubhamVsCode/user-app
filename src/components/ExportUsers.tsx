import React from "react";
import Papa from "papaparse";
import { useSelector } from "react-redux";
import { usersSelector } from "@/store/features/userSlice";

const ExportUsers = () => {
  const { users } = useSelector(usersSelector);

  const handleExport = () => {
    const csv = Papa.unparse(users);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "data.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <button
        className="h-10 px-6 py-2 bg-gray-800 text-white shadow hover:bg-gray-800/90 rounded-md"
        onClick={handleExport}
      >
        Export to CSV
      </button>
    </div>
  );
};

export default ExportUsers;
