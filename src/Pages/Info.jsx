import React, { useEffect, useState } from "react";
import useInstrumentStore from "../intrumentStore";

export default function Info() {
  const [symbolData, setSymbolData] = useState([]);
  const { symbol } = useInstrumentStore((state) => state);

  useEffect(() => {
    fetch("https://prototype.sbulltech.com/api/v2/quotes/" + symbol)
      .then((res) => res.json())
      .then((data) => setSymbolData(data.payload[symbol]));

    console.log(
      symbolData,
      "https://prototype.sbulltech.com/api/v2/quotes/" + symbol
    );
  }, []);
  return (
    <>
      <h1>Info Page</h1>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                Time
              </th>
              <th scope="col" className="py-3 px-6">
                Valid Till
              </th>
            </tr>
          </thead>
          <tbody>
            {symbolData?.map(({ price, time, valid_till }, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="py-4 px-6">
                  Rs. {price.toString().slice(0, 8) || "---"}/-
                </td>
                <td className="py-4 px-6">{time || "---"}</td>
                <td className="py-4 px-6">{valid_till || "---"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
