import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="text-center">
        {/* Background image */}
        <div
          className="bg-cover bg-center h-96 w-full mb-8"
          style={{
            backgroundImage:
              "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
          }}
        >
          <h1 className="text-6xl font-bold text-center text-black">Oops!</h1>
        </div>

        {/* Content */}
        <div className="mt-[-40px]">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
            Look like you're lost
          </h2>
          <p className="text-gray-600 mb-6">
            The page you are looking for is not available!
          </p>
          <Link
            to="/"
            className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-primary transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
