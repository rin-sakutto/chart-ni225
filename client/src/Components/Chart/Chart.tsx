import React, { useState, useMemo } from "react";
import { XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ComposedChart, Bar } from "recharts";
import PeriodSelector from "./PeriodSelector";

interface DataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface ChartProps {
  data: DataPoint[];
}

const getPeriodCount = (period: string) => {
  switch (period) {
    case "1y":
      return 365;
    case "6m":
      return 183;
    case "3m":
      return 92;
    case "1m":
      return 31;
    case "1w":
      return 7;
    default:
      return 365;
  }
};

const Candle = (props: any) => {
  const { x, y, width, height, fill } = props;
  return <rect x={x} y={y} width={width} height={height} fill={fill} stroke="#333" />;
};

const Chart: React.FC<ChartProps> = ({ data }) => {
  const [period, setPeriod] = useState<string>("1y");

  const filteredData = useMemo(() => {
    const count = getPeriodCount(period);
    return data.slice(-count);
  }, [data, period]);

  // ローソク足用のカスタムBarデータ
  const renderCandles = (props: any) => {
    const { x, width, payload } = props;
    // チャートの高さを取得
    const chartHeight = 400 * 0.85; // ResponsiveContainer height
    // filteredDataの値域を取得
    const allValues = filteredData.flatMap(d => [d.open, d.close, d.high, d.low]);
    const dataMin = Math.min(...allValues);
    const dataMax = Math.max(...allValues);
    // 値をチャート座標に変換（上下反転）
    const yScale = (v: number) => ((dataMax - v) / (dataMax - dataMin)) * chartHeight;
    const openY = yScale(payload.open);
    const closeY = yScale(payload.close);
    const highY = yScale(payload.high);
    const lowY = yScale(payload.low);
    const candleY = Math.min(openY, closeY);
    const candleHeight = Math.abs(openY - closeY);
    const color = payload.close > payload.open ? "#e74c3c" : "#2ecc71";
    return (
      <g>
        {/* ヒゲ */}
        <line x1={x + width / 2} x2={x + width / 2} y1={highY} y2={lowY} stroke={color} strokeWidth={2} />
        {/* 実体 */}
        <rect
          x={x}
          y={candleY}
          width={width}
          height={candleHeight === 0 ? 1 : candleHeight}
          fill={color}
          stroke="#333"
        />
      </g>
    );
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2>日経平均株価（ローソク足・期間選択可）</h2>
      <PeriodSelector period={period} onChange={setPeriod} />
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={filteredData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }} barCategoryGap={2}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" minTickGap={40} />
          <YAxis
            domain={[(dataMin: number) => Math.floor(dataMin * 0.995), (dataMax: number) => Math.ceil(dataMax * 1.005)]}
            allowDataOverflow={false}
            padding={{ top: 10, bottom: 10 }}
          />
          <Tooltip />
          <Bar
            dataKey="close"
            shape={renderCandles}
            minPointSize={1}
            maxBarSize={10}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
