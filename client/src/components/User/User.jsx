import React from 'react'
import Avatar from "../../assets/icons/avatar.jpg";
const User = ({users}) => {
      
  return (
    <section className="py-8 mt-8">
    <div className="container px-0 md:px-4" >
      <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
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
    {users.map((data) => (
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
        <td className="py-5 pl-3 md:px-6">
          <a href={`/dashboard/users/${data._id}`}>
            <span className="inline-block py-1 px-2 text-white rounded-full cursor-pointer bg-green-500">
              Edit
            </span>
          </a>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>

</section>
  )
}

export default User
