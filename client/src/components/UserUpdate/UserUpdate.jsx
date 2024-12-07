// import React, { useState, useEffect } from "react";
// import { useFormik } from "formik";
// import CustomizeInput from "../../utils/Input/CustomizeInput";
// import CustomizeTextArea from "../../utils/Input/CustomizeTextarea";
// import { useNavigate, useParams } from "react-router-dom";
// import { Axios } from "../../config";
// import requests from "../../libs/request";
// import { toast } from "react-toastify";
// import loader from "../../assets/icons/loader.svg";
// import { BsUpload, BsCheckCircle, BsXCircle } from "react-icons/bs";
// // import { userSchema } from "../../schemas/userSchema";
// import upload from "../../libs/upload";

// const UserUpdate = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState(null); 
  
//   // Fetch user data on component mount
//   useEffect(() => {
//       const fetchUserData = async () => {
//         try {
//             console.log('user id',id)
//         const response = await Axios.get(`http://localhost:8000/api/user/${id}`);
//         setUserData(response.data); // Set fetched user data
//         console.log('user data',response.data)
//       } catch (error) {
//         toast.error("Error fetching user data");
//       }
//     };

//     if (id) fetchUserData();
//   }, [id]);

//   // Form submission handler
//   const onSubmit = async (payload, actions) => {
//     setLoading(true);

//     try {
//       // Upload files and prepare payload
//       const fileUrls = await Promise.all(
//         values.files.map((file) => {
//           if (file instanceof File) {
//             return upload(file);
//           }
//           return file;
//         })
//       );
//       const updatedUser = { ...payload, files: fileUrls };

//       // Send updated data to the API
//       const res = await Axios.put(
//         `http://localhost:8000/api/user/${id}`,
//         updatedUser
//       );

//       // Display success toast immediately
//       toast.success(res?.data , {
//         position: "bottom-right",
//         toastId: 1,
//         autoClose: 1500,
//       });

//       // Delay navigation by 4 seconds
//       setTimeout(() => {
//         navigate("/dashboard/users");
//       }, 4000);
//     } catch (error) {
//       toast.error(error?.response?.data || error?.response?.message, {
//         position: "bottom-right",
//         toastId: 1,
//         autoClose: 1500,
//       });
//     } finally {
//       setLoading(false);
//       actions.resetForm();
//     }
//   };

//   const {
//     handleChange,
//     values,
//     handleBlur,
//     handleSubmit,
//     errors,
//     touched,
//     setFieldValue,
//   } = useFormik({
//     initialValues: {
//       email: userData?.email || "",
//       files: userData?.files || [],
//       username: userData?.username || "",
//       img: userData?.img || "",
//       idCardFront: userData?.idCardFront || "",
//       idCardBack: userData?.idCardBack || "",
//       country: userData?.country || "",
//       phone: userData?.phone || "",
//       desc: userData?.desc || "",
//       skills: userData?.skills || [],
//       isVerified: userData?.isVerified || false,
//     },
//     enableReinitialize: true, // Reinitialize form values when userData updates
//     // validationSchema: userSchema,
//     onSubmit,
//   });

//   const getError = (key) => touched[key] && errors[key];

//   const handleImageChange = (event, field) => {
//     const file = event.currentTarget.files[0]; // Get the first file
//     if (file && file.type.startsWith("image/")) {
//       setFieldValue(field, file);
//     } else {
//       toast.error("Please select an image file");
//     }
//   };

//   const handleSkillsChange = (event) => {
//     const skills = event.target.value.split(',').map(skill => skill.trim());
//     setFieldValue("skills", skills);
//   };

//   const handleRemoveFile = (index) => {
//     const updatedFiles = [...values.files];
//     updatedFiles.splice(index, 1);
//     setFieldValue("files", updatedFiles);
//   };

//   const handleToggle = (field) => {
//     setFieldValue(field, !values[field]);
//   };

//   if (!userData) return <div>Loading...</div>; // Loading fallback

//   return (
//     <div className="py-10 ml-[300px]">
//       <div className="contain">
//         <div className="w-full lg:w-[75%] flex items-center flex-col justify-center py-10 mx-auto">
//           <form
//             onSubmit={handleSubmit}
//             className="flex items-start flex-col justify-start gap-8 w-full"
//           >
//             <div className="flex items-start justify-start flex-col gap-4 w-full sm:flex-1">
//               <h1 className="text-2xl text-darkColor font-semibold">Edit User</h1>
//               <CustomizeInput
//                 showLabel={false}
//                 htmlFor="username"
//                 label="Username"
//                 labelClassName="text-sm font-medium text-darkColor"
//                 type="text"
//                 name="username"
//                 value={values.username}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={getError("username")}
//                 id="username"
//                 placeholder="Username"
//                 className="bg-white border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
//               />
              
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-2">
//                   <label htmlFor="isVerified" className="text-sm font-medium text-darkColor">
//                     Is Verified
//                   </label>
//                   {values.isVerified ? (
//                     <BsCheckCircle
//                       size={24}
//                       color="green"
//                       onClick={() => handleToggle("isVerified")}
//                       className="cursor-pointer"
//                     />
//                   ) : (
//                     <BsXCircle
//                       size={24}
//                       color="red"
//                       onClick={() => handleToggle("isVerified")}
//                       className="cursor-pointer"
//                     />
//                   )}
//                 </div>
               
//               </div>
//               <CustomizeInput
//                 showLabel={false}
//                 htmlFor="skills"
//                 label="Skills"
//                 labelClassName="text-sm font-medium text-darkColor"
//                 type="text"
//                 name="skills"
//                 value={values.skills.join(', ')}
//                 onChange={handleSkillsChange}
//                 onBlur={handleBlur}
//                 error={getError("skills")}
//                 id="skills"
//                 placeholder="Skills (comma separated)"
//                 className="bg-white border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
//               />
//               <div className="w-full h-[300px]">
//                 <CustomizeInput
//                   showLabel={false}
//                   htmlFor="img"
//                   label="Profile Image"
//                   labelClassName="text-sm font-medium text-darkColor"
//                   type="file"
//                   name="img"
//                   accept="image/*"
//                   onChange={(e) => handleImageChange(e, "img")}
//                   id="img"
//                   className="hidden"
//                 />
//                 <div className="flex justify-center items-center flex-wrap gap-4 w-full h-full border rounded-md text-sm text-gray-600">
//                   {values.img && (
//                     <div className="relative w-[120px] h-[120px]">
//                       <img
//                         src={values.img instanceof File ? URL.createObjectURL(values.img) : values.img}
//                         alt="Profile"
//                         className="w-full h-full object-cover rounded-md"
//                       />
//                     </div>
//                   )}
//                   <label
//                     htmlFor="img"
//                     className="w-fit border py-2 px-5 rounded-md cursor-pointer"
//                   >
//                     <BsUpload size={20} />
//                   </label>
//                 </div>
//               </div>
//               <div className="w-full h-[300px]">
//                 <CustomizeInput
//                   showLabel={false}
//                   htmlFor="idCardFront"
//                   label="ID Card Front"
//                   labelClassName="text-sm font-medium text-darkColor"
//                   type="file"
//                   name="idCardFront"
//                   accept="image/*"
//                   onChange={(e) => handleImageChange(e, "idCardFront")}
//                   id="idCardFront"
//                   className="hidden"
//                 />
//                 <div className="flex justify-center items-center flex-wrap gap-4 w-full h-full border rounded-md text-sm text-gray-600">
//                   {values.idCardFront && (
//                     <div className="relative w-[120px] h-[120px]">
//                       <img
//                         src={values.idCardFront instanceof File ? URL.createObjectURL(values.idCardFront) : values.idCardFront}
//                         alt="ID Card Front"
//                         className="w-full h-full object-cover rounded-md"
//                       />
//                     </div>
//                   )}
//                   <label
//                     htmlFor="idCardFront"
//                     className="w-fit border py-2 px-5 rounded-md cursor-pointer"
//                   >
//                     <BsUpload size={20} />
//                   </label>
//                 </div>
//               </div>
//               <div className="w-full h-[300px]">
//                 <CustomizeInput
//                   showLabel={false}
//                   htmlFor="idCardBack"
//                   label="ID Card Back"
//                   labelClassName="text-sm font-medium text-darkColor"
//                   type="file"
//                   name="idCardBack"
//                   accept="image/*"
//                   onChange={(e) => handleImageChange(e, "idCardBack")}
//                   id="idCardBack"
//                   className="hidden"
//                 />
//                 <div className="flex justify-center items-center flex-wrap gap-4 w-full h-full border rounded-md text-sm text-gray-600">
//                   {values.idCardBack && (
//                     <div className="relative w-[120px] h-[120px]">
//                       <img
//                         src={values.idCardBack instanceof File ? URL.createObjectURL(values.idCardBack) : values.idCardBack}
//                         alt="ID Card Back"
//                         className="w-full h-full object-cover rounded-md"
//                       />
//                     </div>
//                   )}
//                   <label
//                     htmlFor="idCardBack"
//                     className="w-fit border py-2 px-5 rounded-md cursor-pointer"
//                   >
//                     <BsUpload size={20} />
//                   </label>
//                 </div>
//               </div>
//               <CustomizeInput
//                 showLabel={false}
//                 htmlFor="country"
//                 label="Country"
//                 labelClassName="text-sm font-medium text-darkColor"
//                 type="text"
//                 name="country"
//                 value={values.country}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={getError("country")}
//                 id="country"
//                 placeholder="Country"
//                 className="bg-white border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
//               />
//               <CustomizeInput
//                 showLabel={false}
//                 htmlFor="phone"
//                 label="Phone"
//                 labelClassName="text-sm font-medium text-darkColor"
//                 type="text"
//                 name="phone"
//                 value={values.phone}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={getError("phone")}
//                 id="phone"
//                 placeholder="Phone"
//                 className="bg-white border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
//               />
//               <CustomizeTextArea
//                 showLabel={false}
//                 htmlFor="desc"
//                 label="Description"
//                 labelClassName="text-sm font-medium text-darkColor"
//                 name="desc"
//                 value={values.desc}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={getError("desc")}
//                 id="desc"
//                 placeholder="Description"
//                 className="bg-white border border-[#C7CBD1] w-full h-[100px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
//               />
//               {/* File Upload */}
              
//               <button
//                 type="submit"
//                 className="w-[10%] mx-auto bg-primary/80 hover:bg-primary cursor-pointer outline-none text-white rounded py-3 transition-all duration-300 mt-3"
//               >
//                 {loading ? (
//                   <img src={loader} className="w-6 mx-auto" alt="Loading" />
//                 ) : (
//                   "Update User"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserUpdate;
