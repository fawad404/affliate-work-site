import React, { useEffect, useMemo, useRef } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { TfiWorld } from "react-icons/tfi";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuthStore from "../../../stores"; // Import useAuthStore
import logo from '../../../assets/images/Exoertsync.jpg'

const MobileSidebar = ({ show, setShow, setLoginModal }) => {
  const variants = {
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    closed: { opacity: 0, x: "-100%", transition: { duration: 0.3 } },
  };
  const showRef = useRef(null);
  const navigate = useNavigate();
  const { authUser, removeAuthUser } = useAuthStore(); // Access authUser and removeAuthUser

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showRef.current && !showRef.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const body = document.querySelector("html");

  const overflowHidden = () => {
    if (show) {
      return (body.style.overflow = "hidden");
    } else {
      return {
        body: {
          one: (body.style.overflowY = "auto"),
          two: (body.style.overflowX = "hidden"),
        },
      };
    }
  };
  useMemo(() => overflowHidden(), [show]);

  return (
    <div
      className={`w-full h-full bg-black/40 fixed top-0 z-40 left-0 transition-all duration-500 ${
        show ? "flex" : "hidden"
      }`}
    >
      <motion.div
        animate={show ? "open" : "closed"}
        variants={variants}
        ref={showRef}
        className={`flex flex-col gap-4 justify-start items-start w-[250px] bg-white absolute top-0 z-20 h-screen p-6 ${
          show ? "left-0" : "-left-[100vw]"
        }`}
      >
        <div className="sticky top-0 z-2 bg-white w-full flex flex-col gap-6 items-start justify-start">
          <a className="inline-block text-lg font-bold mb-5" href="/">
            <img className="h-28 w-28 rounded-2xl" src={logo} alt="Logo" width="auto" />
          </a>
          {!authUser && (
            <>
              <NavLink
                to="/join"
                className={`border py-3 px-6 rounded bg-primary border-primary text-white transition-all duration-300 text-base font-semibold`}
              >
                Join  
              </NavLink>
              <div
                onClick={() => {
                  navigate("/");
                  setShow(false);
                  setLoginModal(true);
                }}
                className="cursor-pointer text-gray-400 text-base font-medium"
              >
                Sign in
              </div>
            </>
          )}
          <NavLink to="/" className="cursor-pointer w-full text-base font-medium text-gray-400">
            Home
          </NavLink>
          <NavLink to="/about" className="cursor-pointer w-full text-base font-medium text-gray-400">
            About
          </NavLink>
          <NavLink to="/contact" className="cursor-pointer w-full text-base font-medium text-gray-400">
            Contact
          </NavLink>
          {authUser && (
            <>
              {authUser?.isVerified ? (
                <>
                  <NavLink to="/dashboard/profile" className="cursor-pointer w-full text-base font-medium text-gray-400">
                    Profile
                  </NavLink>
                  <NavLink to="/dashboard/my-tasks" className="cursor-pointer w-full text-base font-medium text-gray-400">
                    Tasks
                  </NavLink>
                </>
              ) : (
                <NavLink to="/verification" className="cursor-pointer w-full text-base font-medium text-gray-400">
                  Under Verification
                </NavLink>
              )}
            </>
          )}
          <div className="mt-5 border-t w-full flex items-start justify-start flex-col gap-4 pt-3">
            <p className="cursor-pointer text-gray-400 text-base font-medium flex items-center justify-start gap-2">
              English
              <span>
                <TfiWorld />
              </span>
            </p>
            <p className="cursor-pointer text-gray-400 text-base font-medium flex items-center justify-start gap-2">
              <span>
                <BsCurrencyDollar />
              </span>
              USD
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileSidebar;
