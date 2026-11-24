import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
} from "firebase/firestore";

export default function Profile() {

  const [userData, setUserData] = useState(null);

  useEffect(() => {

    const loadProfile = async () => {

      const user = auth.currentUser;

      if (!user) return;

      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }

    };

    loadProfile();

  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <div className="flex items-center gap-6">

          <img
            src="https://ui-avatars.com/api/?name=User&background=22c55e&color=fff"
            alt=""
            className="w-28 h-28 rounded-full"
          />

          <div>

            <h1 className="text-4xl font-bold">
              {userData?.name}
            </h1>

            <p className="text-gray-500 mt-2">
              {userData?.email}
            </p>

            <span className="inline-block mt-3 bg-green-100 text-green-700 px-4 py-1 rounded-full">
              {userData?.role}
            </span>

          </div>

        </div>

      </div>

    </div>

  );

}