import { useEffect, useState } from "react";
import Chart from "./Components/Chart/Chart";
import ForcastInput from "./Components/Forcast/ForcastInput";
import Sidebar from "./Components/Bar/Sidebar";
import TradingViewWidget from "./Components/Chart/TradingViewWidget";

function MainApp() {
  const [data, setData] = useState<{ date: string; open: number; high: number; low: number; close: number }[]>([]);
  const [forcast, setForcast] = useState("");
  const [showTradingView, setShowTradingView] = useState(false);

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

  const handleMenuClick = (key: string) => {
    if (key === "chart") {
      setShowTradingView(true);
    } else {
      setShowTradingView(false);
    }
  };

  return (
    <div className="App" style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar onMenuClick={handleMenuClick} />
      <div style={{ marginLeft: 80, flex: 1, padding: 24 }}>
        <ForcastInput value={forcast} onChange={setForcast} />
        {showTradingView ? (
          <TradingViewWidget />
        ) : (
          <Chart data={data} />
        )}
      </div>
    </div>
  );
}

export default MainApp;