import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Axios } from "../../config";
import upload from "../../libs/upload";
import { BsUpload } from "react-icons/bs";
import CustomizeInput from "../../utils/Input/CustomizeInput";
import loader from "../../assets/icons/loader.svg";
import { useParams, useNavigate } from "react-router-dom";

const TaskDetail = ({ task, refetchTask }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [desc, setdesc] = useState(task.desc || "");
  const [files, setFiles] = useState(task.files || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task.files) {
      setFiles(task.files);
    }
    if (task.desc) {
      setdesc(task.desc);
    }
  }, [task.files, task.desc]);

  useEffect(() => {
    const fetchSubmittedTask = async () => {
      try {
        const res = await Axios.get(`http://localhost:8000/api/submitedTask/${id}`);
        if (res.data) {
          setdesc(res.data.desc);
          setFiles(res.data.files);
        }
      } catch (error) {
        console.error("Error fetching submitted task:", error);
      }
    };
    fetchSubmittedTask();
  }, [id, refetchTask]);

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
      const payload = { id, desc, files: fileUrls };
      console.log("Payload:", payload);
      const res = await Axios.post(
        `http://localhost:8000/api/submitedTask/`,
        payload
      );
      toast.success(res?.data.message || "Task submitted successfully", {
        position: "bottom-right",
        toastId: 1,
        autoClose: 1500,
      });
      // Update the files state with the new file URLs
      setFiles(fileUrls);
      // Refetch the task data
      refetchTask();
      // Redirect to /dashboard/tasks after 5 seconds
      setTimeout(() => {
        navigate("/dashboard/tasks");
      }, 4000);
    } catch (error) {
      toast.error(error?.response?.data || error?.response?.message || error.message, {
        position: "bottom-right",
        toastId: 1,
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-2">{task.title}</h3>
      <p className="text-gray-700 mb-4">{task.desc}</p>
      <p className="text-sm text-gray-500">
        <strong>Assignee:</strong> {task.assignee}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Status:</strong> {task.status}
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
          value={desc}
          onChange={(e) => setdesc(e.target.value)}
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