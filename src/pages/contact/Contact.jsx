import React, { useState, useEffect } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  // Fetch data automatically when the page is refreshed
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://testing-backend-azure.vercel.app/api/task");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        console.log("API Result:", result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only on initial render

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };



  return (
    <section className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-500 py-24 text-white h-[50%]">
        <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center">
          {/* Text Content */}
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Get in Touch with Us
            </h1>
            <p className="text-lg mb-8">
              Whether you have a question, feedback, or need assistance, we’re
              here to help! Reach out to us anytime, and we'll respond as
              quickly as possible.
            </p>
            <a
              href="#contact-form"
              className="bg-white text-blue-600 py-3 px-8 rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
            >
              Contact Us Now
            </a>
          </div>

          {/* SVG Illustration */}
          <div className="lg:w-1/2 mb-10 lg:mb-0 opacity-25">
            <img
              src="../../Contact.webp"
              alt="Contact Illustration"
              className="w-full"
            />
          </div>
        </div>

        {/* Decorative Background */}
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 800 600"
        >
          <circle cx="200" cy="400" r="300" fill="white" />
          <circle cx="600" cy="200" r="200" fill="#4f46e5" />
        </svg>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div id="contact-form" className="bg-white shadow-lg rounded-lg p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                  placeholder="Enter your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                  placeholder="Enter your phone number"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                  placeholder="Write your message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-3 px-8 rounded-lg shadow-md hover:opacity-90 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-12">
            {/* Contact Item */}
            <div className="flex items-start">
              <div className="bg-indigo-100 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h11M9 21V9a4 4 0 014-4h6M9 3h3m4 8h1m-1 0v1m-1 0a3 3 0 11-6 0V4m-1 0a4 4 0 104 4"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Office Address
                </h3>
                <p className="text-gray-600">
                  K Hamri Headquarters, Main Boulevard, Lahore, Pakistan
                </p>
              </div>
            </div>

            {/* Contact Item */}
            <div className="flex items-start">
              <div className="bg-indigo-100 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7 7m0 0l7-7m-7 7V3"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
                <p className="text-gray-600">+92 123 456 789</p>
              </div>
            </div>

            {/* Contact Item */}
            <div className="flex items-start">
              <div className="bg-indigo-100 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h11M9 21V9a4 4 0 014-4h6M9 3h3m4 8h1m-1 0v1m-1 0a3 3 0 11-6 0V4m-1 0a4 4 0 104 4"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">support@khamri.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
