import { calculateDistance } from "../utils/calculateDistance";
import { sendNotification } from "../utils/sendNotification";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function CollectorDashboard() {
  const [reports, setReports] = useState([]);
const [collectorName, setCollectorName] = useState("");
const [afterImage, setAfterImage] = useState(null);

  // Accept Job
  const acceptJob = async (id) => {
    try {
      await updateDoc(doc(db, "reports", id), {
        status: "In Progress",
      });

      alert("Job Accepted!");
    } catch (error) {
      console.error(error);
    }
  };

  const startJourney = async (report) => {
  try {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    alert("Live Tracking Started 🚛");

    navigator.geolocation.watchPosition(
      async (position) => {

        const distance = calculateDistance(
          position.coords.latitude,
          position.coords.longitude,
          report.lat,
          report.lng
        );

        await updateDoc(doc(db, "reports", report.id), {
          collectorStarted: true,
          collectorLatitude: position.coords.latitude,
          collectorLongitude: position.coords.longitude,
          collectorReached: distance <= 20,
        });
        await sendNotification(
          "Collector Arrived",
          "The collector has reached the garbage location.",
          report.userId,
          report.id
        );

      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

  } catch (error) {
    console.log(error);
  }
  };
  // Mark Completed
 const markCompleted = async (id) => {
  try {

    if (!afterImage) {
      alert("Please select an After Cleaning photo.");
      return;
    }

    // Upload image to Cloudinary
    const imageUrl = await uploadAfterImage();

    // Update Firestore
    await updateDoc(doc(db, "reports", id), {
      status: "Completed",
      completedImage: imageUrl,
      completedAt: new Date(),
    });

    await sendNotification(
        "Garbage Cleaned",
        "Your complaint has been completed successfully.",
        report.userId,
        report.id
      );

    alert("Report Completed Successfully!");

    setAfterImage(null);

  } catch (error) {
    console.error(error);
    alert("Failed to complete report.");
  }
};

  const uploadAfterImage = async () => {
  if (!afterImage) return "";

  const data = new FormData();

  data.append("file", afterImage);
  data.append("upload_preset", "garbage_upload");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dbohm416w/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const result = await response.json();

  return result.secure_url;
};

  // Get Collector Name
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      switch (user.email) {
        case "ramesh@gmail.com":
          setCollectorName("Ramesh");
          break;

        case "suresh@gmail.com":
          setCollectorName("Suresh");
          break;

        case "mahesh@gmail.com":
          setCollectorName("Mahesh");
          break;

        case "rajesh@gmail.com":
          setCollectorName("Rajesh");
          break;

        default:
          setCollectorName("");
      }
    });

    return () => unsubscribe();
  }, []);

  // Load Assigned Reports
 useEffect(() => {
  if (!collectorName) return;

  const unsubscribe = onSnapshot(
    collection(db, "reports"),
    (snapshot) => {
      const allReports = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

     const myReports = allReports.filter((report) => {

  console.log("---------------");
  console.log("Firestore Collector:", report.collector);
  console.log("Logged Collector:", collectorName);

        console.log("Reports Length:", reports.length);
        console.log(reports);

  return (
    report.collector &&
    report.collector.trim().toLowerCase() ===
      collectorName.trim().toLowerCase()
  );
});

      console.log("Collector:", collectorName);
      console.log("My Reports:", myReports);

      setReports(myReports);
    }
  );

  return () => unsubscribe();
}, [collectorName]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-green-50 to-emerald-100 p-6">

      <h1 className="text-3xl font-bold text-green-700 mb-2">
        Collector Dashboard
      </h1>

      <h2 className="text-lg mb-6">
        Welcome <span className="font-bold">{collectorName}</span>
      </h2>

      {reports.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p>No reports assigned to you.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                  src={
                    report.image && report.image.trim() !== ""
                      ? report.image
                      : "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  alt="Garbage"
                  className="w-full h-60 object-cover"
                />

              <div className="p-5">

                <h2 className="text-2xl font-bold mb-2">
                  {report.area}
                </h2>

                <p className="mb-2">
                  <strong>Status : </strong>

                  <span
                    className={`px-3 py-1 rounded text-white ${
                      report.status === "Assigned"
                        ? "bg-yellow-500"
                        : report.status === "In Progress"
                        ? "bg-blue-600"
                        : "bg-green-600"
                    }`}
                  >
                    {report.status}
                  </span>
                </p>

                <p>
                  <strong>Latitude :</strong> {report.lat}
                </p>

                <p className="mb-4">
                  <strong>Longitude :</strong> {report.lng}
                </p>

                <div className="flex flex-wrap gap-3">

                  {/* Assigned */}
                  {report.status === "Assigned" && (
                    <button
                      onClick={() => acceptJob(report.id)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                    >
                      Accept Job
                    </button>
                  )}

                  {/* In Progress */}
                 {report.status === "In Progress" && (
                            <>
                              <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                onChange={(e) => setAfterImage(e.target.files[0])}
                                className="border p-2 rounded w-full mb-3"
                              />

                              {/* Live Tracking Status */}
                                  {report.collectorStarted && (
                                    <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-3">
                                      🚛 Live Tracking Enabled
                                    </div>
                                  )}

                              <button
                                onClick={() => startJourney(report)}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                              >
                                🚛 Start Journey
                              </button>

                              <button
                                onClick={() =>
                                  window.open(
                                    `https://www.google.com/maps?q=${report.lat},${report.lng}`,
                                    "_blank"
                                  )
                                }
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                              >
                                Navigate
                              </button>

                              <button
                                onClick={() => markCompleted(report.id)}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                              >
                                Mark Completed
                              </button>
                            </>
                          )}

                  {/* Completed */}
                  {report.status === "Completed" && (
                    <div className="bg-green-600 text-white px-4 py-2 rounded">
                      ✅ Work Completed
                    </div>
                  )}

                </div>

              </div>
            </div>
          ))}

        </div>
      )}
      
    </div>
  );
}