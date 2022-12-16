import React from "react";
import Page from "./components/page/Page";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const appStyle = {
    width: "100%",
    display: "flex",
  };

  return (
    <div className="app" style={appStyle}>
      <Sidebar />
      <Page />
    </div>
  );
}

export default App;
