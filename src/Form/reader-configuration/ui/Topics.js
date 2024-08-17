import React, { useState } from "react";
import SubTopics from "./SubTopics";

const Topics = ({ topics }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-4">
      <button
        className="text-left w-full p-2 bg-gray-200 hover:bg-gray-300 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <strong>Topics</strong> {isOpen ? "▼" : "►"}
      </button>
      {isOpen && (
        <div className="pl-4 mt-2">
          {Object.entries(topics).map(([key, value]) => (
            <div key={key} className="mb-2">
              <h5 className="text-md font-semibold mb-1">{key}</h5>
              {typeof value === "object" ? (
                <SubTopics subtopics={value} />
              ) : (
                <p>{value.toString()}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Topics;
