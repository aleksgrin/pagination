import React, { useState } from "react";
import Pagination from "./components/Pagination/Pagination";
import "./App.css";

function App() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const [num4, setNum4] = useState(0);
  return (
    <div className="App">
      <Pagination pageNumber={num1} pagesAmount={1} onClick={setNum1} />
      <Pagination pageNumber={num2} pagesAmount={5} onClick={setNum2} />
      <Pagination pageNumber={num3} pagesAmount={15} onClick={setNum3} />
      <Pagination pageNumber={num4} pagesAmount={1600} onClick={setNum4} />
    </div>
  );
}

export default App;
