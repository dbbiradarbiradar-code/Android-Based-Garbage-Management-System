import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { FaBell } from "react-icons/fa";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotifications(data);
    });

    return () => unsubscribe();
  }, []);

  const unreadCount = notifications.filter(
    (n) => !n.isRead
  ).length;

  const markAsRead = async (id) => {
    try {
      await updateDoc(doc(db, "notifications", id), {
        isRead: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">

      <button
        onClick={() => setShow(!show)}
        className="relative bg-white p-3 rounded-full shadow-lg"
      >
        <FaBell className="text-2xl text-green-600" />

        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {show && (
        <div className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">

          <div className="p-4 border-b">
            <h2 className="font-bold text-lg">
              Notifications
            </h2>
          </div>

          {notifications.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No Notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                  !notification.isRead
                    ? "bg-green-50"
                    : ""
                }`}
              >
                <h3 className="font-bold">
                  {notification.title}
                </h3>

                <p className="text-gray-600 text-sm mt-1">
                  {notification.message}
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  {notification.createdAt?.toDate
                    ? notification.createdAt
                        .toDate()
                        .toLocaleString()
                    : ""}
                </p>
              </div>
            ))
          )}

        </div>
      )}

    </div>
  );
}