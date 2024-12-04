import { useQuery } from "@tanstack/react-query";
import FloatingWhatsApp from "../../components/FloatingWhatsApp/FloatingWhatsApp";
import Sidebar from "../../components/Sidebar/Sidebar";
import TaskDetail from "../taskDetail/TaskDetail";
import requests from '../../libs/request'
import { Axios } from "../../config";
import loader from "../../assets/icons/loader.svg";
import { useParams } from "react-router-dom";

const fetchTaskById = async (id) => {
  console.log(`Fetching task with ID: ${id}`);
  return Axios.get(`${requests.tasks}/${id}`).then((res) => {
    console.log('Fetched task data:', res.data);
    return res.data;
  });
};

const TaskDetails = () => {
  const { id } = useParams(); // Extract the ID from the URL
  console.log(`Task ID from URL: ${id}`);
  const { isLoading, error, data, refetch } = useQuery(
    ["task", id], // Use ID in queryKey
    () => fetchTaskById(id), // Fetch task with the ID
    {
      enabled: !!id, // Ensure query runs only if ID exists
    }
  );

  console.log('Query data:', data);
  console.log('Query error:', error);

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
          <div className="">
            <FloatingWhatsApp />
            <div className="flex max-lg:flex-col">
              {/* Sidebar */}
              <Sidebar />

              {/* Main Content */}
              <div className="flex-1 p-6 bg-white">
                <h1 className="text-2xl font-bold mb-6">Task Details</h1>
                <TaskDetail task={data} refetchTask={refetch} />
              </div>
            </div>
          </div>
        </>
      )}

    </>
  )

}

export default TaskDetails