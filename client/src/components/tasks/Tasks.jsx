import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import FloatingWhatsApp from '../../components/FloatingWhatsApp/FloatingWhatsApp'
import { Axios } from '../../config'
import requests from '../../libs/request'
import { useQuery } from '@tanstack/react-query'
import loader from "../../assets/icons/loader.svg";
import Task from '../Task/Task'

const Tasks = () => {

      const { isLoading, error, data } = useQuery({
        queryKey: ["tasks"],
        queryFn: () => Axios.get(requests.tasks).then((res) => res.data),
      });      
      //console.log(data);
    
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
        <Task users={data}/>
        </div>
    </div>
    </>
      )}
      </>
  )
}

export default Tasks
