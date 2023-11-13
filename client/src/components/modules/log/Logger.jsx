import style from "./Logger.module.css";
import FormLogin from "./FormLogin";
import Form01 from "./Form01";
import CardsInfo from "../others/cardsInfo";
import { useState } from "react";

const Logger = () => {
  const [showForm01, setShowForm01] = useState(false)
  const handleSetShowForm01 = (value) => {
    setShowForm01(value)
  }
  return (
    <div>
      <div className={`${style.logger}`}>
        <div className={`${style.izq} `}>
          <CardsInfo/>
        </div>
        <div className={`${style.der}`}>
          {!showForm01 ? <FormLogin handleSetShowForm01={handleSetShowForm01} /> : <Form01 handleSetShowForm01={handleSetShowForm01}/> }
        </div>
      </div>
    </div>
  );
};

export default Logger;
