import React from "react";

import useItemContext from "../../contexts/ItemContext";
import usePropertyContext from "../../contexts/PropertyContext";

function Others() {
  const { showingItem, setShowingItem } = usePropertyContext();
  const { setItems } = useItemContext();

  const style = {
    margin: "10px 0px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const labelStyle = {
    marginRight: 8,
  };

  const inputStyle = {
    width: 130,
    margin: "0px 4px",
    padding: "4px 8px",
  };

  const handleOnInput = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    const newData = {
      [property]: isNaN(value) ? value : +value,
    };
    setShowingItem((prev) => ({ ...prev, data: { ...prev.data, ...newData } }));
    setItems((prev) =>
      prev.map((ele) => {
        if (ele.id === showingItem.id) {
          ele.data = { ...ele.data, ...newData };
        }
        return ele;
      })
    );
  };

  return (
    <>
      {showingItem &&
        Object.entries(showingItem.data).map(([property, value]) => {
          return (
            <div key={property} style={style}>
              <label htmlFor={`others-${property}`} style={labelStyle}>
                {property.charAt(0).toUpperCase() + property.slice(1)}:
              </label>
              <input
                id={`others-${property}`}
                type="text"
                name={property}
                value={value || ""}
                style={inputStyle}
                onInput={handleOnInput}
              ></input>
            </div>
          );
        })}
    </>
  );
}

export default Others;
