import React from "react";

import useItemContext from "../../contexts/ItemContext";
import usePropertyContext from "../../contexts/PropertyContext";

function Size() {
  const { showingItem, setShowingItem, layout } = usePropertyContext();
  const { setItems } = useItemContext();

  const row = showingItem?.size[0];
  const col = showingItem?.size[1];

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
    width: 60,
    margin: "0px 4px",
    padding: "4px 8px",
  };

  const handleOnRowInput = (e) => {
    const rowVal = e.target.value;
    setShowingItem((prev) => ({ ...prev, size: [+rowVal, prev.size[1]] }));
    setItems((prev) =>
      prev.map((ele) => {
        if (ele.id === showingItem.id) {
          ele.size = [+rowVal, ele.size[1]];
        }
        return ele;
      })
    );
  };

  const handleOnColInput = (e) => {
    const colVal = e.target.value;
    setShowingItem((prev) => ({ ...prev, size: [prev.size[0], +colVal] }));
    setItems((prev) =>
      prev.map((ele) => {
        if (ele.id === showingItem.id) {
          ele.size = [ele.size[0], +colVal];
        }
        return ele;
      })
    );
  };

  return (
    showingItem && (
      <div style={style}>
        <label htmlFor="size-row" style={labelStyle}>
          Size:
        </label>
        <div>
          <input
            type="number"
            id="size-row"
            min={1}
            max={layout.numberOfRows}
            name="size-row"
            value={row}
            style={inputStyle}
            onInput={handleOnRowInput}
          />
          <input
            type="number"
            id="size-col"
            name="size-col"
            min={1}
            max={layout.numberOfColumns}
            value={col}
            style={inputStyle}
            onInput={handleOnColInput}
          />
        </div>
      </div>
    )
  );
}

export default Size;
