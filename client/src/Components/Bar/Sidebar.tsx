import React, { useState } from "react";
import { FaChartLine, FaMagic, FaHistory, FaQuestionCircle, FaUserCircle, FaCog } from "react-icons/fa";

const menuItems = [
  { label: "チャート", icon: <FaChartLine />, key: "chart" },
  { label: "予測", icon: <FaMagic />, key: "forcast" },
  { label: "履歴", icon: <FaHistory />, key: "history" },
  { label: "ヘルプ", icon: <FaQuestionCircle />, key: "help" },
];

interface SidebarProps {
  onMenuClick?: (key: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuClick }) => {
  return (
    <div
      style={{
        width: 80,
        height: "100vh",
        background: "#22223b",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 100,
      }}
    >
      {/* メニュー一覧 */}
      <div style={{ width: "100%", marginTop: 32 }}>
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => onMenuClick && onMenuClick(item.key)}
            style={{
              color: "#fff",
              padding: "20px 0",
              textAlign: "center",
              fontSize: 24,
              cursor: "pointer",
              borderLeft: "4px solid transparent",
              transition: "background 0.2s",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <div>{item.icon}</div>
            <div style={{ fontSize: 12 }}>{item.label}</div>
          </div>
        ))}
      </div>
      {/* 下部：アイコンと設定 */}
      <div style={{ width: "100%", marginBottom: 24, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* ユーザーアイコン */}
        <FaUserCircle size={40} color="#fff" style={{ background: "#4a4e69", borderRadius: "50%", marginBottom: 12 }} />
        {/* 設定ボタン */}
        <button
          style={{
            background: "#9a8c98",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "6px 16px",
            fontSize: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <FaCog style={{ marginRight: 4 }} /> 
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
