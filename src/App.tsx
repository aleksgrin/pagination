import React, { useState } from "react";
import Pagination from "./components/Pagination/Pagination";
import "./App.css";

function App() {
  const [num, setNum] = useState(0);
  return (
    <div className="App">
      <Pagination pageNumber={num} pagesAmount={1} onClick={setNum} />
      <Pagination pageNumber={num} pagesAmount={5} onClick={setNum} />
      <Pagination pageNumber={num} pagesAmount={15} onClick={setNum} />
      <Pagination pageNumber={num} pagesAmount={1600} onClick={setNum} />
    </div>
  );
}

export default App;
