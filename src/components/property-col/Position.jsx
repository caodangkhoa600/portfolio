import React from "react";

import useItemContext from "../../contexts/ItemContext";
import usePropertyContext from "../../contexts/PropertyContext";

function Position() {
  const { selectedItem, layout } = usePropertyContext();
  const { items, setItems } = useItemContext();

  console.log("hi");

  const row = items[selectedItem]?.position.x ?? -1;
  const col = items[selectedItem]?.position.y ?? -1;

  const positionStyle = {
    margin: "10px 0px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const labelStyle = {
    marginRight: 8,
  };

  const inputStyle = {
    width: 60,
    margin: "0px 4px",
    padding: "4px 8px",
  };

  const handleOnRowInput = (e) => {
    const rowVal = e.target.value;
    setItems((prev) => {
      prev[selectedItem].position.x = +rowVal;
      return prev;
    });
  };

  const handleOnColInput = (e) => {
    const colVal = e.target.value;
    setItems((prev) => {
      prev[selectedItem].position.y = +colVal;
      return prev;
    });
  };

  return (
    <div className="property__position" style={positionStyle}>
      <label htmlFor="position-row" style={labelStyle}>
        Position:
      </label>
      <div>
        <input
          type="number"
          id="position-row"
          name="position-row"
          min={0}
          max={layout.numberOfRows - (items[selectedItem]?.size.x || 0)}
          value={row}
          style={inputStyle}
          onInput={handleOnRowInput}
        />
        <input
          type="number"
          id="position-col"
          name="position-col"
          min={0}
          max={layout.numberOfColumns - (items[selectedItem]?.size.y || 0)}
          value={col}
          style={inputStyle}
          onInput={handleOnColInput}
        />
      </div>
    </div>
  );
}

export default Position;
