import React from "react";
import style from "./cardsInfo.module.css";
import Slider from "./Slider";

const cardsInfo = () => {
  return (
    <div className={style.cardsInfo}>
      <div>
        <Slider/>
      </div>
    </div>
  );
};

export default cardsInfo;
