import React from "react";
import Configuration from "./Configuration";

const MQTTUI = ({ data }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{data.name}</h2>
      <p className="mb-4">{data.description}</p>
      <Configuration config={data.configuration} />
    </div>
  );
};

export default MQTTUI;
