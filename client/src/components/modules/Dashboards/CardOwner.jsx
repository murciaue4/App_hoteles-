// OwnerCard.jsx
import React from "react";
import style from "./CardOwner.module.css"; // Asegúrate de importar tu estilo correcto

const OwnerCard = ({ owner }) => {
  return (
    <div className={style.ownerCard}>
      <i>{owner.type || "null"}</i>
      <h3>{owner.name || "null"}</h3>

      <img src={`http://localhost:3333/${owner.img[0] || "/"}`} alt="img" />

      <p>{owner.location || "null"}</p>
    </div>
  );
};

export default OwnerCard;
