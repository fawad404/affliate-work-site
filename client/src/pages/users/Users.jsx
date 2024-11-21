import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import FloatingWhatsApp from '../../components/FloatingWhatsApp/FloatingWhatsApp'
import User from '../../components/User/User'
import { Axios } from '../../config'
import requests from '../../libs/request'
import { useQuery } from '@tanstack/react-query'
import loader from "../../assets/icons/loader.svg";

const Users = () => {

      const { isLoading, error, data } = useQuery({
        queryKey: ["users"],
        queryFn: () => Axios.get(requests.users).then((res) => res.data),
      });      
      console.log(data);
    
  return (
    <>
    
    {isLoading ? (
        <div className="flex items-center justify-center w-full mt-28">
          <img src={loader} alt="/" className="w-[40px]" />
        </div>
      ) : error ? (
        <p className="text-xl md:text-2xl text-red-400 font-normal">
          Error : Something went wrong
        </p>
      ) : (
    <>
    <FloatingWhatsApp />
    <div>
        <Sidebar />
        <div className='ml-0 lg:ml-[16%]'>
        <User users={data}/>
        </div>
    </div>
    </>
      )}
      </>
  )
}

export default Users
