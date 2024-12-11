import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/homepage/Homepage";
import Orders from "./pages/orders/Orders";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import MyGigs from "./pages/myGigs/MyGigs";
import Add from "./pages/add/Add";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Success from "./pages/success/Success";
import Pay from "./pages/pay/Pay";
import Admin from "./pages/admin/Admin";
import Users from "./pages/users/Users";
// import Update from "./components/Update/Update";
import useAuthStore from "./stores";
import NotFound from "./components/NotFound/NotFound";
import Tasks from "./components/tasks/Tasks";
import TaskDetails from "./components/taskDetails/TaskDetails";
import Updater from "./pages/updateTask/updater";
import UserDetails from "./components/userdetails/userdetails";
import Profile from "./pages/Profile/Profile";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import MyTasks from "./components/myTasks/MyTasks";


const App = () => {
  const location = useLocation(); // Get the current route
  const { authUser, removeAuthUser } = useAuthStore();

  return (
    <div>
      {/* Render Navbar and Footer only if we're NOT on an /admin route */}
      {!location.pathname.startsWith("/dashboard") && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/join" element={<Register />} />
        {authUser && (
          <>
                  <Route path="/dashboard" element={authUser.isAdmin ? <Admin /> : <NotFound />} />
                  <Route path="/dashboard/Profile"  element={authUser.isVerified? <Profile /> : <NotFound />} />  
                  <Route path="/dashboard/users" element={authUser.isAdmin ? <Users /> : <NotFound />} />
                  <Route path="/dashboard/tasks" element={authUser.isVerified ? <Tasks /> : <NotFound />} />
                  <Route path="/dashboard/tasks/:id" element={authUser.isVerified ? <TaskDetails /> : <NotFound />} />
                  <Route path="/dashboard/user/:id" element={authUser.isAdmin ? <UserDetails /> : <NotFound />} />
                  <Route path="/dashboard/my-tasks" element={authUser.isVerified ? <MyTasks /> : <NotFound />} />
                  {/* <Route path="/dashboard/update-user/:id" element={authUser.isAdmin ? <Update /> : <NotFound />} /> */}
                  <Route path="/dashboard/create-task" element={authUser.isAdmin ? <Admin /> : <NotFound />} />
                  <Route path="/dashboard/update-task/:id" element={authUser.isAdmin ? <Updater /> : <NotFound />} />
          </>
        )}
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/about" element={<About />} />
        <Route path="/gigs/:id" element={<Gig />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/myGigs" element={<MyGigs />} />
        <Route path="/add" element={<Add />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messages/:id" element={<Message />} />
        <Route path="/pay/:id" element={<Pay />} />
        <Route path="/success" element={<Success />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* Render Footer only if we're NOT on an /admin route */}
      {!location.pathname.startsWith("/dashboard") && <Footer />}
    </div>
  );
};

export default App;
