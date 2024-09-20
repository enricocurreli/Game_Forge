import React from "react";
import "./Card.css";
import Img from "../Img/Img";
import Title from "../Title/Title";

const Card = ({ children }) => {
  return (
    <div className="card_cstm bg-base-100">
      {children}
    </div>

  );
};

Card.Title = Title;
Card.Img = Img;
export default Card;

