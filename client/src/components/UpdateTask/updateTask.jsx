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

const UpdateTask = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Extract id from the URL
  const [loading, setLoading] = useState(false);
  const [taskData, setTaskData] = useState(null); // Task data state
  
  // Fetch task data on component mount
  useEffect(() => {
      const fetchTaskData = async () => {
        try {
            console.log('task id',id)
        const response = await Axios.get(`http://localhost:8000/api/task/${id}`);
        setTaskData(response.data); // Set fetched task data
        console.log('task data',response.data)
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
        `http://localhost:8000/api/task/${id}`,
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

  if (!taskData) return <div>Loading...</div>; // Loading fallback

  return (
    <div className="py-10 ml-[300px]">
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
                value={values.assignee}
                onChange={handleChange}
                onBlur={handleBlur}
                error={getError("assignee")}
                id="assignee"
                placeholder="Assignee"
                className="bg-white border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
              />
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
                <div className="flex justify-center items-center flex-wrap gap-4 w-full h-full border rounded-md text-sm text-gray-600">
                  {values.files.map((file, index) => (
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
              </div>
              <button
                type="submit"
                className="w-[10%] mx-auto bg-primary/80 hover:bg-primary cursor-pointer outline-none text-white rounded py-3 transition-all duration-300 mt-3"
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
