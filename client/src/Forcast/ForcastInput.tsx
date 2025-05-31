import React, { useState } from "react";

interface ForcastInputProps {
  value: string;
  onChange: (value: string) => void;
}

const ForcastInput: React.FC<ForcastInputProps> = ({ value, onChange }) => {
  // 入力制御: 数字と小数点のみ許可
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*\.?\d*$/.test(val)) {
      onChange(val);
    }
  };

  return (
    <div style={{ margin: "16px 0", textAlign: "center" }}>
      <label style={{ marginRight: 8 }}>予測値:</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="例: 38000.50"
        style={{ padding: "6px 12px", borderRadius: 4, border: "1px solid #8884d8", width: 120, textAlign: "right" }}
        inputMode="decimal"
        pattern="[0-9.]*"
      />
    </div>
  );
};

export default ForcastInput;
