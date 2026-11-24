import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export const sendNotification = async (
  title,
  message,
  userId,
  reportId
) => {
  try {
    await addDoc(collection(db, "notifications"), {
      title,
      message,
      userId,
      reportId,
      isRead: false,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
  }
};