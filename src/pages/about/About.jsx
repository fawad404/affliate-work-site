import React from "react";

export default function About() {
  return (
    <section className="bg-gray-100 mt-32">
      {/* Hero Section */}
      <div className="relative bg-active text-white">
        <div className="container mx-auto px-6 py-16 lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-extrabold mb-4 font-serif">
              Welcome to Our ExpertSync
            </h1>
            <p className="text-lg mb-6">
              Empowering individuals to earn, grow, and succeed by working on
              exciting projects tailored to their skills.
            </p>
            <button className="bg-white text-active font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition">
              Get Started Today
            </button>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3616/3616675.png"
              alt="Earn and Grow"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Why Choose Our Website?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cashback Section */}
      <div className="relative bg-gray-800 text-white py-16">
        <div className="absolute inset-0 bg-opacity-70 bg-gradient-to-r from-active via-purple-600 to-pink-500"></div>
        <div className="relative container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">
            Get Cashback on Your First Login
          </h2>
          <p className="text-lg mb-8">
            Join Our Website today and enjoy exclusive cashback rewards when you
            log in for the first time. Start your journey towards success now!
          </p>
          <button className="bg-white text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition">
            Join Now
          </button>
        </div>
      </div>
    </section>
  );
};

// Features Array
const features = [
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2910/2910761.png",
    title: "Earn from Projects",
    description: "Get projects based on your skills and start earning.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/3750/3750951.png",
    title: "Cashback Reward",
    description: "Receive exclusive cashback on your first login.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/4252/4252860.png",
    title: "Collaborative Environment",
    description:
      "Work alongside talented professionals to achieve your goals.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2662/2662427.png",
    title: "Skill Growth",
    description:
      "Enhance your skills with real-world projects and challenges.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/4761/4761641.png",
    title: "Flexible Work",
    description: "Work on your own schedule with no restrictions.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
    title: "Support 24/7",
    description: "Our team is here to help you whenever you need us.",
  },
];


