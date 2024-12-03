import React, { useEffect, useState } from 'react'
import Avatar from "../../assets/icons/avatar.jpg";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Ensure axios is imported
import { toast } from 'react-toastify';

const User = ({users}) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleDropdown = (id) => {
    setDropdownOpen((prevId) => (prevId === id ? null : id));
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

  const handleEditClick = (userId) => {
    navigate(`/dashboard/update-user/${userId}`)
    // console.log("handle edit click user is:" , user);
    // setSelectedUser(user);
    // setIsModalOpen(true);
  };
  const handleSeeUser = (userId) => {
    navigate(`/dashboard/user/${userId}`);
  }
  const handleDelete = async (userId, isAdmin) => {
    if (isAdmin) {
      toast.error("Admin users cannot be deleted.", {
        position: "bottom-right",
        toastId: 1,
        autoClose: 1500,
      });
      return;
    }
    try {
      await Axios.delete(`http://localhost:8000/api/user/${userId}`);
      toast.success("User deleted successfully.", {
        position: "bottom-right",
        toastId: 1,
        autoClose: 1500,
      });
      // Optionally, you can refresh the user list here
    } catch (error) {
      toast.error("There was an error deleting the user!", {
        position: "bottom-right",
        toastId: 1,
        autoClose: 1500,
      });
      console.error("There was an error deleting the user!", error);
    }
  };

  return (
    <section className="py-8 mt-8">
    <div className=" px-0 md:px-4" >
      <div className="p-4 mb-6 bg-white shadow rounded">
      <table className="table-auto w-full">
  <thead>
    <tr className="text-xs text-gray-500 text-left">
      <th className="pl-6 pb-3 font-medium hidden md:block">Customer ID</th>
      <th className="pb-3 font-medium">User</th>
      <th className="pb-3 font-medium hidden md:block">Phone Number</th>
      <th className="pb-3 font-medium">Verified</th>
      <th className="pb-3 font-medium">Action</th>
    </tr>
  </thead>
  <tbody>
    {users && users.length > 0 ? (
      users.map((data) => (
        <tr className="text-xs bg-gray-50" key={data._id}>
          <td className="py-5 px-6 font-medium hidden md:table-cell">{data._id}</td>
          <td className="py-3 pr-3 md:px-4">
            <div className="flex items-center">
              <img
                className="w-8 h-8 mr-4 object-cover rounded-md"
                src={data.img || Avatar}
                alt=""
              />
              <div>
                <p className="font-medium">{data.username}</p>
                <p className="text-gray-500 text-sm">{data.email}</p>
              </div>
            </div>
          </td>
          <td className="py-5 px-6 font-medium hidden md:table-cell">
            <button>{data.phone ? data.phone : 'null'}</button>
          </td>
          <td className="py-5 pl-6 md:px-6">
            <span
              className={`inline-block py-1 px-2 text-white rounded-full cursor-pointer ${
                data.isVerified === true ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {data.isVerified === true ? 'Verified' : 'Not'}
            </span>
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
                              onClick={() => handleDelete(data._id, data.isAdmin)}
                            >
                              Delete
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleSeeUser(data._id)}
                            >
                              See User
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="5" className="text-center py-5">
          No users found.
        </td>
      </tr>
    )}
  </tbody>
</table>

      </div>
    </div>

</section>
  )
}

export default User
