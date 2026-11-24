import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

import { CountUp } from "react-countup";

import {
  FaClipboardList,
  FaCheckCircle,
  FaSpinner,
  FaUsers,
} from "react-icons/fa";

export default function Stats() {
  const [reports, setReports] = useState([]);
  const [collectors, setCollectors] = useState([]);

  useEffect(() => {
    const unsubscribeReports = onSnapshot(
      collection(db, "reports"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReports(data);
      }
    );

    const unsubscribeCollectors = onSnapshot(
      collection(db, "collectors"),
      (snapshot) => {
        setCollectors(snapshot.docs);
      }
    );

    return () => {
      unsubscribeReports();
      unsubscribeCollectors();
    };
  }, []);

  const cards = [
    {
      icon: <FaClipboardList />,
      value: reports.length,
      title: "Total Reports",
      color: "text-blue-600",
    },
    {
      icon: <FaCheckCircle />,
      value: reports.filter(
        (r) => r.status === "Completed"
      ).length,
      title: "Completed",
      color: "text-green-600",
    },
    {
      icon: <FaSpinner />,
      value: reports.filter(
        (r) => r.status === "In Progress"
      ).length,
      title: "In Progress",
      color: "text-yellow-500",
    },
    {
      icon: <FaUsers />,
      value: collectors.length,
      title: "Collectors",
      color: "text-purple-600",
    },
  ];

  return (
    <section
      id="stats"
      className="py-24 bg-white"
    >

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold">
            Live Statistics
          </h2>

          <p className="text-gray-500 mt-5 text-lg">
            Real-time data from the Smart Garbage Management System
          </p>

        </div>

        <div className="grid md:grid-cols-4 gap-8">

          {cards.map((card, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition duration-300 p-10 text-center border border-gray-100"
            >

              <div
                className={`text-5xl mb-6 ${card.color}`}
              >
                {card.icon}
              </div>

              <h3
                  className={`text-5xl font-bold ${card.color}`}
                >
                  {card.value}
                </h3>

              <p className="mt-4 text-gray-500 text-lg">
                {card.title}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}