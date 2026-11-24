import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

export default function ReportGarbage() {
  const [area, setArea] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get Current Location
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        alert("Location Error: " + error.message);
      }
    );
  };

  // Upload Image to Cloudinary
  const uploadImage = async () => {
    if (!image) return "";

    const data = new FormData();
    data.append("file", image);
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

  // Submit Complaint
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!area) {
      alert("Please enter area name.");
      return;
    }

    if (!location) {
      alert("Please get your current location.");
      return;
    }

    if (!image) {
      alert("Please capture/select an image.");
      return;
    }

    try {
      setLoading(true);

      const imageUrl = await uploadImage();

      const reportData = {
  area,
  lat: location?.lat || 0,
  lng: location?.lng || 0,

  status: "Pending",
  collector: "Not Assigned",

  image: imageUrl,

  // NEW
  userId: auth.currentUser.uid,
  userEmail: auth.currentUser.email,

  createdAt: new Date(),
};

      await addDoc(collection(db, "reports"), reportData);

      alert("Complaint Submitted Successfully!");

      setArea("");
      setImage(null);
      setLocation(null);

    } catch (error) {
      console.error(error);
      alert("Failed to submit complaint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">

        <h1 className="text-3xl font-bold text-center mb-6">
          Report Garbage
        </h1>

        <form onSubmit={handleSubmit}>

          {/* Area */}
          <input
            type="text"
            placeholder="Enter Area Name"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="border p-3 rounded w-full mb-4"
            required
          />

          {/* Camera */}
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 rounded w-full mb-4"
          />

          {image && (
            <p className="text-green-600 mb-4">
              Selected: {image.name}
            </p>
          )}

          {/* Location */}
          <button
            type="button"
            onClick={getLocation}
            className="bg-blue-600 text-white px-4 py-2 rounded mb-4 w-full"
          >
            Get Current Location
          </button>

          {location && (
            <div className="bg-gray-100 p-3 rounded mb-4">
              <p>
                <strong>Latitude:</strong> {location.lat}
              </p>
              <p>
                <strong>Longitude:</strong> {location.lng}
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white w-full py-3 rounded"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>

        </form>

      </div>

    </div>
  );
}