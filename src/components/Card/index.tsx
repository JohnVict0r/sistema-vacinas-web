import React from "react";

import "./index.less";

import DateIcon from "../../assets/icons/data.svg";
import LocationIcon from "../../assets/icons/local.svg";

interface CardProps {
  name: string;
  date?: any;
  location?: any;
}

const Card: React.FC<CardProps> = ({ date, location, name }) => {
  return (
    <div className="card-container">
      <p id="vacinne-title">
        {name.length > 40 ? `${name.slice(0, 40)}...` : name}
      </p>
      <p>
        <img src={DateIcon} alt="Data de vacinação"></img>
        {date}
      </p>
      <p>
        <img src={LocationIcon} alt="Data de vacinação"></img>
        {location === " " ? "Sem localização" : location}
      </p>
    </div>
  );
};

export default Card;
