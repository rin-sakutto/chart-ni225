import React from "react";

interface PeriodSelectorProps {
  period: string;
  onChange: (period: string) => void;
}

const periods = [
  { label: "1年", value: "1y" },
  { label: "6ヶ月", value: "6m" },
  { label: "3ヶ月", value: "3m" },
  { label: "1ヶ月", value: "1m" },
  { label: "1週間", value: "1w" },
];

const isMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 600;
};

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ period, onChange }) => {
  const [mobile, setMobile] = React.useState(isMobile());

  React.useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (mobile) {
    return (
      <div style={{ marginBottom: 16, textAlign: "center" }}>
        <select
          value={period}
          onChange={e => onChange(e.target.value)}
          style={{ padding: "6px 16px", borderRadius: 4, border: "1px solid #8884d8" }}
        >
          {periods.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 16, textAlign: "center" }}>
      {periods.map((p) => (
        <button
          key={p.value}
          onClick={() => onChange(p.value)}
          style={{
            margin: "0 8px",
            padding: "6px 16px",
            background: period === p.value ? "#8884d8" : "#fff",
            color: period === p.value ? "#fff" : "#333",
            border: "1px solid #8884d8",
            borderRadius: 4,
            cursor: "pointer",
            fontWeight: period === p.value ? "bold" : "normal",
          }}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
};

export default PeriodSelector;
