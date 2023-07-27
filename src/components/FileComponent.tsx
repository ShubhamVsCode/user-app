"use client";

import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import Papa from "papaparse";
import readXlsxFile from "read-excel-file";
import { useDispatch } from "react-redux";
import { setUsersFromCSV } from "@/store/features/userSlice";

const FileComponent: React.FC = () => {
  const dispatch = useDispatch();
  const [parsedData, setParsedData] = useState<any[]>([]);

  const handleFileUpload = (fileData: any) => {
    const { data } = Papa.parse<IUser>(fileData, { header: true });
    setParsedData(data);
    dispatch(setUsersFromCSV(data));

    // readXlsxFile(fileData).then((rows) => setParsedData(rows));
  };

  return (
    <div>
      <FileUploader handleFileUpload={handleFileUpload} />
      {/* <pre>{JSON.stringify(parsedData, null, 2)}</pre> */}
    </div>
  );
};

export default FileComponent;
