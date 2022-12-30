import React from "react";
import ReactDOMServer from "react-dom/server";

import { Color } from "../../constants";
import useItemContext, { ItemContext } from "../../contexts/ItemContext";
import usePropertyContext, { PropertyContext } from "../../contexts/PropertyContext";
import Page from "../page/Page";

function PublishButton() {
  const { items } = useItemContext();
  const { layout, selectedItem } = usePropertyContext();

  const publishButtonStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 20,
    backgroundColor: Color[0],
    width: "100%",
    borderRadius: 6,
    color: "#fff",
    fontSize: 20,
    fontWeight: 500,
    textAlign: "center",
    cursor: "pointer",
  };

  const handleClick = () => {
    const output = ReactDOMServer.renderToStaticMarkup(
      <ItemContext.Provider value={{ items }}>
        <PropertyContext.Provider value={{ layout, selectedItem }}>
          <Page />
        </PropertyContext.Provider>
      </ItemContext.Provider>
    );

    const prehtml = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>CiAT</title>
        </head>
        <body style="background-color: #ddd; display:flex; justify-content: center; padding: 20px">
          <div style="background-color: #fff; 
            width: ${layout.cellWidth * layout.numberOfColumns}px; 
            height: ${layout.cellHeight * layout.numberOfRows}px;"
          >
            ${output} 
          </div>
        </body>
      </html>
    `;
    const blob = new Blob([prehtml], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "CiAT.html";
    link.href = url;
    link.click();
    link.remove();
  };

  return (
    <div className="publish-button" style={publishButtonStyle} onClick={handleClick}>
      Publish
    </div>
  );
}

export default PublishButton;
