import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import PaginationControls from "../PaginationControls/PaginationControls";
import FloatingWhatsApp from '../../components/FloatingWhatsApp/FloatingWhatsApp';
import Sidebar from '../Sidebar/Sidebar';
import Task from '../Task/Task';
import loader from "../../assets/icons/loader.svg";
import useAuthStore from "../../stores";

const Tasks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get('page') || '1');
  const initialLimit = parseInt(query.get('per_page') || '1');

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const { authUser } = useAuthStore();
  const [status, setStatus] = useState(''); // Default to show all tasks

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1');
    const perPage = parseInt(query.get('per_page') || '5');
    setCurrentPage(page);
    setLimit(perPage);
  }, [location.search]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["tasks", currentPage, limit, authUser, status],
    queryFn: () => {
      const endpoint = authUser.isAdmin
        ? `https://testing-backend-azure.vercel.app/api/task?page=${currentPage}&limit=${limit}&status=${status}`
        : `https://testing-backend-azure.vercel.app/api/task/assigned/${authUser._id}${status ? `?status=${status}` : ''}`;
      return Axios.get(endpoint).then((res) => res.data);
    },
    keepPreviousData: true,
  });

  const totalPages = data?.totalPages || 1;

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      navigate(`?page=${newPage}&per_page=${limit}`);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      navigate(`?page=${newPage}&per_page=${limit}`);
    }
  };

  const handlePageChange = (pageNumber) => {
    navigate(`?page=${pageNumber}&per_page=${limit}`);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    navigate(`?page=1&per_page=${newLimit}`);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center w-full mt-28">
          <img src={loader} alt="Loading..." className="w-[40px]" />
        </div>
      ) : error ? (
        <p className="text-xl md:text-2xl text-red-400 font-normal">
          Error: Something went wrong
        </p>
      ) : (
        <div className="flex max-lg:flex-col">
          <Sidebar />
          <div className="flex-1">
            <FloatingWhatsApp />
            <div className='flex flex-col'>
              <div className="flex justify-between items-center mt-10 ml-auto p-2">
                <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
                  <label
                    htmlFor="status"
                    className="text-gray-700 font-medium"
                  >
                    Filter by Status:
                  </label>
                  <select
                    id="status"
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none hover:shadow-sm transition duration-200"
                    value={status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      setStatus(newStatus);
                      navigate(`?page=1&per_page=${limit}&status=${newStatus}`);
                    }}
                  >
                    <option value="" className="text-gray-600">All</option>
                    <option value="To Do" className="text-gray-600">To Do</option>
                    <option value="In Progress" className="text-gray-600">In Progress</option>
                    <option value="In Complete" className="text-gray-600">InComplete</option>
                    <option value="Complete" className="text-gray-600">Complete</option>
                  </select>
                </div>

              </div>
              
                <Task tasks={data?.tasks || []} />
              
              <div className="mt-4">
                <PaginationControls
                  totalPages={totalPages}
                  currentPage={currentPage}
                  perPage={limit}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  onPageChange={handlePageChange}
                  onLimitChange={handleLimitChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tasks;
