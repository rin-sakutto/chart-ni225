import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from "./Components/Chart/Chart";

function App() {
  const [data, setData] = useState<{ date: string; open: number; high: number; low: number; close: number }[]>([]);

  useEffect(() => {
    fetch("/nikkei_hist.csv")
      .then(response => response.text())
      .then(data => {
        const parsedData = data
          .split("\n")
          .map(row => {
            const columns = row.replace(/"/g, "").split(",");
            // 先頭行や不正な行を除外
            if (!/^\d{4}\/\d{2}\/\d{2}$/.test(columns[0])) return null;
            if (columns.length < 5) return null;
            if ([1,2,3,4].some(i => isNaN(parseFloat(columns[i])))) return null;
            return {
              date: columns[0],
              open: parseFloat(columns[2]),
              high: parseFloat(columns[3]),
              low: parseFloat(columns[4]),
              close: parseFloat(columns[1])
            };
          })
          .filter((row): row is { date: string; open: number; high: number; low: number; close: number } => row !== null)
          .slice(-365); // 過去1年分
        setData(parsedData);
      });
  }, []);

  return (
    <div className="App">
      <Chart data={data} />
    </div>
  );
}

export default App;
