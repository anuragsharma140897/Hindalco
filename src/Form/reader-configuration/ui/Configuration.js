import React, { useState } from "react";
import Additional from "./Additional";
import Endpoint from "./Endpoint";
import Topics from "./Topics";

const Configuration = ({ config }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-gray-100 p-4 rounded-md mb-4">
      <button
        className="text-left w-full p-2 bg-gray-200 hover:bg-gray-300 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <strong>Configuration</strong> {isOpen ? "▼" : "►"}
      </button>
      {isOpen && (
        <div className="mt-2">
          <Additional additional={config.additional} />
          <Endpoint endpoint={config.endpoint} />
          <Topics topics={config.topics} />
        </div>
      )}
    </div>
  );
};

export default Configuration;
