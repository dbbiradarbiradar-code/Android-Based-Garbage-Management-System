import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AddReport({ onAddReport }) {
  const [area, setArea] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  // Get Current GPS Location
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        alert("Location access denied");
      }
    );
  };

  // Save Report
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newReport = {
        area,
        status: "Pending",
        collector: "Not Assigned",
        lat: location?.lat || 0,
        lng: location?.lng || 0,
        image: image ? image.name : "",
        createdAt: new Date(),
      };

      await addDoc(
        collection(db, "reports"),
        newReport
      );

      if (onAddReport) {
        onAddReport();
      }

      alert("Report Added Successfully!");

      setArea("");
      setImage(null);
      setLocation(null);

    } catch (error) {
      console.error(error);
      alert("Failed to add report");
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold mb-4">
        Add New Garbage Report
      </h2>

      <form onSubmit={handleSubmit}>

        {/* Area Name */}
        <input
          type="text"
          placeholder="Enter Area Name"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          required
        />

        {/* GPS Button */}
        <button
          type="button"
          onClick={getLocation}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-3"
        >
          Get Current Location
        </button>

        {/* Show Location */}
        {location && (
          <div className="mb-3 text-sm">
            <p>Latitude: {location.lat}</p>
            <p>Longitude: {location.lng}</p>
          </div>
        )}

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
          className="mb-4 block"
        />

        {image && (
          <p className="mb-3 text-sm">
            Selected: {image.name}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Report
        </button>

      </form>
    </div>
  );
}