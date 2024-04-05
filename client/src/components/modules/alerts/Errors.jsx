import React from "react";

const Errors = ({ error }) => {
  return (
    <div class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 border border-gray-500 shadow-md h-screen text-red-500 font-bold z-50 overflow-hidden">
      <div class="relative max-w-md mx-auto p-4">
        <p class="text-center">{`${error.body}`}</p>
      </div>
    </div>
  );
};

export default Errors;
