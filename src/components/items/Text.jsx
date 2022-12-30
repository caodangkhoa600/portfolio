import React from "react";
import { Rnd } from "react-rnd";
import { DefaultItemData, ItemTypes } from "../../constants";
import useItemContext from "../../contexts/ItemContext";
import usePropertyContext from "../../contexts/PropertyContext";

function Text({ width, height, onPage = false, itemIdx, position, properties }) {
  const { setItems } = useItemContext();
  const { layout, selectedItem, setSelectedItem } = usePropertyContext();

  if (!width) width = layout.cellWidth * 4;
  if (!height) height = layout.cellHeight * 1;

  const style = {
    width,
    height,
    cursor: "pointer",
    ...{ ...DefaultItemData.Text, ...properties },
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
    const newText = {
      type: ItemTypes.Text,
      properties: { ...DefaultItemData.Text },
      position: { x: 0, y: 0 },
      size: { width: 4, height: 1 },
    };
    setItems((prev) => [...prev, newText]);
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
      <p style={style} onMouseDown={handleOnPageClick}>
        {properties.text}
      </p>
    </Rnd>
  ) : (
    <p style={style} onClick={handleClick}>
      This is a text
    </p>
  );
}

export default Text;
