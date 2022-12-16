import React from "react";

import Others from "./Others";
import Position from "./Position";
import Size from "./Size";

function PropertyCol() {
  const propertyColStyle = {};

  return (
    <div className="property-col" style={propertyColStyle}>
      <Size />
      <Position />
      <Others />
    </div>
  );
}

export default PropertyCol;
