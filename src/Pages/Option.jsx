import React, { useEffect, useState } from "react";
import useInstrumentStore from "../intrumentStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Option() {
  const navigate = useNavigate();
  const refreshPage = () => {
    navigate(0);
  };
  const { getSymbol, symbol, symbolData, leastValidTime, doSorting } =
    useInstrumentStore((state) => state);
  const [order, setOrder] = useState(false);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (order) {
      doSorting("DSC");
    } else {
      doSorting("ASC");
    }
  }, [order]);

  const pageLoad = new Date().getTime();
  function relaodLater() {
    const timeout = setTimeout(() => {
      getSymbol("https://prototype.sbulltech.com/api/v2/quotes/");
      setExpired(false);
      refreshPage();
    }, 10000);
  }
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().toLocaleTimeString();

      if (now >= leastValidTime) {
        setExpired(true);
        relaodLater();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    getSymbol("https://prototype.sbulltech.com/api/v2/quotes/");
  }, []);

  return (
    <div className="mt-16 mx-auto max-w-[520px]">
      <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-2xl dark:text-white">
        Option :
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

      {expired && (
        <div
          className="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
          role="alert"
        >
          <span className="font-medium">Validity Expired !</span>Please Wait ,
          Getting latest valid time and Reloading . This page will refresh a few
          times .
        </div>
      )}

      {!expired && (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="bg-blue-600 rounded dark:bg-blue-500 text-xs uppercase  text-white shadow-lg">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Price
                </th>
                <th
                  onClick={() => setOrder(!order)}
                  scope="col"
                  className="py-3 flex items-center px-6 cursor-pointer"
                >
                  Start Time
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 w-3 h-3"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 320 512"
                  >
                    <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                  </svg>
                </th>
                <th scope="col" className="py-3 px-6">
                  End Time
                </th>
              </tr>
            </thead>
            <tbody>
              {symbolData?.map(({ price, time, valid_till }, index) => {
                return (
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
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
