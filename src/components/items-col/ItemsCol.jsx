import React from "react";
import Block from "../items/Block";
import Image from "../items/Image";

function ItemsCol() {
  const itemsColStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  };

  const guideStyle = {
    fontStyle: "italic",
    color: "#aaa",
  };

  return (
    <div className="items-col" style={itemsColStyle}>
      <span className="item-col_guide" style={guideStyle}>
        *Click to add
      </span>

      <Block />
      <Image />
    </div>
  );
}

export default ItemsCol;
