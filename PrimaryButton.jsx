export default function PrimaryButton({
  children,
  ...props
}) {
  return (
    <button
      {...props}
      className="bg-linear-to-r from-green-600 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
    >
      {children}
    </button>
  );
}