"use client";
type FileUploaderProps = {
  handleFileUpload: (fileData: any) => void;
};

const FileUploader: React.FC<FileUploaderProps> = ({ handleFileUpload }) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleFileUpload(event.target.result);
        }
      };
      reader.readAsText(file); // For CSV parsing, use readAsText. For Excel parsing, you can use readAsArrayBuffer.
      //   reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".csv"
        className="flex h-9 w-full rounded-md border border-slate-600/40 bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
};

export default FileUploader;
