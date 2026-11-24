import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function UserRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Save user details in Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      name,
      email,
      role: "user",
      createdAt: new Date(),
    });

    alert("Registration Successful!");

    setName("");
    setEmail("");
    setPassword("");

  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          User Registration
        </h2>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full mb-4"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full mb-4"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full mb-4"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
}
