import React, { useState } from 'react';
import JsonEditorComponent from './JsonEditorComponent';

const App = () => {
  // State to hold the JSON data
  const [jsonData, setJsonData] = useState({
    name: 'John Doe',
    age: 30,
    city: 'New York',
  });

  // Options for the dropdown (Select JSON data dynamically)
  const options = [
    {
      label: 'User Data',
      value: JSON.stringify({
        name: 'John Doe',
        age: 30,
        city: 'New York',
      }),
    },
    {
      label: 'Product Data',
      value: JSON.stringify({
        id: 1,
        name: 'Laptop',
        price: 1200,
        available: true,
      }),
    },
    {
      label: 'Order Data',
      value: JSON.stringify({
        orderId: 1023,
        product: 'Laptop',
        quantity: 2,
        total: 2400,
      }),
    },
  ];

  // Handler for changing the selected option
  const handleSelectChange = (event) => {
    const selectedJson = JSON.parse(event.target.value);
    setJsonData(selectedJson); // Update the state with the selected JSON data
  };

  return (
    <div>
      <h1>Dynamic JSON Editor</h1>
      <label htmlFor="json-select">Choose JSON Data: </label>
      <select id="json-select" onChange={handleSelectChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <JsonEditorComponent initialJson={jsonData} onChange={setJsonData} />
    </div>
  );
};

export default App;
