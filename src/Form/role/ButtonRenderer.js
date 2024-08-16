// ButtonRenderer.js
import React from 'react';

const colors = {
  read: "bg-yellow-buttonYellow text-white",
  write: "bg-green-buttonGreen text-white",
  delete: "bg-red-buttonRed text-white",
  disabled: "bg-gray-100 text-gray-500",
  inactive: "border-gray-500 bg-gray-200 text-gray-700"
};

export const renderButtonClass = (allowed, parentAllowed, action) => {
  if (allowed) {
    return `${colors[action]} p-3 m-1 rounded-lg`;
  } else if (parentAllowed) {
    return `${colors.inactive} p-3 m-1 border rounded-lg`;
  } else {
    return `${colors.disabled} p-3 m-1 rounded-lg`;
  }
};
