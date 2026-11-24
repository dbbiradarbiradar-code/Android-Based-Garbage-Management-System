import { useEffect, useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import AddCollectorModal from "../components/AddCollectorModal";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

export default function Collectors() {
  const [collectors, setCollectors] = useState([]);

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

  const deleteCollector = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this collector?"
  );

  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, "collectors", id));

    alert("Collector deleted successfully!");

  } catch (error) {
    console.log(error);
    alert("Delete failed");
  }
};

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Collector Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all garbage collectors.
          </p>
        </div>

        <button
          className="bg-green-600 text-white px-6 py-3 rounded-xl"
        >
          + Add Collector
        </button>

      </div>

      <AddCollectorModal />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {collectors.map((collector) => (

          <div
  key={collector.id}
  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
>

  <div className="flex justify-between items-center">

    <div>

      <h2 className="text-2xl font-bold">
        {collector.name}
      </h2>

      <p className="text-gray-500">
        {collector.email}
      </p>

    </div>

   <span
  className={`px-4 py-1 rounded-full text-sm font-semibold ${
    collector.status === "Available"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700"
  }`}
>
  {collector.status}
</span>

  </div>

  <div className="mt-5 space-y-2">

    <p>📱 {collector.phone}</p>

    <p>📍 {collector.area}</p>

  </div>

  <div className="flex gap-3 mt-6">

    <button
      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
    >
      Edit
    </button>

   <button
            onClick={() => deleteCollector(collector.id)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl"
            >
            Delete
            </button>

  </div>

</div>

        ))}

      </div>

    </div>
  );
}