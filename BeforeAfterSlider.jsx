import ReactCompareImage from "react-compare-image";

export default function BeforeAfterSlider({
  before,
  after,
}) {
  return (
    <div className="mt-6">

      <h3 className="text-xl font-bold mb-4 text-center">
        Before vs After Cleaning
      </h3>

      <div className="rounded-xl overflow-hidden shadow-lg">

        <ReactCompareImage
          leftImage={before}
          rightImage={after}
        />

      </div>

    </div>
  );
}