import React from "react";
import "./BottomNavigation.css";

export default function BottomNavigation({ activeTab = "home", onTabChange }) {
  const tabs = [
    { id: "home", label: "Home", icon: <ion-icon name="home"></ion-icon> },
    { id: "picos", label: "Picos", icon: <i class="bi bi-geo-fill"></i> },
    { id: "mapa", label: "Mapa", icon: <ion-icon name="map"></ion-icon> },
    { id: "perfil", label: "Perfil", icon: <ion-icon name="person"></ion-icon> },
  ];

  return (
    <nav className="bottom-nav" aria-label="mobile navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`bn-btn ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onTabChange?.(tab.id)}
        >
          <span className="icon">{tab.icon}</span>
          <span className="label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
