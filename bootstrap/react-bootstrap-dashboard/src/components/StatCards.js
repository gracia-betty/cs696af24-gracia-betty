import React from "react";

const StatCard = ({ title, value }) => {
  return (
    <div className="stat-card">
      <div className="card-title">{title}</div>
      <div className="card-value">{value}</div>
    </div>
  );
};

const StatCards = () => {
  return (
    <div className="stat-cards-container">
      <StatCard title="Total Users" value="10,245" />
      <StatCard title="Revenue" value="$45,678" />
      <StatCard title="Orders" value="1,234" />
      <StatCard title="Conversion Rate" value="2.3%" />
    </div>
  );
};

export default StatCards;
