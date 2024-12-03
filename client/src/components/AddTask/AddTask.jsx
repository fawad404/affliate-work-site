import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import CustomizeInput from "../../utils/Input/CustomizeInput";
import CustomizeTextArea from "../../utils/Input/CustomizeTextarea";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../config";
import requests from "../../libs/request";
import { toast } from "react-toastify";
import loader from "../../assets/icons/loader.svg";
import { BsUpload } from "react-icons/bs";
import { taskSchema } from "../../schemas";
import upload from "../../libs/upload";
import axios from "axios";

const AddTask = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAssignee, setSelectedAssignee] = useState(null);
  const [loadingAssignee, setLoadingAssignee] = useState(false);
  const [assigneeQuery, setAssigneeQuery] = useState(""); // New state for search query
  const initialValues = {
    title: "",
    desc: "",
    assignee: "",
    deadline: "",
    files: [], // Store multiple files in an array
  };

  const onSubmit = async (payload, actions) => {
    setLoading(true);

    try {
      // Assuming `upload` can handle multiple files and returns URLs for each file
      const fileUrls = await Promise.all(values.files.map(file => upload(file)));
      console.log({...payload, files: fileUrls});

     // Send the URLs of the uploaded files along with the rest of the payload data
      const res = await Axios.post(requests.tasks, {
        ...payload,
        files: fileUrls, // Pass the file URLs to the server
      });

      toast.success(res?.data, {
        position: "bottom-right",
        toastId: 1,
        autoClose: 1500,
      });
      
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
    initialValues,
    validationSchema: taskSchema,
    onSubmit,
  });

  const getError = (key) => {
    return touched[key] && errors[key];
  };

  function handleImageChange(event) {
    const files = Array.from(event.currentTarget.files); // Convert FileList to array
    const validFiles = files.filter(file => file.type.startsWith("image/")); // Filter valid images
    
    if (validFiles.length === 0) {
      toast.error("Please select image files");
      return;
    }

    setFieldValue("files", [...values.files, ...validFiles]); // Append new files to the existing ones
  }

  function handleRemoveFile(index) {
    const updatedFiles = [...values.files];
    updatedFiles.splice(index, 1);
    setFieldValue("files", updatedFiles);
  }

  const handleAssigneeSearch = async (event) => {
    const query = event.target.value;
    setAssigneeQuery(query); // Update search query state
    console.log("Search Query:", query); // Debugging statement

    if (query.length > 2) {
      setLoadingAssignee(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/user?search=${query}`);
        setSearchResults(response.data.users);
        console.log("Search Results:", response.data);
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
    console.log(assignee._id); // Store the ID of the selected user
    setAssigneeQuery(assignee.username); // Update search query with selected assignee's username
    setSearchResults([]);
  };

  return (
    <div className="py-10 lg:ml-[300px]">
      <div className="contain">
        <div className="w-full lg:w-[75%] flex items-center flex-col justify-center py-10 mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex items-start flex-col justify-start gap-8 w-full"
          >
            <div className="flex items-start justify-start flex-col gap-4 w-full sm:flex-1">
              <h1 className="text-2xl text-darkColor font-semibold">
                Create Task
              </h1>
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
                placeholder="test title"
                className="bg-white  border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
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
                placeholder="A short description of yourself"
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
                label="deadline"
                labelClassName="text-sm font-medium text-darkColor"
                type="date"
                name="deadline"
                value={values.deadline}
                onChange={handleChange}
                onBlur={handleBlur}
                error={getError("deadline")}
                id="deadline"
                className="bg-white  border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
              />
             
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
                multiple // Allow selecting multiple files
                id="files"
                className="hidden"
              />
              <div className={`flex justify-center items-center flex-wrap gap-4 w-full h-full border rounded-md text-sm text-gray-600 ${touched.files && errors.files ? "border-red-500" : "border-gray-300"}`}>
                {values.files.length > 0 && (
                  values.files.map((file, index) => (
                    <div key={index} className="relative w-[120px] h-[120px]">
                      <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-full object-cover rounded-md" />
                      <button type="button" onClick={() => handleRemoveFile(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1">X</button>
                    </div>
                  ))
                )}
                  <>
                    <label htmlFor="files" className="w-fit border py-2 px-5 rounded-md cursor-pointer">
                    <BsUpload size={20} />
                   
                    </label>
                  </>
                
              </div>
            </div>

 
              <button
                type="submit"
                className="w-[10%] mx-auto bg-primary/80 hover:bg-primary cursor-pointer outline-none text-white rounded py-3 transition-all duration-300 mt-4 hidden sm:block"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <img src={loader} alt="/" className="w-[40px]" />
                  </div>
                ) : (
                  <p className="flex items-center justify-center gap-2">
                    Create
                  </p>
                )}
              </button>
            </div>
            <div></div>
            <button
              type="submit"
              className="w-full bg-primary/80 hover:bg-primary cursor-pointer outline-none text-white rounded py-3 transition-all duration-300 mt-4 sm:hidden"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <img src={loader} alt="/" className="w-[40px]" />
                </div>
              ) : (
                <p className="flex items-center justify-center gap-2">
                  Register
                </p>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;