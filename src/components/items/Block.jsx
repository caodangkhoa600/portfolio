import React from "react";
import Draggable from "react-draggable";
import { Rnd } from "react-rnd";
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
        x: position?.x + ui.x / layout.cellWidth,
        y: position?.y + ui.y / layout.cellHeight,
      };
      return prev;
    });
  };

  const handleResize = (e, uie, direction, ref, delta, position) => {
    setItems((prev) => {
      prev[itemIdx].size = {
        x: width / layout.cellWidth + (ref.width) / layout.cellWidth,
        y: height / layout.cellHeight +(ref.height) / layout.cellHeight,
      };
      return prev;
    });
  }

  return onPage ? (
    <Rnd
      bounds="parent"
      style={{ ...dragStyle, ...(itemIdx === selectedItem ? selectedStyle : {}) }}
      onDragStop={handleDrag}
      onResizeStop={handleResize}
      >
      <div
        style={style} onClick={handleOnPageClick}
      />
    </Rnd>
  ) : (
    <div className="block" style={style} onClick={handleClick} />
  );
}

export default Block;
