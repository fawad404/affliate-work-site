import React, { useState } from "react";

const QuoteCard = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full text-center">
                {/* Heading */}
                <h2 className="text-3xl  font-bold text-[#e6332b] mb-8">
                    Sign Up! 
                    <span className=" text-[#181a22]"> For Limited Time Rewards</span>
                </h2>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    />
                    <textarea
                        name="message"
                        placeholder="Message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    ></textarea>

                    {/* Button */}
                    <button type="submit" className="bg-red-500 text-white py-2 px-6 rounded-full border-2 border-red-500 hover:bg-red-600 relative transition-transform transform hover:scale-105">
                        <span className="relative z-10">Contact Us</span>
                        <span className="absolute inset-0 rounded-full border-2 border-white -left-1 -top-1"></span>
                    </button>
                </form>
            </div>
        </div>
    );
};

const Contact = () => {
    return (
        <div className="bg-white py-16 overflow-hidden relative mt-16 max-md:mt-8 min-h-screen flex flex-col justify-center">
            {/* First Row - Static and Tilted */}
            <div className="whitespace-nowrap flex justify-center space-x-16 text-gray-300 uppercase text-3xl font-bold tracking-wider transform rotate-[-1.5deg]">
                {Array(6).fill("Contact").map((text, index) => (
                    <span key={index} className="flex items-center">
                        {text} <span className="mx-4">•</span>
                    </span>
                ))}
            </div>

            {/* Second Row - Scrolling and Tilted */}
            <div className="whitespace-nowrap relative transform rotate-[-1.5deg] my-8">
                <div className="flex justify-center">
                    <div className="w-screen bg-[#181a22] py-4 overflow-hidden">
                        <div className="animate-marquee whitespace-nowrap flex space-x-16 text-white uppercase text-4xl font-bold tracking-wider">
                            {Array(6).fill("Signup For Bonus").map((text, index) => (
                                <span key={index} className="flex items-center">
                                    {text} <span className="mx-4">•</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Third Row - Static and Tilted */}
            <div className="whitespace-nowrap flex justify-center space-x-20 text-gray-300 uppercase text-3xl font-bold tracking-wider transform rotate-[-1.5deg]">
                {Array(6).fill("Contact").map((text, index) => (
                    <span key={index} className="flex items-center">
                        {text} <span className="mx-4">•</span>
                    </span>
                ))}
            </div>

            {/* Quote Card in the Center */}
            <QuoteCard />
        </div>
    );
};

export default Contact;