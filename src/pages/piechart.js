import React, { useRef, useEffect } from "react";
import Chart from "chart.js";

const PieChart = () => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      new Chart(chartContainer.current, {
        type: "pie",
        data: {
          labels: ["Name 1", "Name 2", "Name 3"],
          datasets: [
            {
              data: [10, 20, 30],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  }, [chartContainer]);

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default PieChart;
