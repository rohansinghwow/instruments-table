import React from "react";
import { Routes, Route } from "react-router-dom";
import Table from "./Components/Table";
import { PersistGate } from "zustand-persist";
import Info from "./Pages/Info";

export default function App() {
  return (
    <>
      <PersistGate>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </PersistGate>
    </>
  );
}
