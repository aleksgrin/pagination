import React, { useState } from "react";
import Pagination from "./components/Pagination/Pagination";
import { GrowX } from "./components/Grow/Grow";
import "./App.css";

function App() {
  const [num, setNum] = useState(0);
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="App">
      <div className="app-wrapper">
        <div className="div-1"></div>
        <GrowX isOpen={isActive}>Текст произвольной ширины</GrowX>
        <div className="div-3"></div>
      </div>
      <button onClick={() => setIsActive(!isActive)}>КЛИК</button>
      <Pagination pageNumber={num} pagesAmount={1600} onClick={setNum} />
    </div>
  );
}

export default App;
