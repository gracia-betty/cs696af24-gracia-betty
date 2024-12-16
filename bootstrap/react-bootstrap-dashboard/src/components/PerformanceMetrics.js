import React from "react";

const PerformanceMetrics = () => {
  return (
    <div className="performance-metrics">
      <h4>Performance Metrics</h4>
      <div className="progress-item">
        <span>CPU Usage</span>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "80%" }}></div>
        </div>
      </div>
      <div className="progress-item">
        <span>Memory Usage</span>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "60%" }}></div>
        </div>
      </div>
      <div className="progress-item">
        <span>Disk Usage</span>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "90%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
