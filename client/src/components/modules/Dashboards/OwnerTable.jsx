import React from "react";
import editIcon from "../../../static/editIcon-02.svg";
import deleteIcon from "../../../static/deleteIcon2.sg-14.svg";

const OwnersTable = ({ owners }) => {
  return (
    <table className="w-full rounded-lg">
      <thead className=" ">
        <tr>
          <th>Id</th>
          <th>Type</th>
          <th>Name</th>
          <th>Location</th>
          <th>Capacidad</th>
          <th>Precio</th>
          
        </tr>
      </thead>
      <tbody>
        {owners.map((owner, index) => (
          <tr key={index} className=" cursor-pointer border border-zinc-300 bg-white font-medium hover:bg-slate-50">
            <td>{owner.id || "null"}</td>
            <td>{owner.type || "null"}</td>
            <td>{owner.name || "null"}</td>
            <td>{owner.location || "null"}</td>
            <td>{owner.capacity || "null"}</td>
            <td>{`$ ${owner.precio_por_habitacion}` || "null"}</td>
            <td className="hover:bg-green-500">
              {(
                  <button className="h-8 w-8  ">
                  <img src={editIcon} alt="" /> 
                </button>
              ) || "null"}
            </td>
              <td className="hover:bg-red-500">{(
                  <button className="h-8 w-8 ">
                  <img src={deleteIcon} alt="" />
                </button>
              ) || "null"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OwnersTable;
