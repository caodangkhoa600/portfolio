import React from "react";
import ReactDOMServer from "react-dom/server";
import { Color } from "../../constants";
import Page from "../page/Page";

function PublishButton() {
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
    const output = ReactDOMServer.renderToStaticMarkup(<Page />);
    console.log(output);
  };

  return (
    <div className="publish-button" style={publishButtonStyle} onClick={handleClick}>
      Publish
    </div>
  );
}

export default PublishButton;
