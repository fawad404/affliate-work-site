import React, { useState, useEffect, useRef } from "react";
import { TfiWorld } from "react-icons/tfi";
import { BsCurrencyDollar } from "react-icons/bs";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Login from "../../pages/login/Login";
import useAuthStore from "../../stores";
import Avatar from "../../assets/icons/avatar.jpg";
import { toast } from "react-toastify";
import { Axios } from "../../config";
import requests from "../../libs/request";
import { FiChevronRight } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import MobileSidebar from "./MobileSidebar/MobileSidebar";

const Navbar = () => {
  const navigate = useNavigate();
  const { authUser, removeAuthUser } = useAuthStore();
  const [active, setActive] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [showMegaDropdown, setShowMegaDropdown] = useState(false);
  const [projectIndex, setProjectIndex] = useState(0);
  const [isVibrating, setIsVibrating] = useState(false);
  const megaDropdownRef = useRef(null); // Add this ref
  const [notificationCount, setNotificationCount] = useState(0);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const { pathname } = useLocation();
  const [loginModal, setLoginModal] = useState(false);
  const modalRef = useRef(null);

  const projects = [
    "Technical Documentation",
    "Text to PPT Conversion",
    "User Guide Creation",
    "Blog Content Writing",
    "SEO Optimization Tasks",
    "Editing and Proofreading",
    "Data Entry Task",
    "Content Review",
    "Product Descriptions",
    "User Guide Creation",
    "Blog Content Writing",
    "SEO Optimization Tasks",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (megaDropdownRef.current && !megaDropdownRef.current.contains(event.target)) {
        setShowMegaDropdown(false); // Close the mega dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Set up project cycling and notification
  useEffect(() => {
    const cycleProjects = setInterval(() => {
      setProjectIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % projects.length;
        
        // Update notification count, resetting to 1 after reaching 9
        setNotificationCount((prevCount) => (prevCount < 9 ? prevCount + 1 : 1));
        
        // Add the next project to the dropdown list
        setDisplayedProjects((prevDisplayed) => {
          const updatedProjects = [...prevDisplayed, projects[nextIndex]];
          return updatedProjects.slice(-9); // Keep only the last 9 projects
        });
        
        return nextIndex;
      });
    }, 4000); // 2-second interval

    return () => clearInterval(cycleProjects);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenDrop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const backgroundChange = () => {
      window.scrollY > 0 ? setActive(true) : setActive(false);
    };
    window.addEventListener("scroll", backgroundChange);
    return () => {
      window.removeEventListener("scroll", backgroundChange);
    };
  }, []);

  const addNotification = (project) => {
    setNotificationCount((prevCount) => prevCount + 1);
    setDisplayedProjects((prevProjects) => [...prevProjects, project]);

    // Trigger vibration
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 500); // Remove vibration after 0.5s
  };


  const handleLogout = async () => {
    try {
      await Axios.post("https://testing-backend-azure.vercel.app/api/auth/logout");
      removeAuthUser();
      toast.success("Logout Successfully", {
        position: "bottom-right",
        toastId: 1,
        autoClose: 1000,
      });
      navigate("/");
    } catch (error) {
     toast.error(error?.response?.data || "Something went wrong", {
        position: "bottom-right",
        toastId: 1,
        autoClose: 1000,
      });
    }
  };

  const slideRight = () => {
    let slider = document.getElementById("navSlider");
    let maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    if (slider.scrollLeft < maxScrollLeft) {
      slider.scrollLeft = slider.scrollLeft + 400;
    } else {
      slider.scrollLeft = 0;
    }
  };

  return (
    <header
      className={`flex items-center justify-center w-full flex-col text-white fixed top-0 transition-all ease-in-out z-20 ${
        active || pathname !== "/" ? "bg-white !text-darkColor" : ""
      }`}
    >
      <div className="contain">
        <div className="w-full flex items-center justify-between py-4 relative">
          <MobileSidebar
            show={showLink}
            setShow={setShowLink}
            setLoginModal={setLoginModal}
          />
          <div className="flex items-center gap-2 h-full justify-between w-[50%] sm:w-fit">
            <span onClick={() => setShowLink(true)} className="lg:hidden mt-1">
              <FaBars size={25} />
            </span>
            <Link
              to="/"
              className="text-4xl select-none font-black tracking-tighter"
            >
              <span>fiverr</span>
              <span className="text-primary">.</span>
            </Link>
          </div>

          {/* Navbar */}
          <nav className="flex items-center justify-end gap-7 font-medium text-base">
            
            {/* Fiverr Business Link with Mega Dropdown */}
            <div className="relative hidden lg:block"> {/* Hidden on mobile */}
              <Link
                to="/"
                className="cursor-pointer"
                onMouseEnter={() => setShowMegaDropdown(true)}
                
              >
                Jobs Posted
                {notificationCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white rounded-full px-3 text-md">
                    {notificationCount}
                  </span>
                )}
              </Link>
              <div
               ref={megaDropdownRef} // Attach ref here to the dropdown
                className={`absolute top-full mt-2 p-4 bg-white border rounded-md shadow-lg w-64 transition-opacity duration-700 ${
                  showMegaDropdown ? "opacity-100" : "opacity-0"
                }`}
              >
                <ul>
                {displayedProjects.map((project, index) => (
                  <li 
                    key={index} 
                    className={`text-sm text-gray-700 py-1 px-2 ${index % 2 != 0 ? 'bg-gray-100' : ''} hover:bg-gray-200 cursor-pointer`}
                  >
                    {project}
                  </li>
                ))}

                </ul>
              </div>
            </div>

            {/* Other Navbar Links */}
            <a href="/about"><div className="cursor-pointer hidden lg:flex">About</div></a>
          <a href="/contact">
            <div className="items-center gap-2 cursor-pointer hidden lg:flex">
              Contact
            </div>
          </a>
            <span className="hidden lg:flex items-center gap-2 cursor-pointer">
              <span><BsCurrencyDollar /></span> USD
            </span>
            {!authUser?.isSeller && <p className="cursor-pointer hidden lg:flex">Become a Seller</p>}

            {/* User Profile Dropdown */}
            {authUser ? (
              <div
                className="relative flex flex-col sm:flex-row items-center sm:gap-4 cursor-pointer"
                onClick={() => setOpenDrop((prev) => !prev)}
              >
                <img
                  src={authUser.img || Avatar}
                  alt="user_image"
                  className="w-[32px] h-[32px] rounded-[50%] object-cover"
                />
                <span>{authUser?.username}</span>
                <div
                  ref={modalRef}
                  className={`absolute top-12 right-0 p-3 z-10 bg-white border rounded-md text-black flex-col items-start gap-3 w-[200px] font-medium transition-transform duration-300 ${
                    openDrop ? "flex" : "hidden"
                  }`}
                >

                  {authUser?.isVerified ? (
                    <>
                      <NavLink to="/dashboard/profile" className="cursor-pointer w-full text-sm text-darkColor">
                        Profile
                      </NavLink>
                      <NavLink to="/dashboard/my-tasks" className="cursor-pointer w-full text-sm text-darkColor">
                        Tasks
                      </NavLink>
                    </>
                  ) : (
                    <>
                    <NavLink to="/verification" className="cursor-pointer w-full text-sm text-darkColor">
                        Under Verification
                      </NavLink>
                    </>
                  )}
                  <div onClick={handleLogout} className="cursor-pointer w-full text-sm text-darkColor">
                    Logout
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div
                  onClick={() => {
                    navigate("/");
                    setLoginModal(true);
                  }}
                  className="cursor-pointer hidden sm:flex"
                >
                  Sign in
                </div>
                <NavLink
                  to="/join"
                  className={`border py-2 px-5 rounded hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 text-sm font-semibold ${
                    active ? "text-primary border-primary" : ""
                  }`}
                >
                  Join
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </div>
      
      <Login show={loginModal} setShow={setLoginModal} />
    </header>
  );
};

export default Navbar;

