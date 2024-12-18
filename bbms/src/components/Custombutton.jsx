import React from 'react';

function CustomButton({ label, onClick, color,className }) {
  const baseStyles = "px-6 py-2  font-bold text-white rounded-lg active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all hover:";
  const colorStyles = {
    blue: "bg-blue-500 hover:bg-blue-600",
    red: "bg-red-500 hover:bg-red-600",
    gray: "bg-gray-500 hover:bg-gray-600",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${colorStyles[color]} ${className}`}
    >
      {label}
    </button>
  );
}

export default CustomButton;
