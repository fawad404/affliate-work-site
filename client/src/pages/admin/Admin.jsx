import AddTask from "../../components/AddTask/AddTask";
import FloatingWhatsApp from "../../components/FloatingWhatsApp/FloatingWhatsApp";
import Payoneer from "../../components/Payoneer/Payoneer";
import Sidebar from "../../components/Sidebar/Sidebar";


const Admin = () => {

      return (
        <div className="">
            <FloatingWhatsApp />
            <Sidebar />
            <AddTask />
             {/* <Payoneer /> */}
            </div>
      
      )

}

export default Admin