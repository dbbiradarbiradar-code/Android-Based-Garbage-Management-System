import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function CollectorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

              const handleLogin = async (e) => {
  e.preventDefault();

  try {
    console.log("Step 1");

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("Step 2");
    console.log(userCredential.user.email);

    navigate("/collector-dashboard");

    console.log("Step 3");

  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center text-green-700 mb-2">
          Collector Login
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Location Based Garbage Management System
        </p>

        <form onSubmit={handleLogin}>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}