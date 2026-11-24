import { BrowserRouter, Routes, Route } from "react-router-dom";

import Users from "./pages/Users";


import Login from "./pages/Login";
import Collectors from "./pages/Collectors";

import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import UserDashboard from "./pages/UserDashboard";
import ReportGarbage from "./pages/ReportGarbage";

import Dashboard from "./pages/Dashboard";

import CollectorLogin from "./pages/CollectorLogin";
import CollectorDashboard from "./pages/CollectorDashboard";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />


        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* User */}
        <Route path="/login" element={<UserLogin />} />

        <Route path="/register" element={<UserRegister />} />

        <Route
          path="/user-dashboard"
          element={<UserDashboard />}
        />

        <Route
          path="/report-garbage"
          element={<ReportGarbage />}
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={<Dashboard />}
        />
        <Route path="/users" element={<Users />} />

        {/* Collector */}
        <Route
          path="/collector-login"
          element={<CollectorLogin />}
        />
        <Route path="/collectors" element={<Collectors />} />

        <Route
          path="/collector-dashboard"
          element={<CollectorDashboard />}
        />

                <Route
          path="/profile"
          element={<Profile />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;