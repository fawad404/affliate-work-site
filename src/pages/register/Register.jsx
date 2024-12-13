import React, { useState } from "react";
import { useFormik } from "formik";
import CustomizeInput from "../../utils/Input/CustomizeInput";
import CustomizeTextArea from "../../utils/Input/CustomizeTextarea";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../config";
import requests from "../../libs/request";
import { toast } from "react-toastify";
import loader from "../../assets/icons/loader.svg";
import { BsUpload } from "react-icons/bs";
import { registerSchema } from "../../schemas";
import upload from "../../libs/upload";
import Webcam from "react-webcam";
import { AiOutlineCamera } from "react-icons/ai";

const ImagePreview = ({ image, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
        >
          ✕
        </button>
        <img
          src={image}
          alt="Preview"
          className="w-full h-auto max-h-[90vh] object-contain"
        />
      </div>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Add state for popup visibility
  const [previewImage, setPreviewImage] = useState(null);
  const initialValues = {
    username: "",
    birthdate: null,
    email: "",
    password: "",
    phone: "",
    address: "",
    cnic: "",
    skills: [],
    payoneer: "",
    wise: "",
    idCardFront: null,
    idCardBack: null,
    img: null,
    bankImg: null,
    bankIban: null,
    easypaisaAccount: null,
    isSeller: false,
    liveSelfie: null,
  };

  const handleCapture = (setFieldValue) => {
    const webcamRef = React.useRef(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot({ format: 'image/jpeg' });
      const imageBlob = dataURLtoBlob(imageSrc);
      const imageFile = new File([imageBlob], "liveSelfie.jpg", { type: "image/jpeg" });
      setFieldValue("liveSelfie", imageFile);
      setIsCameraOpen(false);
    }, [webcamRef, setFieldValue]);

    const dataURLtoBlob = (dataURL) => {
      const byteString = atob(dataURL.split(',')[1]);
      const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    };

    const openCamera = () => setIsCameraOpen(true);
    const removeImage = () => setFieldValue("liveSelfie", null);

    return { webcamRef, capture, isCameraOpen, openCamera, removeImage };
  };

  const onSubmit = async (payload, actions) => {
    setLoading(true);
    const url = await upload(values.idCardFront);
    const urlImg = await upload(values.img);
    const urlImgBack = await upload(values.idCardBack);
    const BankImage = await upload(values.bankImg);
    const LiveSelfie = await upload(values.liveSelfie);

    try {
      const res = await Axios.post(requests.register, {
        ...payload,
        img: urlImg,
        idCardFront: url,
        idCardBack: urlImgBack,
        bankImg: BankImage,
        liveSelfie: LiveSelfie,
      });
      setShowPopup(true); // Show popup on success
      setLoading(false);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/");
      }, 3000); // Hide popup after 3 seconds and navigate
    } catch (error) {
      setLoading(false);
      if (error?.response?.data) {
        toast.error(error?.response?.data, {
          position: "bottom-right",
          toastId: 1,
          autoClose: 1500,
        });
      } else {
        toast.error(error?.response?.message, {
          position: "bottom-right",
          toastId: 1,
          autoClose: 1500,
        });
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
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
    validationSchema: registerSchema,
    onSubmit,
  });

  const getError = (key) => {
    return touched[key] && errors[key];
  };

  function handleImageChange(event, field) {
    const file = event.currentTarget.files[0];
    if (file && !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      setFieldValue(field, null);
      return;
    }
    setFieldValue(field, file);
  }

  const handleCNICChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters

    if (value.length > 13) {
      value = value.slice(0, 13); // Limit to 13 characters (CNIC length)
    }

    // Add hyphens at appropriate positions
    if (value.length <= 5) {
      value = value.slice(0, 5);
    } else if (value.length <= 12) {
      value = value.slice(0, 5) + "-" + value.slice(5);
    } else {
      value = value.slice(0, 5) + "-" + value.slice(5, 12) + "-" + value.slice(12);
    }

    // Update the Formik field value
    setFieldValue("cnic", value);
  };


  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedSkills = checked
      ? [...values.skills, value]
      : values.skills.filter((skill) => skill !== value);
    setFieldValue("skills", updatedSkills);
  };

  const handlePreviewImage = (imageSrc) => {
    setPreviewImage(imageSrc);
  };

  const { webcamRef, capture, isCameraOpen, openCamera, removeImage } = handleCapture(setFieldValue);

  return (
    <div className="py-24 lg:py-40 pb-10">
      {previewImage && (
        <ImagePreview
          image={previewImage}
          onClose={() => setPreviewImage(null)}
        />
      )}
      <div className="contain">
        {showPopup && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         <div className="relative bg-white rounded-xl shadow-lg w-[400px] overflow-hidden">
           {/* Gradient Header */}
           <div className="bg-gradient-to-b from-blue-500 to-blue-300 h-[120px] flex items-center justify-center relative">
             <div className="bg-white w-[64px] h-[64px] flex items-center justify-center rounded-full shadow-md">
               <svg
                 width="32"
                 height="32"
                 viewBox="0 0 32 32"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path
                   d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM22.9333 12.5333L14.4 21.0667C14.1467 21.32 13.7867 21.4667 13.4 21.4667C13.0133 21.4667 12.6533 21.32 12.4 21.0667L9.06667 17.7333C8.56 17.2267 8.56 16.4 9.06667 15.8933C9.57333 15.3867 10.4 15.3867 10.9067 15.8933L13.4 18.3867L21.0933 10.6933C21.6 10.1867 22.4267 10.1867 22.9333 10.6933C23.44 11.2 23.44 12.0267 22.9333 12.5333Z"
                   fill="#3A8EF6"
                 />
               </svg>
             </div>
             {/* Decorative Sparkles */}
             <div className="absolute inset-0 flex items-center justify-center">
               <svg
                 width="150"
                 height="80"
                 viewBox="0 0 150 80"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path
                   d="M75 10L70 20H80L75 30L80 40H70L75 50L70 60H80"
                   stroke="white"
                   strokeWidth="2"
                   strokeLinecap="round"
                 />
               </svg>
             </div>
           </div>
       
           {/* Content */}
           <div className="px-6 py-4 text-center">
             <h2 className="text-2xl font-bold text-gray-800 mb-2">Congratulations! Registration Succesfull</h2>
             <p className="text-gray-600 mb-4">
              Bonus Reward of <strong>1000rs</strong> would be added to your account.
             </p>
             <button
               className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
               onClick={() => {
                 setShowPopup(false);
                 navigate("/");
               }}
             >
               Done
             </button>
             
           </div>
       
           {/* Arrow Decoration */}
           <div className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2">
             <svg
               width="40"
               height="20"
               viewBox="0 0 40 20"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 d="M20 20L40 0H0L20 20Z"
                 fill="white"
                 stroke="#E5E7EB"
               />
             </svg>
           </div>
         </div>
       </div>
       
        )}
        <div className="w-full lg:w-[75%] flex items-center flex-col sm:flex-row justify-center py-10 mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex items-start flex-col sm:flex-row justify-start gap-8 w-full"
          >
            <div className="flex items-start justify-start flex-col gap-4 w-full sm:flex-1">
              <h1 className="text-2xl text-darkColor font-semibold">
                Create an Account
              </h1>
              <CustomizeInput
                showLabel={false}
                htmlFor="username"
                label="Username"
                labelClassName="text-sm font-medium text-darkColor"
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={getError("username")}
                id="username"
                placeholder="Johndoe"
                className="bg-white  border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
              />

                <CustomizeInput
                  showLabel={false}
                  htmlFor="birthdate"
                  label="Birthdate"
                  labelClassName="text-sm font-medium text-darkColor"
                  type="date"  // Set input type to date
                  name="birthdate"  // Update the name to reflect the birthdate
                  value={values.birthdate}  // Bind to the birthdate value
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={getError("birthdate")}  // Get the error for birthdate instead of username
                  id="birthdate"  // Update the id to match the new input
                  className="bg-white border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
                />

                <CustomizeInput
                  showLabel={false}
                  htmlFor="address"
                  label="Address"
                  labelClassName="text-sm font-medium text-darkColor"
                  type="text"  // Keep input type as text for an address
                  name="address"  // Change the name to address
                  value={values.address}  // Bind to the address value
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={getError("address")}  // Get the error for address
                  id="address"  // Update the id to match the new input
                  placeholder="Enter your address"  // Set a suitable placeholder for address
                  className="bg-white border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
                />


                <CustomizeInput
                  showLabel={false}
                  htmlFor="cnic"
                  label="CNIC"
                  labelClassName="text-sm font-medium text-darkColor"
                  type="text"  // Keep input type as text for CNIC
                  name="cnic"  // Change name to cnic
                  value={values.cnic}  // Bind to the CNIC value
                  onChange={handleCNICChange}
                  onBlur={handleBlur}
                  error={getError("cnic")}  // Get error for CNIC field
                  id="cnic"  // Update id for CNIC field
                  placeholder="XXXXX-XXXXXXX-X"  // Placeholder with the CNIC format
                  pattern="^\d{5}-\d{7}-\d{1}$"  // Optional regex pattern for CNIC validation
                  className="bg-white border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
                />

                <div className="relative w-full">
                      <label className="text-sm font-medium text-darkColor">Your Skills</label>
                      <div className="bg-white border border-[#C7CBD1] w-full rounded p-4">
                        <div className="hover:relative">
                          <span className="text-xs text-gray-500 cursor-pointer" title="Mark all that match.">
                            (Mark all that match)
                          </span>
                        </div>
                        <div className="mt-2">
                          {["Presentation Slides", "Data Entry", "Paper Reviews", "Graphic Design", "Customer Chat Support"].map((skill, index) => (
                            <div key={index} className="flex items-center mb-2">
                              <input
                                type="checkbox"
                                id={`skill-${index}`}
                                name="skills"
                                value={skill}
                                className="w-4 h-4 border-gray-300 rounded focus:ring-primary"
                                onChange={handleCheckboxChange}
                              />
                              <label htmlFor={`skill-${index}`} className="ml-2 text-sm text-darkColor">
                                {skill}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      </div>


                      
              <CustomizeInput
                showLabel={false}
                htmlFor="email"
                label="Email Address"
                labelClassName="text-sm font-medium text-darkColor"
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={getError("email")}
                id="email"
                placeholder="Email Address"
                className="bg-white  border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
              />
              <CustomizeInput
                showLabel={false}
                htmlFor="password"
                label="Password"
                labelClassName="text-sm font-medium text-darkColor"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={getError("password")}
                id="password"
                placeholder="********"
                className="bg-white  border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
              />
              <div className="w-full">
                <CustomizeInput
                  showLabel={false}
                  htmlFor="img"
                  label="Profile Picture"
                  labelClassName="text-sm font-medium text-darkColor"
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "img")}
                  id="img"
                  className="hidden"
                />
                <div
                  className={`flex justify-center items-center flex-col gap-3 w-full border h-[136px] rounded-md text-sm text-gray-600 ${
                    touched.img && errors.img
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  {values?.img?.type?.startsWith("image/") ? (
                    <label
                      htmlFor="img"
                      className="cursor-pointer h-full w-full flex items-center justify-center"
                    >
                      <img
                        src={URL.createObjectURL(values.img)}
                        alt={values.img.name}
                        className="w-[120px] h-[120px] rounded-full object-cover"
                      />
                    </label>
                  ) : (
                    <>
                    
                      <p>Upload Cover Image</p>
                      <BsUpload size={20} />
                      <label
                        htmlFor="img"
                        className="w-fit border py-2 px-5 rounded-md cursor-pointer"
                      >
                        Browser
                      </label>
                    </>
                  )}
                </div>
                {!values?.img?.type?.startsWith("image/") && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-500">Sample Image:</p>
                    <img
                      src="../../Sample-Images/Profile-pic-sample.png" 
                      alt="Sample Profile Pic"
                      className="w-full h-auto object-cover border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handlePreviewImage("../../Sample-Images/Profile-pic-sample.png")}
                    />
                  </div>
                )}
              </div>

                <CustomizeInput
                showLabel={false}
                containerClass="my-2"
                htmlFor="phone"
                label="Phone Number"
                labelClassName="text-sm font-medium text-darkColor"
                type="text"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                id="phone"
                placeholder="phone"
                className="bg-white  border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
              />
              <p className="text-xs text-gray-500 -mt-3">
                    (Must have WhatsApp)
                  </p>
              <button
                type="submit"
                className="w-full bg-primary/80 hover:bg-primary cursor-pointer outline-none text-white rounded py-3 transition-all duration-300 mt-4 hidden sm:block"
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
            </div>
            <div className="flex items-start justify-start flex-col gap-4 w-full sm:flex-1">
              <h1 className="text-2xl text-darkColor font-semibold">
                Bank Details
              </h1>
              {/* <div className="w-full mt-8">
                <label className="flex items-center justify-start w-full relative gap-4">
                  <span className="text-[#5D6771] text-[15px] leading-5 font-medium flex items-center justify-center select-none">
                    Activate the seller account
                  </span>
                  <span className="flex items-center justify-center select-none action">
                    <input
                      type="checkbox"
                      className="appearance-none"
                      value={values.isSeller}
                      onChange={handleChange}
                      name="isSeller"
                    />
                    <i className="bg-[#c5c7c9] relative w-11 h-6 rounded-xl transition-all duration-200 before:content-[''] before:absolute before:top-[2px] before:left-[2.8px] before:w-5 before:h-5 before:bg-white before:rounded-full before:shadow-newLongShadow before:transition-all before:duration-300 cursor-pointer"></i>
                  </span>
                </label>
              </div> */}

              
<div className="relative w-full">
        <label className="text-sm font-medium text-darkColor">Do you have a Payoneer Account?</label>
        <div className="bg-white border border-[#C7CBD1] w-full rounded p-4">
          <div className="hover:relative">
            <span className="text-xs text-gray-500 cursor-pointer" title="If you don’t know what Payoneer is, click No.">
              (If you don’t know what Payoneer is, click No)
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="payoneer-yes"
                name="payoneer"
                value="yes"
                className="w-4 h-4 border-gray-300 focus:ring-primary"
                onChange={handleChange}
              />
              <label htmlFor="payoneer-yes" className="ml-2 text-sm text-darkColor">
                Yes
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="payoneer-no"
                name="payoneer"
                value="no"
                className="w-4 h-4 border-gray-300 focus:ring-primary"
                onChange={handleChange}
              />
              <label htmlFor="payoneer-no" className="ml-2 text-sm text-darkColor">
                No
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Add validation logic */}
      {values.payoneer === "no" && (
        <p className="text-sm text-red-500 mt-2">
          Please ensure you understand Payoneer before proceeding.
        </p>
      )}
      
      <div className="relative w-full">
        <label className="text-sm font-medium text-darkColor">Do you have a Wise Account?</label>
        <div className="bg-white border border-[#C7CBD1] w-full rounded p-4">
          <div className="hover:relative">
            <span className="text-xs text-gray-500 cursor-pointer" title="If you don’t know what Wise is, click No.">
              (If you don’t know what Wise is, click No)
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="wise-yes"
                name="wise"
                value="yes"
                className="w-4 h-4 border-gray-300 focus:ring-primary"
                onChange={handleChange}
              />
              <label htmlFor="wise-yes" className="ml-2 text-sm text-darkColor">
                Yes
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="wise-no"
                name="wise"
                value="no"
                className="w-4 h-4 border-gray-300 focus:ring-primary"
                onChange={handleChange}
              />
              <label htmlFor="wise-no" className="ml-2 text-sm text-darkColor">
                No
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Add validation logic */}
      {values.wise === "no" && (
        <p className="text-sm text-red-500 mt-2">
          Please ensure you understand Wise before proceeding.
        </p>
      )}
              

                  <CustomizeInput
                    showLabel={false}
                    htmlFor="bankIban"
                    label="Your Pakistani Bank IBAN"
                    labelClassName="text-sm font-medium text-darkColor"
                    type="text"
                    name="bankIban"
                    value={values.bankIban}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={getError("bankIban")}
                    id="bankIban"
                    placeholder="Pakistani Bank IBAN"
                    className="bg-white border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
                  />


                  <CustomizeInput
                    showLabel={false}
                    htmlFor="easypaisaAccount"
                    label="EasyPaisa Account IBAN"
                    labelClassName="text-sm font-medium text-darkColor"
                    type="text"
                    name="easypaisaAccount"
                    value={values.easypaisaAccount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={getError("easypaisaAccount")}
                    id="easypaisaAccount"
                    placeholder="EasyPaisa Account IBAN"
                    className="bg-white border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
                  />

                  <p className="text-sm text-darkColor mt-2">
                    (Please ensure that the information entered is accurate and corresponds to your actual bank and EasyPaisa accounts.)
                  </p>


                  <div className="w-full">
                  <CustomizeInput
                    showLabel={false}
                    htmlFor="bankImg"
                    label="Bank Account Number with Title Img"
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "bankImg")}
                    id="bankImg"
                    className="hidden"
                  />
                  <div className={`flex justify-center items-center flex-col gap-3 w-full border h-[136px] rounded-md text-sm text-gray-600 ${touched.bankImg && errors.bankImg ? "border-red-500" : "border-gray-300"}`}>
                    {values?.bankImg?.type?.startsWith("image/") ? (
                      <label htmlFor="bankImg" className="cursor-pointer h-full w-full flex items-center justify-center">
                        <img src={URL.createObjectURL(values.bankImg)} alt="Profile" className="w-[120px] h-[120px] rounded-full object-cover" />
                      </label>
                    ) : (
                      <>
                        <p>Upload Bank Account Number with Title Img</p>
                        <BsUpload size={20} />
                        <label htmlFor="bankImg" className="w-fit border py-2 px-5 rounded-md cursor-pointer">Browse</label>
                      </>
                    )}
                  </div>
                  {!values?.bankImg?.type?.startsWith("image/") && (
                    <div className="mt-3">
                      <p className="text-sm text-darkColor mt-2">
                        (Picture of your Bank Account Number with Title, see samples below.)
                      </p>
                      <div className="mt-4">
                        <p className="text-sm font-medium text-darkColor">Sample Images:</p>
                        <div className="flex flex-col md:flex-row space-x-4 mt-4">
                          {["Sample1.jpg", "Sample2.jpg", "Sample3.jpg"].map((sample, index) => (
                            <img
                              key={index}
                              src={`../../Sample-Images/${sample}`}
                              alt={`Sample ${index + 1}`}
                              className="w-32 h-32 rounded cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => handlePreviewImage(`../../Sample-Images/${sample}`)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              <div className="w-full">
                <CustomizeInput
                  showLabel={false}
                  htmlFor="idCardFront"
                  label="ID Card Front"
                  type="file"
                  name="idCardFront"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "idCardFront")}
                  id="idCardFront"
                  className="hidden"
                />
                <div
                  className={`flex justify-center items-center flex-col gap-3 w-full border h-[200px] text-sm text-gray-600 ${
                    touched.idCardFront && errors.idCardFront ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  {values?.idCardFront?.type?.startsWith("image/") ? (
                    <label
                      htmlFor="idCardFront"
                      className="cursor-pointer h-full w-full flex items-center justify-center"
                    >
                      <img
                        src={URL.createObjectURL(values.idCardFront)}
                        alt="ID Card Front"
                        className="w-[190px] h-[120px] object-cover"
                      />
                    </label>
                  ) : (
                    <>
                      <p>Upload ID Card Front</p>
                      <BsUpload size={20} />
                      <label
                        htmlFor="idCardFront"
                        className="w-fit border py-2 px-5 rounded-md cursor-pointer"
                      >
                        Browse
                      </label>
                    </>
                  )}
                </div>

                {/* Display sample image if no image is uploaded */}
                {!values?.idCardFront?.type?.startsWith("image/") && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-500">Sample Image:</p>
                    <img
                      src="../../Sample-Images/Cnic-Sample.png" 
                      alt="Sample ID Card Front"
                      className="w-full h-64 object-cover border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handlePreviewImage("../../Sample-Images/Cnic-Sample.png")}
                    />
                  </div>
                )}
              </div>

              <div className="w-full">
              <CustomizeInput
                showLabel={false}
                htmlFor="idCardBack"
                label="ID Card Back"
                type="file"
                name="idCardBack"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "idCardBack")}
                id="idCardBack"
                className="hidden"
              />
              <div className={`flex justify-center items-center flex-col gap-3 w-full border h-[200px] rounded-md text-sm text-gray-600 ${touched.idCardBack && errors.idCardBack ? "border-red-500" : "border-gray-300"}`}>
                {values?.idCardBack?.type?.startsWith("image/") ? (
                  <label htmlFor="idCardBack" className="cursor-pointer h-full w-full flex items-center justify-center">
                    <img src={URL.createObjectURL(values.idCardBack)} alt="ID Card Back" className="w-[120px] h-[120px] object-cover" />
                  </label>
                ) : (
                  <>
                    <p>Upload ID Card Back</p>
                    <BsUpload size={20} />
                    <label htmlFor="idCardBack" className="w-fit  border py-2 px-5 rounded-md cursor-pointer">Browse</label>
                  </>
                )}
              </div>

               {/* Display sample image if no image is uploaded */}
               {!values?.idCardBack?.type?.startsWith("image/") && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-500">Sample Image:</p>
                    <img
                      src="../../Sample-Images/Cnic-Sample.png" 
                      alt="Sample ID Card Back"
                      className="w-full h-64 object-cover border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handlePreviewImage("../../Sample-Images/Cnic-Sample.png")}
                    />
                  </div>
                )}
              </div>

              <div className="w-full">
                <label className="text-sm font-medium text-darkColor">Live Selfie</label>
                <div className="flex flex-col items-center">
                  {isCameraOpen ? (
                    <>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="w-full h-full object-cover border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={capture}
                        className="mt-2 bg-primary/80 hover:bg-primary text-white py-2 px-4 rounded"
                      >
                        Capture Selfie
                      </button>
                    </>
                  ) : (
                    <>
                      <AiOutlineCamera size={50} className="text-gray-500 cursor-pointer" onClick={openCamera} />
                      <p className="text-sm text-gray-500 mt-2">Click to start camera</p>
                    </>
                  )}
                  {values.liveSelfie ? (
                    <div className="mt-3">
                      <p className="text-sm text-gray-500">Captured Selfie:</p>
                      <img
                        src={URL.createObjectURL(values.liveSelfie)}
                        alt="Live Selfie"
                        className="w-full h-[200px] object-cover border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="mt-2 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                      >
                        Remove Selfie
                      </button>
                    </div>
                  ) : (
                    <div className="mt-3">
                    <p className="text-sm text-gray-500">Sample Image:</p>
                    <img
                      src="../../Sample-Images/Live-selfie-sample.jpg" 
                      alt="Live Sample Pic"
                      className="w-full h-[500px] object-cover border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handlePreviewImage("../../Sample-Images/Live-selfie-sample.jpg")}
                    />
                  </div>
                  )}
                </div>
              </div>
            
            </div>
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

export default Register;
