import React from "react";
import Builder from "./lib/components/Builder";

const App = () => {
  const handleChange = () => {};

  return (
    <div className="App">
      <button onClick={handleChange}>Change Model</button>
      <Builder />
    </div>
  );
};

export default App;
