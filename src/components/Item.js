import React from "react";

const Item = ({ id }) => {
  return (
    <div className="item">
      <input className="item-name" placeholder={"Item " + id}></input>
      <input
        className="item-price"
        placeholder="Price"
        inputMode="decimal"
      ></input>
    </div>
  );
};

export default Item;
