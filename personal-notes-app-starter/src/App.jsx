import React from "react";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import DetailNote from "./pages/DetailNote";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes/:id" element={<DetailNote />} />
      </Routes>
    </>
  );
}

export default App;
