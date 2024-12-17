import React, { useState } from "react";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import loader from "../../assets/icons/loader.svg";
import { Axios } from "../../config";
import { toast } from "react-toastify";
import useAuthStore from "../../stores"; // Import authStore

const dataDetail = ({ data }) => {
  const navigate = useNavigate();
  const { updateAuthUser } = useAuthStore(); // Get updateAuthUser from authStore
  const [isVerified, setIsVerified] = useState(data.isVerified); // Track verified status locally
  const [loading, setLoading] = useState(false); // Loading state for button

  const handleToggle = () => {
    setIsVerified((prev) => !prev); // Toggle verified status locally
  };

  const handleUpdate = async () => {
    setLoading(true); // Show loading spinner
    const updatedUser = { ...data, isVerified }; // Prepare updated user data

    try {
      const res = await Axios.put(
        `https://testing-backend-azure.vercel.app/api/user/${data._id}`,
        updatedUser
      );

      // Show success message
      toast.success(res?.data || "User status updated successfully", {
        position: "bottom-right",
        toastId: 1,
        autoClose: 1500,
      });

      // Update Zustand store with the new isVerified status
      updateAuthUser(data._id, isVerified);

      // Redirect after a short delay
      setTimeout(() => {
        navigate("/dashboard/users");
      }, 1500);
    } catch (error) {
      console.error(error);
      // Show error message
      toast.error(error?.response?.data || "An error occurred", {
        position: "bottom-right",
        toastId: 1,
        autoClose: 1500,
      });
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="bg-white  rounded-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
        <div className="relative group">
          <img
            src={data.img}
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover border-4 border-primary group-hover:rotate-3 transition-transform"
          />
          <span className="absolute bottom-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Active
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-gray-800">{data.username}</h3>
          <p className="text-sm text-gray-600 italic mt-1">{data.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Email:</span> {data.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {data.phone}
          </p>
          <p>
            <span className="font-semibold">Country:</span> {data.country}
          </p>
        </div>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">IBAN:</span> {data.bankIban}
          </p>
         
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="isVerified" className="text-sm font-medium text-darkColor">
                Is Verified
              </label>
              {isVerified ? (
                <BsCheckCircle
                  size={24}
                  color="green"
                  onClick={handleToggle}
                  className="cursor-pointer"
                />
              ) : (
                <BsXCircle
                  size={24}
                  color="red"
                  onClick={handleToggle}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-gray-800 mb-2">Images</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="relative group">
            <img
              src={data.img}
              alt="Profile"
              className="h-64 w-full object-cover rounded-lg border shadow-md group-hover:shadow-lg"
            />
            <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-medium">
              Profile
            </span>
          </div>
          <div className="relative group">
            <img
              src={data.idCardFront}
              alt="ID Card Front"
              className="h-64 w-full object-cover rounded-lg border shadow-md group-hover:shadow-lg"
            />
            <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-medium">
              ID Front
            </span>
          </div>
          <div className="relative group">
            <img
              src={data.idCardBack}
              alt="ID Card Back"
              className="h-64 w-full object-cover rounded-lg border shadow-md group-hover:shadow-lg"
            />
            <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-medium">
              ID Back
            </span>
          </div>
          <div className="relative group">
            <img
              src={data.liveSelfie}
              alt="Live Selfie"
              className="h-64 w-full object-cover rounded-lg border shadow-md group-hover:shadow-lg"
            />
            <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-medium">
              Live Selfie
            </span>
          </div>
          <div className="relative group">
            <img
              src={data.bankImg}
              alt="Bank Image"
              className="h-64 w-full object-cover rounded-lg border shadow-md group-hover:shadow-lg"
            />
            <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-medium">
              Bank Image
            </span>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-[200px] mx-auto bg-primary/80 hover:bg-primary cursor-pointer outline-none text-white rounded py-3 transition-all duration-300 mt-3"
        onClick={handleUpdate}
      >
        {loading ? (
          <img src={loader} className="w-6 mx-auto" alt="Loading" />
        ) : (
          "Update User"
        )}
      </button>
    </div>
  );
};

export default dataDetail;
