import React from "react";

export default function FlipButton({ onBuilder, onClick }) {
  return (
    <button className="flip-btn" onClick={onClick} aria-label={onBuilder ? "Flip back to the designer side" : "Flip the coin to see my builder side"}>
      <span className="flip-btn__coin" aria-hidden="true">
        <img src={`/doodles/avatar-${onBuilder ? "designer" : "builder"}.webp`} alt="" />
      </span>
      <span className="flip-btn__text">
        <small>Flip the coin</small>
        {onBuilder ? "Back to the designer" : "Meet the builder side"}
      </span>
    </button>
  );
}
