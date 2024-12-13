import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import FloatingWhatsApp from '../../components/FloatingWhatsApp/FloatingWhatsApp';
import User from '../../components/User/User';
import { Axios } from '../../config';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import PaginationControls from '../../components/PaginationControls/PaginationControls';
import loader from "../../assets/icons/loader.svg";

const Users = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get('page') || '1');
  const initialLimit = parseInt(query.get('per_page') || '5');

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1');
    const perPage = parseInt(query.get('per_page') || '5');
    setCurrentPage(page);
    setLimit(perPage);
  }, [location.search]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["users", currentPage, limit],
    queryFn: () => {
      return Axios.get(`https://testing-backend-azure.vercel.app/api/user?page=${currentPage}&limit=${limit}`).then((res) => res.data);
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
          <img src={loader} alt="/" className="w-[40px]" />
        </div>
      ) : error ? (
        <p className="text-xl md:text-2xl text-red-400 font-normal">
          Error : Something went wrong
        </p>
      ) : (
        <>
          <div className='flex max-lg:flex-col'>
            <Sidebar />
            <div className='flex-1'>
              <FloatingWhatsApp />
              <div className='flex flex-col'>

              <User users={data.users} />
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
        </>
      )}
    </>
  );
}

export default Users;
