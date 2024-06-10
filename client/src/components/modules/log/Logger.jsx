
import FormLogin from "./FormLogin";
import Form01 from "./Form01";
import { useState } from "react";
import imgOffice from "../../../static/Office_new-01.svg";

const Logger = () => {
  const [showForm01, setShowForm01] = useState(false);
  const handleSetShowForm01 = () => {
    setShowForm01(!showForm01);
  };
  return (
    <div className="flex justify-center w-full">
      <div
        className={` min-h-[450px] max-h-auto w-full lg:w-[full] flex justify-center rounded-lg   my-10  `}
      >
        <div className=" hidden md:flex justify-center items-center w-[500px] bg-gray-800  bg-cover bg-no-repeat rounded-l-lg ">
          <img className="" src={imgOffice} alt="" />
        </div>
        <div className=" w-[300px] flex justify-center items-center bg-white lg:rounded-r-lg max-lg:rounded-lg shadow-lg border ">
          {!showForm01 ? (
            <FormLogin handleSetShowForm01={handleSetShowForm01} />
          ) : (
            <Form01 handleSetShowForm01={handleSetShowForm01} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Logger;
