import React from "react";
import LayoutCell from "./LayoutCell";
import LayoutGrid from "./LayoutGrid";

function LayoutCol() {
  return (
    <div className="layout-col">
      <LayoutCell />
      <LayoutGrid />
    </div>
  );
}

export default LayoutCol;
