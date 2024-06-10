import React from "react";

const Alert = ({ AlertString }) => {
  return (
    <div class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 border border-gray-500 shadow-md h-screen  font-bold z-50">
      <div class="relative max-w-md mx-auto p-4 border-4 border-red-400 rounded-xl  bg-white">
        <p className="text-center">{`${AlertString}`}</p>
      </div>
    </div>
  );
};

export default Alert;
