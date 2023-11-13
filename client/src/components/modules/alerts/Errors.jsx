import React from 'react';

const Errors = ({ error }) => {
  return (
    <div className='absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-white border border-gray-500 shadow-md h-16 text-red-500 font-bold'>
      <p >{`${error.message}`}</p>
    </div>
  );
};

export default Errors;