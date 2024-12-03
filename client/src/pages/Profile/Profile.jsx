import React from 'react'
import FloatingWhatsApp from '../../components/FloatingWhatsApp/FloatingWhatsApp'
import Sidebar from '../../components/Sidebar/Sidebar'
import ShowProfile from '../../components/ShowProfile/ShowProfile'
import useAuthStore from '../../stores';

const Profile = () => {
    const { authUser } = useAuthStore(); // Get the logged-in user
    console.log(authUser); // Ensure authUser is logged correctly

    return (
        <div className='flex max-lg:flex-col'>
            <FloatingWhatsApp />
            <Sidebar />
            {authUser ? (
                <ShowProfile data={authUser} />
            ) : (
                <p className="text-xl md:text-2xl text-red-400 font-normal">
                    Error : User not found
                </p>
            )}
        </div>
    )
}

export default Profile
