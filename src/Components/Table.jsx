import React, { useEffect, useState } from "react";
import Search from "./Search";
import useInstrumentStore from "../intrumentStore";
import Papa from "papaparse";
export default function Table() {
  const [CSVData, setCSVData] = useState();
  const { query } = useInstrumentStore((state) => state);

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
  }, []);

  return (
    <>
      <Search />
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                Product name
              </th>
              <th scope="col" className="py-3 px-6">
                Color
              </th>
              <th scope="col" className="py-3 px-6">
                Category
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
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
                <td className="p-4 w-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {Symbol || "---"}
                </th>
                <td className="py-4 px-6">{Name || "---"}</td>
                <td className="py-4 px-6">{Sector || "---"}</td>
                <td className="py-4 px-6">{Validtill || "---"}</td>
                <td className="py-4 px-6">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
