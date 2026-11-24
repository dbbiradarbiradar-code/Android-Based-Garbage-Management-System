import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

export default function AddCollectorModal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Save to collectors collection
    await addDoc(collection(db, "collectors"), {
      name,
      email,
      phone,
      area,
      status: "Available",
    });

    // Save to users collection
    await addDoc(collection(db, "users"), {
      name,
      email,
      role: "collector",
    });

    alert("Collector added successfully!");

    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setArea("");

  } catch (error) {
    console.error(error);
    alert("Failed to add collector");
  }
};
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Add Collector
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Collector Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-xl p-3"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-xl p-3"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-xl p-3"
          required
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded-xl p-3"
          required
        />

        <input
          type="text"
          placeholder="Assigned Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="w-full border rounded-xl p-3"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
        >
          Create Collector
        </button>

      </form>

    </div>
  );
}