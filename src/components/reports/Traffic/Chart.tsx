"use client";
import { Traffic } from "@/types/siteDetails";
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
  Legend
);

const Chart = ({ data }: { data: Traffic }) => {
  //   console.log(data, "data ");
  // Process data for the chart
  const dates = Object.keys(data).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );
  const visitors = dates.map((date) => data[date][0].VISITORS);
  const visits = dates.map((date) => data[date][0].VISITS);
  const pageViews = dates.map((date) => data[date][0].PAGE_VIEWS);
  const chartData = {
    labels: dates, // X-axis labels
    datasets: [
      {
        label: "Visitors",
        data: visitors,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "Visits",
        data: visits,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
      {
        label: "Page Views",
        data: pageViews,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Website Traffic Analytics",
      },
    },
  };

  return (
    <div className="">
      <h2 className="text-lg font-semibold">Analytics</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default Chart;
