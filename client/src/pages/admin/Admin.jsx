import AddTask from "../../components/AddTask/AddTask";
import FloatingWhatsApp from "../../components/FloatingWhatsApp/FloatingWhatsApp";
import Payoneer from "../../components/Payoneer/Payoneer";
import Sidebar from "../../components/Sidebar/Sidebar";
import useAuthStore from "../../stores";

const Admin = () => {
    const { authUser,removeAuthUser  } = useAuthStore();

    return (
        <div className="">
            <FloatingWhatsApp />
            <Sidebar />
            {authUser?.isAdmin === true ? (
                <AddTask />
             ) : (
             <p>You do not have permission to create tasks.</p>
            )}
            {/* <Payoneer /> */}
        </div>
    );
}

export default Admin;