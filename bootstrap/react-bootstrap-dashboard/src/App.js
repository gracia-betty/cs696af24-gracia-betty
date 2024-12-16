import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCards from "./components/StatCards";
import ChartWidget from "./components/ChartWidget";
import PerformanceMetrics from "./components/PerformanceMetrics";
import "./App.css";

function App() {
  return (
    <div>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="main-content">
        <Header />
        <div className="cards">
          <StatCards />
        </div>
        <div className="chart-container">
          <ChartWidget />
        </div>
        <div className="progress-container">
          <PerformanceMetrics />
        </div>
      </div>
    </div>
  );
}

export default App;
