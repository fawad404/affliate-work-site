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
import Update from "./components/Update/Update";
import useAuthStore from "./stores";
import NotFound from "./components/NotFound/NotFound";

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
                  <Route path="/dashboard" element={authUser.isSeller ? <Admin /> : <NotFound />} />
                  <Route path="/dashboard/users" element={authUser.isAdmin ? <Users /> : <NotFound />} />
                  <Route path="/dashboard/users/:id" element={authUser.isAdmin ? <Update /> : <NotFound />} />
          </>
        )}
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/gigs/:id" element={<Gig />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/myGigs" element={<MyGigs />} />
        <Route path="/add" element={<Add />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messages/:id" element={<Message />} />
        <Route path="/pay/:id" element={<Pay />} />
        <Route path="/success" element={<Success />} />
      </Routes>

      {/* Render Footer only if we're NOT on an /admin route */}
      {!location.pathname.startsWith("/dashboard") && <Footer />}
    </div>
  );
};

export default App;
