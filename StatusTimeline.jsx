export default function StatusTimeline({ status }) {
  const steps = [
    "Pending",
    "Assigned",
    "In Progress",
    "Completed",
  ];

  const currentStep = steps.indexOf(status);

  return (
    <div className="mt-4">

      <h3 className="font-bold mb-3">
        Complaint Progress
      </h3>

      {steps.map((step, index) => (

        <div
          key={step}
          className="flex items-center mb-3"
        >

          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold ${
              index <= currentStep
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          >
            ✓
          </div>

          <span className="ml-3">
            {step}
          </span>

        </div>

      ))}

    </div>
  );
}