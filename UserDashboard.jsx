import WelcomeBanner from "../components/WelcomeBanner";
import UserSummaryCards from "../components/UserSummaryCards";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import NotificationBell from "../components/NotificationBell";
import TrackingTimeline from "../components/TrackingTimeline";
import TrackingInfo from "../components/TrackingInfo";
import FeedbackForm from "../components/FeedbackForm";
import LiveTrackingMap from "../components/LiveTrackingMap";
import StatusTimeline from "../components/StatusTimeline";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../firebase";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "reports"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReports(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-green-50 to-emerald-100 p-6">
      <WelcomeBanner />

            <div className="flex justify-between items-center mb-6">
                          
              <UserSummaryCards reports={reports} />
              

 <h1 className="text-3xl font-bold text-green-700">
        User Dashboard
      </h1>

      <NotificationBell />
      <button
onClick={() => navigate("/profile")}
className="bg-white shadow px-5 py-2 rounded-lg"
>
👤 Profile
</button>

  <button
    onClick={() => navigate("/report-garbage")}
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
  >
    + New Complaint
  </button>

</div>


      {reports.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow">
          No complaints found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={report.image}
                alt="Garbage"
                className="w-full h-56 object-cover"
              />

              <div className="p-5">

                <h2 className="text-xl font-bold">
                  {report.area}
                </h2>

                  <p className="mt-2">
                          <strong>Status:</strong> {report.status}
                        </p>

                        <StatusTimeline status={report.status} />
                        {report.collectorStarted && (
                            <div className="mt-5">
                              <LiveTrackingMap report={report} />
                              <TrackingInfo report={report} />
                              <TrackingTimeline report={report} />
                            </div>
                          )}

                        <p className="mt-4">
                          <strong>Collector:</strong> {report.collector}
                        </p>

                {report.completedImage && (
  <>
    <BeforeAfterSlider
      before={report.image}
      after={report.completedImage}
    />

    {report.status === "Completed" &&
      !report.rating && (
        <FeedbackForm reportId={report.id} />
      )}

    {report.rating && (
      <div className="mt-4 border-t pt-4">

        <h3 className="font-bold">
          Your Feedback
        </h3>

        <p className="text-yellow-500 text-xl">
          {"⭐".repeat(report.rating)}
        </p>

        <p className="mt-2 text-gray-700">
          {report.feedback}
        </p>

      </div>
    )}
  </>
)}

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}