import React from "react";

function ErrorState() {
  return (
    <div className="flex justify-center items-center h-40">
      <p className="text-red-500 font-semibold">
        Something went wrong. Try again.
      </p>
    </div>
  );
}

export default ErrorState;