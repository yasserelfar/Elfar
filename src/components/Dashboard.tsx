import React from "react";
import CountUp from "react-countup"; // استيراد المكتبة
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Dashboard = () => {
  const stats = [
    { title: "Products", value: 120 },
    { title: "Orders", value: 735 },
    { title: "Users", value: 50 },
    { title: "Revenue", value: 12340 }, // خلي الرقم بدون $ للعد
  ];

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#fff" },
      },
      title: {
        display: true,
        text: "Weekly Sales",
        color: "#fff",
        font: { size: 20, weight: "bold" },
      },
    },
    scales: {
      x: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.2)" } },
      y: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.2)" } },
    },
  };

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales",
        data: [500, 800, 600, 1200, 900, 1500, 2000],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#fff",
      },
    ],
  };

  return (
    <div className="bg-gray-900 min-h-screen" >
      <h1 className="text-3xl font-bold mb-6 text-center ">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 p-3">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="shadow-amber-50 shadow rounded-lg p-4"
          >
            <p className="text-gray-300">{stat.title}</p>
            <p className="text-2xl font-bold text-white">
              {stat.title === "Revenue" ? "$" : ""}
              <CountUp
                end={stat.value}
                duration={2} // مدة الانيميشن بالثواني
                separator="," // للفواصل
              />
            </p>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 shadow rounded-lg p-4">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
