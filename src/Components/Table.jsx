import React, { useEffect, useState } from "react";
import Search from "./Search";
import useInstrumentStore from "../intrumentStore";
import Papa from "papaparse";
import { Link } from "react-router-dom";
export default function Table() {
  const [CSVData, setCSVData] = useState();
  const { query, setSymbol } = useInstrumentStore((state) => state);

  useEffect(() => {
    const response = fetch("https://prototype.sbulltech.com/api/v2/instruments")
      .then((response) => response.text())
      .then((v) =>
        Papa.parse(v, {
          header: true,
        })
      )
      .catch((err) => console.log(err));

    response.then((v) => setCSVData(v.data));

    console.log(CSVData, "cscc");

    return "CSV";
  }, []);

  return (
    <>
      <div className="mt-[120px]  shadow-md mt-16 mx-auto mb-10  max-w-[720px]  ">
        <Search />
        <div className="overflow-x-auto  h-[620px]  overlow-y-auto relative shadow-md sm:rounded-lg">
          <table className=" w-full relative text-sm text-left text-gray-700 dark:text-gray-400">
            <thead className=" w-[720px] top-[120px] rounded-md text-xs text-gray-700 uppercase bg-blue-500 dark:bg-gray-700 text-white dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Symbol
                </th>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Category
                </th>
                <th scope="col" className="py-3 px-6">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="shadow-md">
              {CSVData?.filter(
                (obj) =>
                  obj.Symbol?.toLowerCase().includes(query.toLowerCase()) ||
                  obj.Name?.toLowerCase().includes(query.toLowerCase()) ||
                  obj.Sector?.toLowerCase().includes(query.toLowerCase()) ||
                  obj.Validtill?.toLowerCase().includes(query.toLowerCase())
              ).map(({ Symbol, Name, Sector, Validtill }, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Link
                      to={"/info"}
                      onClick={() => setSymbol(Symbol)}
                      className="text-blue-400 hover:underline"
                    >
                      {" "}
                      {Symbol || "---"}{" "}
                    </Link>
                  </th>
                  <td className="py-4 px-6">{Name || "---"}</td>
                  <td className="py-4 px-6">{Sector || "---"}</td>
                  <td className="py-4 px-6">{Validtill || "---"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
