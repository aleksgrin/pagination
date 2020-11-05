import React, { useState } from "react";
import Pagination from "./components/Pagination/Pagination";
import "./App.css";

function App() {
  const [num, setNum] = useState(0);
  return (
    <div className="App">
      <Pagination pageNumber={num} pagesAmount={16} onClick={setNum} />
    </div>
  );
}

export default App;
