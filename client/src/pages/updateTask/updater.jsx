import FloatingWhatsApp from "../../components/FloatingWhatsApp/FloatingWhatsApp";
import Payoneer from "../../components/Payoneer/Payoneer";
import Sidebar from "../../components/Sidebar/Sidebar";
import UpdateTask from "../../components/UpdateTask/updateTask";


const Updater = () => {

      return (
        <div className="">
            <FloatingWhatsApp />
            <Sidebar />
            <UpdateTask />
             {/* <Payoneer /> */}
            </div>
      
      )

}

export default Updater