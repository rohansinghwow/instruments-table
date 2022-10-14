import React, { useEffect, useState } from "react";
import useInstrumentStore from "../intrumentStore";

export default function Info() {
  const { getSymbol, symbol, symbolData, leastValidTime, dates, doSorting } =
    useInstrumentStore((state) => state);
  const [order, setOrder] = useState(false);

  useEffect(() => {
    if (order) {
      doSorting("DSC");
    } else {
      doSorting("ASC");
    }
  }, [order]);

  //   function onDone() {
  //     // window.location.reload(false);
  //     console.log("Fireddd");
  //     getSymbol("https://prototype.sbulltech.com/api/v2/quotes/");
  //   }
  //   const timeout = useTimeout(onDone, 40000);

  //   console.log(leastValidTime - new Date().toISOString());

  //   console.log(typeof leastValidTime);
  //   timeout.start();
  useEffect(() => {
    console.log(dates);
    console.log(symbolData);
    getSymbol("https://prototype.sbulltech.com/api/v2/quotes/");
  }, []);

  return (
    <div className="mt-16 mx-auto max-w-[520px]">
      <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-2xl dark:text-white">
        <mark className="px-2 ml-2 text-white bg-blue-600 rounded dark:bg-blue-500">
          {symbol}
        </mark>
      </h1>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="bg-blue-600 rounded dark:bg-blue-500 text-xs text-gray-700 uppercase dark:text-gray-400 text-white shadow-lg">
            <tr>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th
                onClick={() => setOrder(!order)}
                scope="col"
                className="py-3 px-6 cursor-pointer"
              >
                Time
              </th>
              <th scope="col" className="py-3 px-6">
                Valid Till
              </th>
            </tr>
          </thead>
          <tbody>
            {symbolData?.map(({ price, time, valid_till }, index) => {
              return (
                <>
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="py-4 px-6">
                      Rs. {price.toString().slice(0, 8) || "---"}/-
                    </td>
                    <td className="py-4 px-6">
                      {new Date(time + "Z").toLocaleTimeString() || "---"}
                    </td>
                    <td className="py-4 px-6">
                      {new Date(valid_till + "Z").toLocaleTimeString() || "---"}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
