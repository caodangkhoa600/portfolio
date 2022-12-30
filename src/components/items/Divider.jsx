import React from "react";
import { Rnd } from "react-rnd";
import { DefaultItemData, ItemTypes } from "../../constants";
import useItemContext from "../../contexts/ItemContext";
import usePropertyContext from "../../contexts/PropertyContext";

function Divider({ width, height, onPage = false, itemIdx, position, properties }) {
  const { setItems } = useItemContext();
  const { layout, selectedItem, setSelectedItem } = usePropertyContext();

  if (!width) width = layout.cellWidth * 4;
  if (!height) height = DefaultItemData.Divider.thick;
  else height = properties?.thick;

  const style = {
    width,
    height,
    cursor: "pointer",
    backgroundColor: properties?.color || DefaultItemData.Divider.color,
  };

  const dragStyle = {
    ...style,
    cursor: "move",
    position: "absolute",
  };

  const selectedStyle = {
    boxShadow: `0 0 15px green`,
  };

  const handleClick = () => {
    const newDivider = {
      type: ItemTypes.Divider,
      properties: { ...DefaultItemData.Divider },
      position: { x: 0, y: 0 },
      size: { width: 4, height },
    };
    setItems((prev) => [...prev, newDivider]);
  };

  const handleOnPageClick = () => {
    setSelectedItem(itemIdx);
  };

  const handleDrag = (e, d) => {
    setItems((prev) => {
      prev[itemIdx].position = {
        x: d.x / layout.cellWidth,
        y: d.y / layout.cellHeight,
      };
      return JSON.parse(JSON.stringify(prev));
    });
  };

  const handleResize = (e, direction, ref, delta, pos) => {
    setItems((prev) => {
      prev[itemIdx].size = {
        width: width / layout.cellWidth + delta.width / layout.cellWidth,
        height: height / layout.cellHeight + delta.height / layout.cellHeight,
      };

      prev[itemIdx].properties.thick = properties.thick + delta.height;

      if (direction.toLowerCase().includes("left")) {
        prev[itemIdx].position.x = position.x - delta.width / layout.cellWidth;
      }

      if (direction.toLowerCase().includes("top")) {
        prev[itemIdx].position.y = position.y - delta.height / layout.cellHeight;
      }

      return JSON.parse(JSON.stringify(prev));
    });
  };

  return onPage ? (
    <Rnd
      style={{ ...dragStyle, ...(itemIdx === selectedItem ? selectedStyle : {}) }}
      onDragStop={handleDrag}
      onResizeStop={handleResize}
      position={{ x: position?.x * layout.cellWidth, y: position?.y * layout.cellHeight }}
    >
      <div className="divider" style={style} onMouseDown={handleOnPageClick} />
    </Rnd>
  ) : (
    <div className="divider" style={style} onClick={handleClick} />
  );
}

export default Divider;
