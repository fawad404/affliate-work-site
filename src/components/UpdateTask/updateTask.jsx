import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import CustomizeInput from "../../utils/Input/CustomizeInput";
import CustomizeTextArea from "../../utils/Input/CustomizeTextarea";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../config";
import requests from "../../libs/request";
import { toast } from "react-toastify";
import loader from "../../assets/icons/loader.svg";
import { BsUpload } from "react-icons/bs";
import { taskSchema } from "../../schemas";
import upload from "../../libs/upload";
import axios from "axios";

const UpdateTask = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Extract id from the URL
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAssignee, setSelectedAssignee] = useState(null);
  const [loadingAssignee, setLoadingAssignee] = useState(false);
  const [taskData, setTaskData] = useState(null); // Task data state
  const [assigneeQuery, setAssigneeQuery] = useState("");
  
  // Fetch task data on component mount
  useEffect(() => {
      const fetchTaskData = async () => {
        try {
        const response = await Axios.get(`https://testing-backend-azure.vercel.app/api/task/${id}`);
        setTaskData(response.data); // Set fetched task data
        setAssigneeQuery(response.data.assignee.username)
      } catch (error) {
        toast.error("Error fetching task data");
      }
    };

    if (id) fetchTaskData();
  }, [id]);

  // Form submission handler
  const onSubmit = async (payload, actions) => {
    setLoading(true);

    try {
      // Upload files and prepare payload
      const fileUrls = await Promise.all(
        values.files.map((file) => {
          if (file instanceof File) {
            return upload(file);
          }
          return file;
        })
      );
      const updatedTask = { ...payload, files: fileUrls };

      // Send updated data to the API
      const res = await Axios.put(
        `https://testing-backend-azure.vercel.app/api/task/${id}`,
        updatedTask
      );

      // Display success toast immediately
      toast.success(res?.data , {
        position: "bottom-right",
        toastId: 1,
        autoClose: 1500,
      });

      // Delay navigation by 4 seconds
      setTimeout(() => {
        navigate("/dashboard/tasks");
      }, 4000);
    } catch (error) {
      toast.error(error?.response?.data || error?.response?.message, {
        position: "bottom-right",
        toastId: 1,
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
      actions.resetForm();
    }
  };

  const {
    handleChange,
    values,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: taskData?.title || "",
      desc: taskData?.desc || "",
      assignee: taskData?.assignee || "",
      deadline: taskData ? new Date(taskData.deadline).toISOString().split('T')[0] : "",
      files: taskData?.files || [],
    },
    enableReinitialize: true, // Reinitialize form values when taskData updates
    validationSchema: taskSchema,
    onSubmit,
  });

  const getError = (key) => touched[key] && errors[key];

  const handleImageChange = (event) => {
    const files = Array.from(event.currentTarget.files); // Convert FileList to array
    const validFiles = files.filter((file) => file.type.startsWith("image/")); // Filter valid images

    if (validFiles.length === 0) {
      toast.error("Please select image files");
      return;
    }

    setFieldValue("files", [...values.files, ...validFiles]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...values.files];
    updatedFiles.splice(index, 1);
    setFieldValue("files", updatedFiles);
  };
  
  const handleAssigneeSearch = async (event) => {
    const query = event.target.value;
    setAssigneeQuery(query); // Update search query state

    if (query.length > 2) {
      setLoadingAssignee(true);
      try {
        const response = await axios.get(`https://testing-backend-azure.vercel.app/api/user?search=${query}`);
        setSearchResults(response.data.users);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoadingAssignee(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectAssignee = (assignee) => {
    setSelectedAssignee(assignee);
    setFieldValue("assignee", assignee._id);
    setAssigneeQuery(assignee.username); // Update search query with selected assignee's username
    setSearchResults([]);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.currentTarget.files); // Convert FileList to array
    setFieldValue("files", [...values.files, ...files]); // Add selected files
  };
  


  if (!taskData) return <div>Loading...</div>; // Loading fallback

  return (
    <div className="py-10 lg:ml-[300px]">
      <div className="contain">
        <div className="w-full lg:w-[75%] flex items-center flex-col justify-center py-10 mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex items-start flex-col justify-start gap-8 w-full"
          >
            <div className="flex items-start justify-start flex-col gap-4 w-full sm:flex-1">
              <h1 className="text-2xl text-darkColor font-semibold">Edit Task</h1>
              <CustomizeInput
                showLabel={false}
                htmlFor="title"
                label="Title"
                labelClassName="text-sm font-medium text-darkColor"
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={getError("title")}
                id="title"
                placeholder="Task Title"
                className="bg-white border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
              />
              <CustomizeTextArea
                rows={9}
                showLabel={false}
                htmlFor="desc"
                label="Description"
                labelClassName="text-sm font-medium text-darkColor"
                value={values.desc}
                onChange={handleChange}
                onBlur={handleBlur}
                id="desc"
                name="desc"
                placeholder="A short description of the task"
                className="bg-white border border-[#E6E6E6] w-full h-[107px] rounded p-4 focus:border-[1.5px] outline-none text-sm text-[#454B54] resize-none shadow-smallShadow"
              />
              <CustomizeInput
                showLabel={false}
                htmlFor="assignee"
                label="Assignee"
                labelClassName="text-sm font-medium text-darkColor"
                type="text"
                name="assignee"
                value={assigneeQuery} // Use search query state for input value
                onChange={handleAssigneeSearch}
                onBlur={handleBlur}
                error={getError("assignee")}
                id="assignee"
                placeholder="Assignee"
                className="bg-white  border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
              />
              {loadingAssignee && <img src={loader} alt="Loading..." className="w-[40px]" />}
              {assigneeQuery && searchResults.length === 0 && !loadingAssignee && !selectedAssignee && (
                <p className="mt-2 text-sm text-gray-500">No results found</p>
              )}
              {searchResults.length > 0 && (
                <ul className="border border-gray-300 rounded-md mt-2  max-h-40 overflow-y-auto bg-white">
                  {searchResults.map((result, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectAssignee(result)}
                      className="cursor-pointer p-2 hover:bg-gray-200 text-black"
                    >
                      {result.username} ({result.email})
                    </li>
                  ))}
                </ul>
              )}
              {selectedAssignee && (
                <div className="mt-2 p-2 border border-gray-300 rounded-md bg-white">
                  <p>Selected Assignee: {selectedAssignee.username} ({selectedAssignee.email})</p>
                </div>
              )}
              <CustomizeInput
                showLabel={false}
                htmlFor="deadline"
                label="Deadline"
                labelClassName="text-sm font-medium text-darkColor"
                type="date"
                name="deadline"
                value={values.deadline}
                onChange={handleChange}
                onBlur={handleBlur}
                error={getError("deadline")}
                id="deadline"
                className="bg-white border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
              />
              {/* File Upload */}
              <div className="w-full h-[300px]">
              <input
    type="file"
    id="files"
    multiple
    onChange={handleFileChange}
    className="hidden"
  />
  <div className="flex flex-wrap gap-4 w-full border rounded-md p-4">
    {values.files.map((file, index) => {
      const isImage = file instanceof File
        ? file.type.startsWith("image/")
        : /\.(jpg|jpeg|png|gif)$/i.test(file);

      const fileName = file instanceof File ? file.name : file.split("/").pop();
      const fileExtension = fileName.split(".").pop().toUpperCase();

      return (
        <div key={index} className="relative w-[120px] h-[120px] flex flex-col items-center">
          {isImage ? (
            <img
              src={file instanceof File ? URL.createObjectURL(file) : file}
              alt={fileName}
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <div className="flex flex-col items-center">
              <a 
                href={file instanceof File ? URL.createObjectURL(file) : file}
                download={fileName}
                className="text-gray-500 text-xs"
              >
                {fileExtension} File
              </a>
              {/* <p className="text-gray-500 text-xs">({fileExtension})</p> */}
            </div>
          )}
          <button
            type="button"
            onClick={() => handleRemoveFile(index)}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
          >
            X
          </button>
        </div>
      );
    })}
    <label htmlFor="files" className="border py-2 px-5 rounded-md cursor-pointer">
      <BsUpload size={20} />
    </label>
  </div>
              </div>
              <button
                type="submit"
                className="w-[175px] mx-auto bg-primary/80 hover:bg-primary cursor-pointer outline-none text-white rounded py-4 px-4 transition-all duration-300 mt-3"
              >
                {loading ? (
                  <img src={loader} className="w-6 mx-auto" alt="Loading" />
                ) : (
                  "Update Task"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
