import React from "react";
import { Rnd } from "react-rnd";
import { DefaultItemData, ItemTypes } from "../../constants";
import useItemContext from "../../contexts/ItemContext";
import usePropertyContext from "../../contexts/PropertyContext";

function Image({ width, height, onPage = false, itemIdx, position, properties }) {
  const { setItems } = useItemContext();
  const { layout, selectedItem, setSelectedItem } = usePropertyContext();

  if (!width) width = layout.cellWidth * 2;
  if (!height) height = layout.cellHeight * 2;

  const style = {
    width,
    height,
    backgroundImage: `url(${properties?.source || DefaultItemData.Image.source})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const dragStyle = {
    ...style,
    cursor: "move",
    position: "absolute",
    borderRadius: properties?.borderRadius || DefaultItemData.Image.borderRadius,
  };

  const selectedStyle = {
    boxShadow: `0 0 15px green`,
  };

  const handleClick = () => {
    const newImage = {
      type: ItemTypes.Image,
      properties: { ...DefaultItemData.Image },
      position: { x: 0, y: 0 },
      size: { width: 2, height: 2 },
    };
    setItems((prev) => [...prev, newImage]);
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
      style={{
        ...(itemIdx === selectedItem ? selectedStyle : {}),
      }}
      onDragStop={handleDrag}
      onResizeStop={handleResize}
      position={{ x: position?.x * layout.cellWidth, y: position?.y * layout.cellHeight }}
    >
      <img className="image" style={dragStyle} onMouseDown={handleOnPageClick} />
    </Rnd>
  ) : (
    <img className="image" style={style} src={DefaultItemData.Image.source} onClick={handleClick} />
  );
}

export default Image;
