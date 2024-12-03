import { useQuery } from "@tanstack/react-query";
import FloatingWhatsApp from "../../components/FloatingWhatsApp/FloatingWhatsApp";
import Sidebar from "../../components/Sidebar/Sidebar";
import TaskDetail from "../taskDetail/TaskDetail";
import requests from '../../libs/request'
import { Axios } from "../../config";
import loader from "../../assets/icons/loader.svg";
import { useParams } from "react-router-dom";

const fetchTaskById = async (id) => {
  return Axios.get(`${requests.tasks}/${id}`).then((res) => res.data);
};

const TaskDetails = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const { isLoading, error, data, refetch } = useQuery(
    ["task", id], // Use ID in queryKey
    () => fetchTaskById(id), // Fetch task with the ID
    {
      enabled: !!id, // Ensure query runs only if ID exists
    }
  );

  // const { isLoading, error, data } = useQuery({
  //     queryKey: ["tasks"],
  //     queryFn: () => Axios.get(`${requests.tasks}/`).then((res) => res.data),
  //   });   
  console.log(data);

  const task = {
    _id: "6743aae55f741e7d9a629860",
    title: "testing task",
    desc: "testing task desciton",
    assignee: "6734bee9555bc802f59c22e0",
    deadline: "2024-11-15T00:00:00.000Z",
    status: "To Do",
    files: [
      "https://res.cloudinary.com/dksanjzg0/raw/upload/v1732487908/g6yksvar7ys5mxnm8yzh.jpg",
      "https://res.cloudinary.com/dksanjzg0/raw/upload/v1732487908/iyzcbow4pi7vn0smoy5c.jpg",
      "../../../public/general-solutions.docx",
    ],
  };

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