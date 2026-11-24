
import AdminSidebar from "../components/AdminSidebar";
import AdminWelcome from "../components/AdminWelcome";
import AdminStats from "../components/AdminStats";
import QuickActions from "../components/QuickActions";
import StatCard from "../components/StatCard";
import AdminLiveMap from "../components/AdminLiveMap";
import AdvancedAnalytics from "../components/AdvancedAnalytics";

import {
  FaClipboardList,
  FaClock,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

import AddReport from "../components/AddReport";
import AnalyticsChart from "../components/AnalyticsChart";
import ReportModal from "../components/ReportModal";
import MapComponent from "../components/MapComponent";

export default function Dashboard() {
  const [collectors, setCollectors] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
      const unsubscribe = onSnapshot(
        collection(db, "collectors"),
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setCollectors(data);
        }
      );

      return () => unsubscribe();
    }, []);


  useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "reports"),
    (snapshot) => {
      const reportsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReports(reportsData);
     }
   );
 
    return () => unsubscribe();
  }, []);

  
  const updateStatus = (id, newStatus) => {
    const updatedReports = reports.map((report) =>
      report.id === id
        ? { ...report, status: newStatus }
        : report
    );

    setReports(updatedReports);
  };

 const updateCollector = async (id, collectorName) => {
    try {
      await updateDoc(doc(db, "reports", id), {
        collector: collectorName,
        status: "Assigned",
      });

      alert("Collector Assigned Successfully!");

    } catch (error) {
      console.error(error);
      alert("Failed to assign collector.");
    }
  };

  const totalReports = reports.length;

  const pendingReports = reports.filter(
    (item) => item.status === "Pending"
  ).length;

  const inProgressReports = reports.filter(
    (item) => item.status === "In Progress"
  ).length;

  const completedReports = reports.filter(
    (item) => item.status === "Completed"
  ).length;

  return (
  <div className="flex min-h-screen bg-linear-to-br from-slate-100 via-green-50 to-emerald-100 p-6">

    <AdminSidebar />

    <main className="flex-1 min-w-0 p-3 sm:p-5 md:p-6 lg:p-8 overflow-y-auto">

      {/* Dashboard Header */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">

      <div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

       <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Welcome back! Manage garbage reports, collectors and users.
        </p>

      </div>

      <div className="w-full sm:w-auto bg-white rounded-2xl shadow-lg px-5 py-4">

        <h3 className="font-semibold text-gray-700">
          👨‍💼 Administrator
        </h3>

        <p className="text-gray-500 text-sm">
          Smart Garbage Management System
        </p>

      </div>

    </div>
    <AdminWelcome />
     <AdminStats
  reports={reports}
  users={[]}
  collectors={collectors}
/>
    <AddReport />

    {/* Main Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            <StatCard
              title="Total Reports"
              value={totalReports}
              icon={<FaClipboardList />}
              color="bg-blue-600 text-white"
              bg="bg-white"
            />

            <StatCard
              title="Pending"
              value={pendingReports}
              icon={<FaClock />}
              color="bg-yellow-500 text-white"
              bg="bg-white"
            />

            <StatCard
              title="In Progress"
              value={inProgressReports}
              icon={<FaTruck />}
              color="bg-blue-500 text-white"
              bg="bg-white"
            />

            <StatCard
              title="Completed"
              value={completedReports}
              icon={<FaCheckCircle />}
              color="bg-green-600 text-white"
              bg="bg-white"
            />

          </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold">
            Assigned Collectors
          </h3>

          <p className="text-2xl font-bold">
            {
              reports.filter(
                (r) => r.collector !== "Not Assigned"
              ).length
            }
          </p>
        </div>

        <div className="bg-red-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold">
            Unassigned Reports
          </h3>

          <p className="text-2xl font-bold">
            {
              reports.filter(
                (r) => r.collector === "Not Assigned"
              ).length
            }
          </p>
        </div>

        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold">
            Completion Rate
          </h3>

          <p className="text-2xl font-bold">
            {totalReports > 0
              ? Math.round(
                  (completedReports / totalReports) *
                    100
                )
              : 0}
            %
          </p>
        </div>
      </div>

      {/* Map */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-5">

            <h2 className="text-2xl font-bold mb-4">
              🗺️ Garbage Locations
            </h2>

            <MapComponent />

          </div>

          <QuickActions />

        </div>

      {/* Analytics */}
      <div className="mb-6">
        <AnalyticsChart
          pending={pendingReports}
          inProgress={inProgressReports}
          completed={completedReports}
        />
      </div>

       <div className="w-full h-[300px] sm:h-[400px] lg:h-[550px] rounded-2xl overflow-hidden">
  <AdminLiveMap
    reports={reports}
    collectors={collectors}
  />
</div>
        <AdvancedAnalytics reports={reports} />
        

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-5 w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <h2 className="text-xl font-bold">
            Recent Garbage Reports
          </h2>

          <input
            type="text"
            placeholder="Search Area..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
             className="border border-gray-300 px-3 py-2 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        

        <div className="w-full overflow-x-auto">
  <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b bg-gray-100">
                    <th className="p-3">Before / After</th>
                    <th className="p-3">Area</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Collector</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>

          <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="text-center border-b">

                 <td className="p-3">
                        <div className="flex gap-2 justify-center">

                          <div>
                            <p className="text-xs font-semibold mb-1">
                              Before
                            </p>

                            <img
                              src={report.image}
                              alt="Before"
                              className="w-20 h-20 rounded object-cover border"
                            />
                          </div>

                          <div>
                            <p className="text-xs font-semibold mb-1">
                              After
                            </p>

                            {report.completedImage ? (
                              <img
                                src={report.completedImage}
                                alt="After"
                                className="w-20 h-20 rounded object-cover border"
                              />
                            ) : (
                              <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded text-xs">
                                Pending
                              </div>
                            )}
                          </div>

                        </div>
                      </td>
                  <td className="p-3">
                    {report.area}
                  </td>

                  <td className="p-3">
                    {report.lat?.toFixed(4)},
                    <br />
                    {report.lng?.toFixed(4)}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        report.status === "Pending"
                          ? "bg-yellow-500"
                          : report.status === "Assigned"
                          ? "bg-blue-500"
                          : report.status === "Completed"
                          ? "bg-green-600"
                          : "bg-gray-500"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>

                  <td className="p-3">
                      <select
                        value={report.collector || "Not Assigned"}
                        onChange={(e) =>
                          updateCollector(report.id, e.target.value)
                        }
                        className="border rounded px-2 py-1"
                      >
                        <option value="Not Assigned">
                          Not Assigned
                        </option>

                        {collectors.map((collector) => (
                          <option
                            key={collector.id}
                            value={collector.name}
                          >
                            {collector.name}
                          </option>
                        ))}
                      </select>
                    </td>

                  <td className="p-3">
                    {report.createdAt?.seconds
                      ? new Date(
                          report.createdAt.seconds * 1000
                        ).toLocaleDateString()
                      : "Today"}
                  </td>

                   <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">

  <button
    onClick={() => setSelectedReport(report)}
    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-center"
  >
    View
  </button>

  <button
    onClick={() =>
      window.open(
        `https://www.google.com/maps?q=${report.lat},${report.lng}`,
        "_blank"
      )
    }
    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition text-center"
  >
    Navigate
  </button>

</div>

                </tr>
              ))}
            </tbody>
        </table>
      </div>
      </div>

     <ReportModal
  report={selectedReport}
  onClose={() => setSelectedReport(null)}
/>

    </main>

  </div>
);
}