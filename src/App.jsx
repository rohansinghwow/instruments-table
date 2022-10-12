import React from "react";
import { Routes, Route } from "react-router-dom";
import Table from "./Components/Table";
import Info from "./Pages/Info";
import useInstrumentStore from "./intrumentStore";

export default function App() {
  const { query, setQuery } = useInstrumentStore((state) => state);
  return (
    <>
      {query}
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </>
  );
}
