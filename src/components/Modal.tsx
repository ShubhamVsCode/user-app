import { AXIOS_API } from "@/lib/axiosInstance";
import {
  removeCurrentUser,
  removeUser,
  setDeleteModalOpen,
  usersSelector,
} from "@/store/features/userSlice";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";

const Modal = ({ handleDelete }: { handleDelete: () => void }) => {
  const dispatch = useDispatch();
  const { deleteModalOpen } = useSelector(usersSelector);

  const onClose = () => dispatch(setDeleteModalOpen(false));

  if (!deleteModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div
        className="modal-overlay backdrop-blur-sm h-screen w-screen flex items-center justify-center"
        onClick={(e) => {
          onClose();
        }}
      >
        <div
          className="modal-container bg-white border w-96 mx-auto rounded shadow-lg z-50 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content py-4 text-left px-6">
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-bold">Delete User</p>
              <button
                className="modal-close-btn cursor-pointer z-50"
                onClick={onClose}
              >
                <span className="text-3xl">×</span>
              </button>
            </div>
            <div className="mb-4">
              <p className="block text-gray-700 mb-2">
                Are you sure you want to delete?
              </p>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                className="bg-gray-800 hover:  text-white font-bold py-2 px-4 rounded"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600  text-white font-bold py-2 px-4 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
