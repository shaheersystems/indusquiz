import React, { useState } from "react";
import { Chart } from "react-google-charts";
import Timer from "./Timer"; 

export const data = [["Country"]];

export function Tree() {
  const [inputValue, setInputValue] = useState("");
  const [newData, setNewData] = useState(data);
  const [total, setTotal] = useState(0);
  const [start, setStart] = useState(false);

  const totalCountries = 249;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddCountry = () => {
    const countryName = inputValue.toLowerCase().trim();

    if (countryName && !newData.some((row) => row[0].toLowerCase() === countryName)) {
      setNewData([...newData, [getCountryCode(countryName) || inputValue]]);
      setStart(true);
      setTotal((newData.length / totalCountries) * 100);
    }

    setInputValue("");
  };

  const getCountryCode = (countryName) => {
    switch (countryName) {
      case "uk":
        return "gb";
      case "usa":
        return "us";
      case "ksa":
      case "saudi":
      case "saudia arabia":
        return "Saudi Arabia";
      default:
        return null;
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Country Name"
            className="px-2 py-2 w-96 ring-1 rounded-sm ring-gray-200"
            value={inputValue}
            onChange={handleInputChange}
          />

          <Timer start={start} />
        </div>
        <button
          disabled={inputValue === ""}
          type="submit"
          className={`px-8 cursor-pointer rounded-sm mt-4 text-white py-2 bg-indigo-500 hover:bg-indigo-500`}
          onClick={handleAddCountry}
        >
          Add Country
        </button>
      </form>
 
      <Chart
        chartEvents={[
          {
            eventName: "select",
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length === 0) return;
              const region = newData[selection[0].row + 1];
              console.log("Selected: " + region);
            },
          },
        ]}
        is3D={true}
        chartType="GeoChart"
        width="100%"
        height="500px"
        data={newData}
      />

      <br />
      <p className="px-6 text-green-500 py-2 my-4 bg-transparent rounded-sm ring-1 ring-green-500 inline-flex">
        {total.toFixed(1)}% Countries Covered
      </p>
      <p>
        {newData.length - 1}/{totalCountries}
      </p>
    </div>
  );
}
