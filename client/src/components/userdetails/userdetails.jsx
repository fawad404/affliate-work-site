import { useQuery } from "@tanstack/react-query";
import FloatingWhatsApp from "../FloatingWhatsApp/FloatingWhatsApp";
import Sidebar from "../Sidebar/Sidebar";
import requests from '../../libs/request'
import { Axios } from "../../config";
import loader from "../../assets/icons/loader.svg";
import { useParams } from "react-router-dom";
import UserDetail from "../../components/userdetail/userdetail"


const fetchUserById = async (id) => {
    return Axios.get(`http://localhost:8000/api/user/${id}`).then((res) => res.data);
};

const UserDetails = () => {
    const { id } = useParams(); // Extract the ID from the URL
    
    const { isLoading, error, data } = useQuery(
        ["user", id], // Use ID in queryKey
        () => fetchUserById(id), // Fetch user with the ID
        {
            enabled: !!id, // Ensure query runs only if ID exists
        }
    );
   
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
                <div className="relative">
                    <FloatingWhatsApp />
                    <div className="flex max-lg:flex-col">
                        {/* Sidebar */}
                        <Sidebar />
                        {/* Ensure data is passed correctly */}
                        <div className="flex-1">
                            <UserDetail data={data} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserDetails;

