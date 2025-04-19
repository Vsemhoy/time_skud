import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Обязательно зарегистрируй элементы Chart.js
Chart.register(...registerables);

const DemoChart = () => {
  const data = {
    labels: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн"],
    datasets: [
      {
        label: "Продажи, $",
        data: [1200, 1900, 3000, 5000, 2800, 4000],
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.3 // сглаживание линии
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top"
      }
    }
  };

  return <Line data={data} options={options} />;
};

export default DemoChart;