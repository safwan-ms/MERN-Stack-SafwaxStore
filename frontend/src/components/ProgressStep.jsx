const ProgressStep = ({ step1, step2, step3 }) => {
  return (
    <div className="flex justify-center items-center space-x-4 mx-3">
      {/* Step 1 - Login */}
      <div className={`${step1 ? "text-green-500" : "text-gray-300"}`}>
        <span className="ml-2 text-xs sm:text-lg">Login</span>
        <div className="mt-2 text-xs sm:text-lg text-center">✅</div>
      </div>

      {/* Line between Step 1 and Step 2 */}
      {step2 && (
        <>
          {step1 && <div className="h-0.5 w-[10rem] bg-green-500"></div>}
          <div className={`${step2 ? "text-green-500" : "text-gray-300"}`}>
            <span className="text-xs sm:text-lg">Shipping</span>
            <div className="mt-2 text-xs sm:text-lg text-center">✅</div>
          </div>
        </>
      )}

      <>
        {step1 && step2 && step3 ? (
          <div className="h-0.5 w-[10rem] bg-green-500"></div>
        ) : (
          ""
        )}

        <div className={`${step3 ? "text-green-500" : "text-gray-300"}`}>
          <span
            className={`${
              !step3 ? "ml-[10rem] text-xs sm:text-lg" : "text-xs sm:text-lg"
            }`}
          >
            Summary
          </span>
          {step1 && step2 && step3 ? (
            <div className="mt-2 text-xs sm:text-lg text-center">✅</div>
          ) : (
            ""
          )}
        </div>
      </>
    </div>
  );
};
export default ProgressStep;
