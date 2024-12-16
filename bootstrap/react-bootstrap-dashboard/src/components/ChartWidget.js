import React from "react";
import { Card } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { name: "Jan", pv: 2400, uv: 1000 },
  { name: "Feb", pv: 1398, uv: 1500 },
  { name: "Mar", pv: 9800, uv: 2400 },
  { name: "Apr", pv: 3908, uv: 2000 },
  { name: "May", pv: 4800, uv: 1700 },
  { name: "Jun", pv: 3800, uv: 1900 },
];

const ChartWidget = () => (
  <Card className="mb-4 shadow-sm">
    <Card.Body>
      <Card.Title>Sales Overview</Card.Title>
      <LineChart width={800} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </Card.Body>
  </Card>
);

export default ChartWidget;
