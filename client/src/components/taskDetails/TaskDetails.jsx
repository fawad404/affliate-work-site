import { useQuery } from "@tanstack/react-query";
import FloatingWhatsApp from "../../components/FloatingWhatsApp/FloatingWhatsApp";
import Sidebar from "../../components/Sidebar/Sidebar";
import TaskDetail from "../taskDetail/TaskDetail";
import requests from '../../libs/request'
import { Axios } from "../../config";
import loader from "../../assets/icons/loader.svg";
import { useParams } from "react-router-dom";

const fetchTaskById = async (id) => {
  // console.log(`Fetching task with ID: ${id}`);
  return Axios.get(`${requests.tasks}/${id}`).then((res) => {
    // console.log('Fetched task data:', res.data);
    return res.data;
  });
};

const fetchSubmittedTaskById = async (id) => {
  // console.log(`Fetching submitted task with ID: ${id}`);
  return Axios.get(`http://localhost:8000/api/submitedTask/${id}`).then((res) => {
    //console.log('Fetched submitted task data:', res.data);
    return res.data;
  });
};

const TaskDetails = () => {
  const { id } = useParams(); // Extract the ID from the URL
  //console.log(`Task ID from URL: ${id}`);
  const { isLoading: isTaskLoading, error: taskError, data: taskData } = useQuery(
    ["task", id], // Use ID in queryKey
    () => fetchTaskById(id), // Fetch task with the ID
    {
      enabled: !!id, // Ensure query runs only if ID exists
    }
  );

  const { isLoading: isSubmittedTaskLoading, error: submittedTaskError, data: submittedTaskData, refetch: refetchSubmittedTask } = useQuery(
    ["submittedTask", id], // Use ID in queryKey
    () => fetchSubmittedTaskById(id), // Fetch submitted task with the ID
    {
      enabled: !!id, // Ensure query runs only if ID exists
    }
  );

  // console.log('Query data:', data);
  // console.log('Query error:', error);

  return (
    <>
      {isTaskLoading || isSubmittedTaskLoading ? (
        <div className="flex items-center justify-center w-full mt-28">
          <img src={loader} alt="/" className="w-[40px]" />
        </div>
      ) : taskError || submittedTaskError ? (
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
                <TaskDetail task={taskData} submittedTask={submittedTaskData ? submittedTaskData : []} refetchSubmittedTask={refetchSubmittedTask} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default TaskDetails;