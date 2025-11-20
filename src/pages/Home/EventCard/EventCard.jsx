import React from "react";
import "./EventCard.css";

const EventCard = (props) => {
  return (
    <article className="event-card">
      <div className="event-media">
        <img src={props.image || "./card-image-placeholder.svg"} alt="event" />
        <div className="rating">
          <ion-icon name="flame"></ion-icon>
          {props.rating || "0.0"}
        </div>
      </div>
      <div className="event-body">
        <div className="event-row">
          <h4 className="event-title">{props.title || "Sem nome"}</h4>
          <div className="event-price">{props.price || "Free"}</div>
        </div>
        <div className="event-meta">{props.dateTime}<br /><ion-icon name="location-outline"></ion-icon>Rua Sevilha, Salvador, Bahia</div>
      </div>
    </article>
  );
};

export default EventCard;
