const LiquidGauge = ({ value, fillColor }) => {
  const normalizedValue = Math.min(Math.max((value + 1) / 2, 0), 1); // Normalize between 0 and 1
  const fillHeight = `${(1 - normalizedValue) * 100}%`;

  return (
    <div className="relative w-48 h-48 mx-auto mt-8">
      <div className="absolute inset-0 rounded-full border-4 border-gray-200 overflow-hidden">
        <div
          className="absolute bottom-0 w-full transition-all duration-1000 ease-in-out"
          style={{
            height: fillHeight,
            background: fillColor,
            transition: "all 0.5s ease-in-out",
          }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{value.toFixed(2)} kg</span>
      </div>
    </div>
  );
};

export default LiquidGauge;
