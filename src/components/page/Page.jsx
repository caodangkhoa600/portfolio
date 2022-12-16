import React from "react";
import { v4 as uuidv4 } from "uuid";
import { ItemTypes } from "../../constants";
import useItemContext from "../../contexts/ItemContext";
import usePropertyContext from "../../contexts/PropertyContext";
import Block from "../items/Block";
import Image from "../items/Image";

function getItemComponent(itemType, idx, properties, position) {
  const props = {
    idx,
    onPage: true,
    properties,
    position,
  };

  switch (itemType) {
    case ItemTypes.Image:
      return <Image key={uuidv4()} {...props} />;
    default:
      return <Block key={uuidv4()} {...props} />;
  }
}

function Page() {
  const { items } = useItemContext();
  const { layout } = usePropertyContext();

  console.log(items);

  const width = layout.numberOfColumns * layout.cellWidth;
  const height = layout.numberOfRows * layout.cellHeight;

  const pageStyle = {
    position: "relative",
    overflow: "auto",
    padding: 0,
    margin: "20px auto",
  };

  const containerStyle = {
    height,
    width,
    backgroundColor: "#fff",
  };

  const itemsToRender = items.map((item, i) => {
    return getItemComponent(item.type, i, item.properties, item.position);
  });

  return (
    <div className="page" style={pageStyle}>
      <div className="page__container" style={containerStyle}>
        {itemsToRender}
      </div>
    </div>
  );
}

export default Page;
