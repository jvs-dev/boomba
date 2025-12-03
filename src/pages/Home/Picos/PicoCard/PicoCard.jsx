import React from 'react';
import './PicoCard.css';

export default function PicoCard({ image, name, location, rating }) {
  return (
    <article className="pico-card">
      <div className="pico-image" style={{ backgroundImage: `url(${image})` }} />
      <div className="pico-footer">
        <div className="pico-info">
          <div className="pico-name">{name}</div>
          <div className="pico-location">{location}</div>
        </div>
        <div className="pico-rating">
          <span className="star">⭐</span>
          <span className="rating-value">{rating?.toFixed?.(1) ?? rating}</span>
        </div>
      </div>
    </article>
  );
}
