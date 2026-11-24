import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function AnalyticsChart({
  pending,
  inProgress,
  completed,
}) {
  const data = {
    labels: [
      "Pending",
      "In Progress",
      "Completed",
    ],
    datasets: [
      {
        data: [
          pending,
          inProgress,
          completed,
        ],
        backgroundColor: [
          "#facc15",
          "#3b82f6",
          "#22c55e",
        ],
      },
    ],
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        Report Analytics
      </h2>

     <div className="w-52 h-52 mx-auto">
  <Pie
    data={data}
    options={{
      responsive: true,
      maintainAspectRatio: false,
    }}
  />
</div>
    </div>
  );
}