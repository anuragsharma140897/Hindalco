export const CompileConfiguration = (configuration, input) => {
  return new Promise((resolve, reject) => {
    try {
      const processConfig = (config, inputData) => {
        const result = {};

        Object.keys(config).forEach((mainKey) => {
          const path = config[mainKey]; // Get the path or object from config

          if (typeof path === 'object' && path !== null) {
            // If the path is an object, recursively process it
            result[mainKey] = processConfig(path, inputData);
          } else if (typeof path === 'string') {
            // If path is a string, use it to fetch data from inputData
            const keys = path.split('.'); // Split the path string to handle nested properties

            // Use reduce to traverse through inputData to get the final value
            const inputValues = keys.reduce((acc, key) => {
              if (acc === undefined || acc === null) return undefined; // Early return if the accumulated value is undefined or null

              if (key.includes('[') && key.includes(']')) {
                // If the key contains array notation (e.g., "iprange[0].ip1")
                const match = key.match(/([^\[]+)\[(\d+)\]/);
                if (!match) return undefined; // If the match fails, return undefined

                const [arrayKey, index] = match.slice(1, 3); // Extract the key and index
                if (!acc[arrayKey] || !Array.isArray(acc[arrayKey])) return undefined; // Ensure the accessed property is an array
                acc = acc[arrayKey]; // Access the array by key
                return acc[parseInt(index, 10)]; // Access the array element by index
              }

              return acc[key]; // Regular object access
            }, inputData);

            // Assign the value to the result object, or "blank" if undefined
            result[mainKey] = inputValues !== undefined ? inputValues : "blank";
          } else {
            // If path is not a string or object, assign "blank" and log an error
            console.error(`Invalid path for key "${mainKey}": expected a string or object but received ${typeof path}`);
            result[mainKey] = "blank";
          }
        });

        return result;
      };

      // Process the configuration with the input data
      const compiledData = processConfig(configuration, input);
      resolve(compiledData);
    } catch (error) {
      // Reject the promise if there's an error
      console.error('Error compiling configuration:', error);
      reject(error);
    }
  });
};