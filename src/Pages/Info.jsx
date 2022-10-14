import React, { useEffect, useState } from "react";
import useInstrumentStore from "../intrumentStore";
import { Link } from "react-router-dom";

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
      <Link
        to={"/"}
        className="text-white mb-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Go Back
      </Link>
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
                className="py-3 flex items-center px-6 cursor-pointer"
              >
                Time
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-1 w-3 h-3"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                </svg>
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
