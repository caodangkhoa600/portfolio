import React from "react";
import Draggable from "react-draggable";
import { DefaultItemData, ItemTypes } from "../../constants";
import useItemContext from "../../contexts/ItemContext";
import usePropertyContext from "../../contexts/PropertyContext";

function Block({ width, height, onPage = false, itemIdx, position, properties }) {
  const { setItems } = useItemContext();
  const { layout, selectedItem, setSelectedItem } = usePropertyContext();

  if (!width) width = layout.cellWidth * 4;
  if (!height) height = layout.cellHeight * 2;

  const style = {
    width,
    height,
    cursor: "pointer",
    ...{ ...DefaultItemData.Block, ...properties },
  };

  const dragStyle = {
    ...style,
    cursor: "move",
    position: "absolute",
    top: position?.y * layout.cellHeight || 0,
    left: position?.x * layout.cellWidth || 0,
  };

  const selectedStyle = {
    boxShadow: `0 0 15px green`,
  };

  const dragHandlers = {};

  const handleClick = () => {
    const newBlock = {
      type: ItemTypes.Block,
      properties: { ...DefaultItemData.Block },
      position: { x: 0, y: 0 },
      size: { width: 4, height: 2 },
    };
    setItems((prev) => {
      const newArray = JSON.parse(JSON.stringify(prev));
      newArray.push(newBlock);
      return newArray;
    });
  };

  const handleOnPageClick = () => {
    setSelectedItem(itemIdx);
  };

  const handleDrag = (e, ui) => {
    setItems((prev) => {
      prev[itemIdx].position = {
        x: position.x + ui.x / layout.cellWidth,
        y: position.y + ui.y / layout.cellHeight,
      };
      return prev;
    });
  };

  return onPage ? (
    <Draggable
      bounds="parent"
      grid={[layout.cellWidth, layout.cellHeight]}
      {...dragHandlers}
      onDrag={handleDrag}
    >
      <div
        className="block"
        style={{ ...dragStyle, ...(itemIdx === selectedItem ? selectedStyle : {}) }}
        onClick={handleOnPageClick}
      />
    </Draggable>
  ) : (
    <div className="block" style={style} onClick={handleClick} />
  );
}

export default Block;
