import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function FeedbackForm({ reportId }) {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");

  const submitFeedback = async () => {
    try {
      await updateDoc(doc(db, "reports", reportId), {
        rating,
        feedback,
      });

      alert("Thank you for your feedback!");

      setFeedback("");
    } catch (error) {
      console.log(error);
      alert("Failed to submit feedback");
    }
  };

  return (
    <div className="mt-5 border-t pt-4">

      <h3 className="text-lg font-bold mb-3">
        Rate Our Service
      </h3>

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border p-2 rounded w-full mb-3"
      >
        <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
        <option value={4}>⭐⭐⭐⭐ Good</option>
        <option value={3}>⭐⭐⭐ Average</option>
        <option value={2}>⭐⭐ Poor</option>
        <option value={1}>⭐ Very Poor</option>
      </select>

      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Write your feedback..."
        className="border p-2 rounded w-full mb-3"
        rows="4"
      />

      <button
        onClick={submitFeedback}
        className="bg-green-600 text-white px-5 py-2 rounded"
      >
        Submit Feedback
      </button>

    </div>
  );
}