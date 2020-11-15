import React, { useState } from "react";
import Pagination from "./components/Pagination/Pagination";
import { GrowY } from "./components/Grow/GrowY";
import { Grow } from "./components/Grow/Grow";
import "./App.css";

function App() {
  const [num, setNum] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="App">
      <div
        style={{
          margin: "0 auto",
          border: "1px solid black",
          width: "150px",
          padding: "25px",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "red",
            marginBottom: "10px",
          }}
        />
        <Grow isOpen={isOpen}>
          Текст Произвольной высоты Текст Произвольной высоты Текст Произвольной
          высоты Текст Произвольной высоты Текст Произвольной высоты Текст
          Произвольной высоты Текст Произвольной высоты Текст Произвольной
          высоты Текст Произвольной высоты Текст Произвольной высоты Текст
          Произвольной высоты
        </Grow>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "red",
            marginTop: "10px",
          }}
        />
      </div>
      <button onClick={() => setIsOpen(!isOpen)}>КЛИК</button>
      <Pagination pageNumber={num} pagesAmount={1600} onClick={setNum} />
    </div>
  );
}

export default App;
