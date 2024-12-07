import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Axios } from "../../config";
import upload from "../../libs/upload";
import { BsUpload } from "react-icons/bs";
import CustomizeInput from "../../utils/Input/CustomizeInput";
import loader from "../../assets/icons/loader.svg";
import { useParams, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores";
const TaskDetail = ({ task, submittedTask, refetchSubmittedTask }) => {
  const { authUser } = useAuthStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const [desc, setdesc] = useState(submittedTask?.desc || "");
  const [files, setFiles] = useState(submittedTask?.files || []);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(task.status || "To Do");

  useEffect(() => {
    if (submittedTask?.files) {
      setFiles(submittedTask.files);
    }else {
      setFiles([]);
    }
    if (submittedTask?.desc) {
      setdesc(submittedTask.desc);
    }else{
      setdesc('');
    }
    if (task.status) {
      setStatus(task.status);
    }
  }, [submittedTask?.files, submittedTask?.desc, task.status]);

  const renderFilePreview = (fileUrl) => {
    const extension = fileUrl.split(".").pop();
    if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
      return (
        <img
          src={fileUrl}
          alt="File Preview"
          className="h-52 w-full object-cover rounded-md"
        />
      );
    }
    const fileIcons = {
      pdf: "📄",
      doc: "📄",
      docx: "📄",
      default: "📎",
    };
    return (
      <div className="flex items-center justify-center h-20 bg-white rounded-md text-2xl">
        {fileIcons[extension] || fileIcons.default}
      </div>
    );
  };

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.currentTarget.files);
    const validFiles = selectedFiles.filter((file) => file.type.startsWith("image/"));
    if (validFiles.length === 0) {
      toast.error("Please select image files");
      return;
    }
    setFiles([...files, ...validFiles]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleDownloadFile = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", fileUrl.split("/").pop());
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const fileUrls = await Promise.all(
        files.map(async (file) => {
          if (file instanceof File) {
            const uploadedFileUrl = await upload(file);
            if (!uploadedFileUrl) {
              throw new Error("File upload failed");
            }
            return uploadedFileUrl;
          }
          return file;
        })
      );
  
      const payload = { id, desc, files: fileUrls, status };
  
      let res;
      if (!submittedTask || Object.keys(submittedTask).length === 0) {
        // POST request if no data exists in `submittedTask`
        res = await Axios.post(`http://localhost:8000/api/submitedTask/`, payload);
      } else {
        // PUT request if `submittedTask` already contains data
        res = await Axios.put(
          `http://localhost:8000/api/submitedTask/${submittedTask._id}`,
          payload
        );
      }
  
      toast.success(res?.data.message || "Task submitted successfully", {
        position: "bottom-right",
        toastId: 1,
        autoClose: 1500,
      });
  
      // Update the files state with the new file URLs
      setFiles(fileUrls);
  
      // Refetch the submitted task data
      refetchSubmittedTask();

      const updatedTask = { status };
      await Axios.put(`http://localhost:8000/api/task/${id}`, updatedTask);
    } catch (error) {
      toast.error(
        error?.response?.data || error?.response?.message || error.message,
        {
          position: "bottom-right",
          toastId: 1,
          autoClose: 1500,
        }
      );
    } finally {
      setLoading(false);
    }
  };
  
  const calculateRemainingTime = (deadline) => {
    // Parse the deadline, ensuring correct format and time zone
    const deadlineDate = new Date(deadline); // Assuming deadline is in ISO 8601 format
    const currentDate = new Date();
  
    // Convert current date to Pakistani time (PKT)
    const pkOffset = 5 * 60; // PKT is UTC+5
    const localOffset = currentDate.getTimezoneOffset();
    const pkTime = new Date(currentDate.getTime() + (pkOffset + localOffset) * 60000);
  
    const timeDiff = deadlineDate - pkTime;
  
    if (timeDiff < 0) {
      const daysExceeded = Math.ceil(Math.abs(timeDiff) / (1000 * 3600 * 24));
      return `${daysExceeded} day${daysExceeded > 1 ? 's' : ''} exceeded`;
    }
  
    const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
    // Prioritize displaying hours and minutes for deadlines within 24 hours
    if (timeDiff <= 24 * 60 * 60 * 1000 && timeDiff >= 0) {
      return `${hoursLeft} hour${hoursLeft !== 1 ? 's' : ''} and ${minutesLeft} minute${minutesLeft !== 1 ? 's' : ''} left`;
    }
  
    // For deadlines more than 1 day away, display days
    return `${daysDiff} day${daysDiff > 1 ? 's' : ''} left`;
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-2">{task.title}</h3>
      <p className="text-gray-700 mb-4">{task.desc}</p>
      <p className="text-sm text-gray-500">
        <strong>Assignee:</strong> {task.assignee.username}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Deadline:</strong> {calculateRemainingTime(task.deadline)}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Status:</strong>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="ml-2 p-1 border rounded-md"
        >
          
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          {authUser.isAdmin && (
          <>
            <option value="In Complete">In Complete</option>
            <option value="Complete">Complete</option>
          </>
        )}
        </select>
      </p>
      <div className="mt-4">
        <h4 className="font-semibold">Files:</h4>
        <div className="grid grid-cols-3 gap-4 mt-2">
          {task.files.map((file, index) => (
            <div key={index} className="relative block border rounded-md overflow-hidden hover:shadow-lg">
              <a
                href={file}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {renderFilePreview(file)}
                <div className="text-center mt-1 text-sm text-gray-600 truncate">
                  {file.split("/").pop()}
                </div>
              </a>
              <button
                onClick={() => handleDownloadFile(file)}
                className="absolute bottom-2 right-2 bg-indigo-500 text-white rounded-full px-2 py-1"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h4 className="font-semibold">Submit Your Work:</h4>
        <textarea
          value={desc ? desc : ''}
          onChange={(e) => {
            setdesc(e.target.value);
          }}
          placeholder="Add a desc..."
          className="w-full p-2 border rounded-md mt-2"
        />
        <CustomizeInput
          showLabel={false}
          htmlFor="files"
          label="Upload Files"
          labelClassName="text-sm font-medium text-darkColor"
          type="file"
          name="files"
          accept="image/*"
          onChange={handleImageChange}
          multiple
          id="files"
          className="hidden"
        />
        <div className="flex justify-center items-center flex-wrap gap-4 w-full h-full border rounded-md text-sm text-gray-600 mt-2">
          {files.map((file, index) => (
            <div key={index} className="relative w-[120px] h-[120px]">
              <img
                src={file instanceof File ? URL.createObjectURL(file) : file}
                alt={file.name || file}
                className="w-full h-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                X
              </button>
            </div>
          ))}
          <label
            htmlFor="files"
            className="w-fit border py-2 px-5 rounded-md cursor-pointer"
          >
            <BsUpload size={20} />
          </label>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-primary/80 hover:bg-prima ry cursor-pointer outline-none text-white rounded py-3 px-4 transition-all duration-300 mt-3"
        >
          {loading ? (
            <img src={loader} className="w-6 mx-auto" alt="Loading" />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
};

export default TaskDetail;