import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import PaginationControls from "../PaginationControls/PaginationControls";
import FloatingWhatsApp from "../../components/FloatingWhatsApp/FloatingWhatsApp";
import Sidebar from "../Sidebar/Sidebar";
import Task from "../Task/Task";
import loader from "../../assets/icons/loader.svg"; 
import useAuthStore from "../../stores";

const MyTasks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page") || "1");
  const initialLimit = parseInt(query.get("per_page") || "5");

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const { authUser } = useAuthStore();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get("page") || "1");
    const perPage = parseInt(query.get("per_page") || "5");
    setCurrentPage(page);
    setLimit(perPage);
  }, [location.search]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["tasks", currentPage, limit],
    queryFn: () => {
      return Axios.get(`https://testing-backend-azure.vercel.app/api/task/assigned/${authUser._id}?page=${currentPage}&limit=${limit}`).then((res) => res.data);
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
    <div className="flex max-lg:flex-col">
      <Sidebar /> {/* Sidebar is always rendered */}
      <div className="flex-1">
        <FloatingWhatsApp />
        {isLoading ? (
          <div className="flex items-center justify-center w-full mt-28">
            <img src={loader} alt="Loading..." className="w-[40px]" />
          </div>
        ) : error ? (
          error.response?.status === 404 ? ( // Handle 404 error
            <p className="text-xl md:text-2xl text-gray-500 font-normal text-center mt-10">
              No task is assigned to you.
            </p>
          ) : (
            <p className="text-xl md:text-2xl text-red-400 font-normal text-center mt-10">
              Error: Something went wrong
            </p>
          )
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default MyTasks;
