export default function Card({
  title,
  children,
  className = "",
}) {
  return (
    <div
      className={`bg-white rounded-3xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition duration-300 ${className}`}
    >
      {title && (
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}