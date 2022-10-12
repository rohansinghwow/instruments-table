import React from "react";
import { Routes, Route } from "react-router-dom";
import Table from "./Components/Table";
import Info from "./Pages/Info";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </>
  );
}
