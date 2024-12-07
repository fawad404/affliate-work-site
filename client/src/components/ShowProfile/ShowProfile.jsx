import React, { useState } from 'react';
import { BsUpload } from "react-icons/bs";
import CustomizeTextarea from "../../utils/Input/CustomizeTextarea";
import loader from "../../assets/icons/loader.svg";

const ShowProfile = ({ data }) => {


  return (
    <div className="bg-white  rounded-lg p-6 mb-6 w-full ">
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
         
          <p>
            <span className="font-semibold">Verified:</span>{" "}
            <span
              className={`font-bold ${
                data.isVerified ? "text-green-500" : "text-red-500"
              }`}
            >
              {data.isVerified ? "Yes" : "No"}
            </span>
          </p>
        </div>
      </div>

    </div>
  );
};

export default ShowProfile;
