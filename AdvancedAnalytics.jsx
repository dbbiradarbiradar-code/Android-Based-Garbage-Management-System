import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function AdvancedAnalytics({ reports }) {
  const data = [
    {
      name: "Completed",
      value: reports.filter(
        (r) => r.status === "Completed"
      ).length,
    },
    {
      name: "In Progress",
      value: reports.filter(
        (r) => r.status === "In Progress"
      ).length,
    },
    {
      name: "Pending",
      value: reports.filter(
        (r) =>
          r.status === "Pending" ||
          r.status === "Assigned"
      ).length,
    },
  ];

  const COLORS = [
    "#16a34a",
    "#facc15",
    "#ef4444",
  ];

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl p-4 sm:p-6 mt-6 sm:mt-8 overflow-hidden">

       <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
        Complaint Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>

              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>
      </ResponsiveContainer>

    </div>
  );
}