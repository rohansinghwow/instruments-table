import React from "react";
import { Routes, Route } from "react-router-dom";
import Stocks from "./Pages/Stocks";
import { PersistGate } from "zustand-persist";
import Option from "./Pages/Option";

export default function App() {
  return (
    <>
      <PersistGate>
        <Routes>
          <Route path="/" element={<Stocks />} />
          <Route path="/option" element={<Option />} />
        </Routes>
      </PersistGate>
    </>
  );
}
