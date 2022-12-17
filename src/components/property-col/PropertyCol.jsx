import React from "react";

import Others from "./Others";
import Position from "./Position";
import Size from "./Size";
import Trash from "./Trash";

function PropertyCol() {
  const propertyColStyle = {
    position: "relative",
    height: "calc(100% - 10px)",
  };

  return (
    <div className="property-col" style={propertyColStyle}>
      <Size />
      <Position />
      <Others />
      <Trash />
    </div>
  );
}

export default PropertyCol;
