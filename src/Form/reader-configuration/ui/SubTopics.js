import React, { useState } from "react";

// Memoized SubTopics component
const SubTopics = React.memo(({ subtopics }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!subtopics || typeof subtopics !== 'object' || Object.keys(subtopics).length === 0) {
    return <p>No subtopics available.</p>;
  }

  return (
    <div className="mb-2">
      <button
        className="text-left w-full p-2 bg-gray-200 hover:bg-gray-300 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <strong>Subtopics</strong> {isOpen ? "▼" : "►"}
      </button>
      {isOpen && (
        <ul className="pl-4 mt-2">
          {Object.entries(subtopics).map(([key, value]) => {
            const { topic = "N/A", qos = "N/A", retain = "N/A" } = value || {};

            return (
              <li key={key} className="ml-4 mb-2 p-2 bg-white rounded shadow">
                <div><strong>{key}:</strong> {topic}</div>
                <div>QoS: {qos}</div>
                <div>Retain: {retain.toString()}</div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
});

export default SubTopics;
