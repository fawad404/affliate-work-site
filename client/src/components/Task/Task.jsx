import React, { useState, useEffect } from "react";
import Avatar from "../../assets/icons/avatar.jpg";
import Modal from "../modal/Modal";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores";

const Task = ({ tasks }) => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  console.log("AuthUser:", authUser);

  const toggleDropdown = (id) => {
    setDropdownOpen((prevId) => (prevId === id ? null : id));
  };

  const calculateRemainingDays = (deadline) => {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - currentDate;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (daysDiff < 0) {
      return `${Math.abs(daysDiff)} day${Math.abs(daysDiff) > 1 ? 's' : ''} exceeded`;
    }
    return `${daysDiff} day${daysDiff > 1 ? 's' : ''}`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-menu")) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleEditClick = (taskId) => {
    navigate(`/dashboard/update-task/${taskId}`);
  };

  const handleSeeTaskClick = (taskId) => {
    navigate(`/dashboard/tasks/${taskId}`);
  };

  const handleModalSubmit = (updatedData) => {
    console.log("Updated User Data:", updatedData);
    setIsModalOpen(false);
  };

  return (
    <section className="py-8 mt-8">
      <div className="container px-0 md:px-4">
        <div className="p-4 mb-6 bg-white shadow rounded">
          {tasks.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="bg-gray-100 p-6 rounded shadow-md text-center">
                <p className="text-lg font-medium text-gray-700">No tasks found or not assigned to you!</p>
              </div>
            </div>
          ) : (
            <table className="table-auto w-full">
              <thead>
                <tr className="text-xs text-gray-500 text-left">
                  <th className="pl-6 pb-3 font-medium hidden md:block">Task Title</th>
                  <th className="pb-3 font-medium">Assigned To</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium hidden md:block">Deadline</th>
                  <th className="pb-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((data) => (
                  <tr className="text-xs bg-gray-50" key={data._id}>
                    <td className="py-5 px-6 font-medium hidden md:table-cell">{data.title}</td>
                    <td className="py-3 pr-3 md:px-4">
                      <div className="flex items-center">
                        <img
                          className="w-8 h-8 mr-4 object-cover rounded-md"
                          src={data.assignee?.img || Avatar}
                          alt=""
                        />
                        <div>
                          <p className="font-medium">{data.assignee?.username}</p>
                          <p className="text-gray-500 text-sm">{data.assignee?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 pl-6 md:px-6">
                      <span
                        className={`inline-block py-1 px-2 text-white rounded-full cursor-pointer ${
                          data.status === "To Do" ? "bg-gray-500" : "bg-green-500"
                        }`}
                      >
                        {data.status}
                      </span>
                    </td>
                    <td className="py-5 px-6 font-medium hidden md:table-cell">
                      <button
                        className={calculateRemainingDays(data.deadline).includes('exceeded') ? "text-red-500" : ""}
                      >
                        {data.deadline ? calculateRemainingDays(data.deadline) : "null"}
                      </button>
                    </td>
                    <td className="py-5 pl-3 md:px-6 relative">
                      <button
                        className="text-gray-600 hover:text-gray-900 text-2xl"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(data._id);
                        }}
                      >
                        ⋮
                      </button>
                      {dropdownOpen === data._id && (
                        <div className="dropdown-menu absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow-md z-10">
                          <ul className="text-sm text-gray-700">
                            <li
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleEditClick(data._id)}
                            >
                              Edit
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => console.log("Delete", data._id)}
                            >
                              Delete
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleSeeTaskClick(data._id)}
                            >
                              See Task
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/* <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={selectedUser}
        onSubmit={handleModalSubmit}
      /> */}
    </section>
  );
};

export default Task;
