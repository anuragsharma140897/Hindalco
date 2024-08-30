export const CompileConfiguration = (output, input) => {
    return new Promise((resolve, reject) => {
      try {
        const outputKeys = Object.keys(output);
        const tj = {};
        outputKeys.forEach((mainKey) => {
          const path = output[mainKey]; // Get the path string from output
          const keys = path.split('.'); // Split the path string to handle nested properties
  
          // Use reduce to traverse through input to get the final value
          const inputValues = keys.reduce((acc, key) => {
            if (key.includes('[') && key.includes(']')) {
              // If the key contains array notation (e.g., "iprange[0].ip1")
              const [arrayKey, index] = key.match(/([^\[]+)\[(\d+)\]/).slice(1, 3); // Extract the key and index
              acc = acc?.[arrayKey]; // Access the array by key
              return acc ? acc[parseInt(index, 10)] : undefined; // Access the array element by index
            }
            return acc?.[key]; // Regular object access
          }, input);
  
          // Assign the value to the tj object
          tj[mainKey] = inputValues;
        });
  
        // Resolve the promise with the tj object
        resolve(tj);
      } catch (error) {
        // Reject the promise if there's an error
        reject(error);
      }
    });
  };