import { proxy } from "../../../Constant/Api/Api";
import { HitApi } from "../../../Store/Action/Api/ApiAction";
import { searchApiService, searchRequest } from "./constants/constant";
import { AllApiCallHere } from "./store/AllApiCallHere";

let tempGlobalArr = [];
let requestRaw = [];
let requestSeq = [];
let header = null;

export const autoRequest = (ele) => getService(ele?._id);

export const getService = async (id) => {

  tempGlobalArr = []
  requestRaw = []
  requestSeq = []

  const json = { page: 1, limit: 1, search: { _id: id } };
  const res = await AllApiCallHere(json, searchApiService);
  if (res?.content?.[0]) {
    tempGlobalArr = res.content[0].globalVariables;
    requestRaw = res.content[0].requests;
    await getRequest(res.content[0].requests, 0);
  }
};

export const getRequest = async (arr, index) => {

  console.log('call request');

  if (requestSeq.length === arr.length) {
    await createFinalRequest(requestSeq);
    return;
  }
  const json = { page: 1, limit: 1, search: { _id: arr[index].requestId } };
  const res = await AllApiCallHere(json, searchRequest);
  if (res?.content?.[0]) {
    requestSeq.push(res.content[0]);
    await getRequest(arr, index + 1);
  }
};

// export const createFinalRequest = async (requestSeq) => {

//   console.log('call final request',requestSeq);

//     for (const req of requestSeq) {

//       console.log('requestSeq',req);

//         let oldData = req;

//         console.log('oldData',oldData);

//         const hashValues = extractHashValues(oldData?.request);

//         console.log('hashValues',hashValues);

//         if (hashValues.length!==0) {
//             oldData = replaceValues(oldData?.request, Object.fromEntries(hashValues.map(ele => {
//                 const tokenObject = tempGlobalArr.find(item => item.valueName === ele.slice(1));
//                 return [ele.slice(1), tokenObject ? tokenObject.data : null];
//             })));
//         }

//         console.log('oldData',oldData);

//         const exists = oldData?.request?.header?.some(item => item.value === "application/xml");
//         var json = {
//           "request": {
//               "host": oldData?.request?.url?.raw,
//               "type": oldData?.request?.method,
//               "body": !exists ? JSON.parse(oldData?.request?.body?.raw) : oldData?.request?.body?.raw
//           },
//           "header": oldData?.request?.header
//       }


//         if (oldData) {




//             try {

//               AllApiCallHere(json, proxy, exists).then(async res => {

//                 let jsonResult
//                 console.log('res', res);
//                 if (exists) {
//                     jsonResult = xmlToJson(res);
//                 }

//                 console.log('jsonResult',jsonResult);
//                 console.log('tempGlobalArr', tempGlobalArr);

//                 tempGlobalArr = await CompileConfiguration(tempGlobalArr,jsonResult===undefined?res:jsonResult);

//             })

//                 // const resultString = await dynamicFetch({ request: oldData });
//                 // console.log('resultString',resultString);
//                 // if (resultString) {
//                 //     tempGlobalArr = await CompileConfiguration(tempGlobalArr, JSON.parse(resultString));
//                 // }
//             } catch (error) {
//                 console.error('Error processing request:', error);
//             }
//         }
//     }
// };

export const createFinalRequest = async (requestSeq) => {
  console.log('call final request', requestSeq);

  for (const req of requestSeq) {
    console.log('requestSeq', req);
    let oldData = req;
    console.log('oldData', oldData);

    const hashValues = extractHashValues(oldData?.request);
    console.log('hashValues', hashValues);

    if (hashValues.length !== 0) {
      oldData = replaceValues(oldData?.request, Object.fromEntries(hashValues.map(ele => {
        const tokenObject = tempGlobalArr.find(item => item.valueName === ele.slice(1));
        return [ele.slice(1), tokenObject ? tokenObject.data : null];
      })));
    }

    console.log('oldData', oldData);

    if (oldData.request) {
      oldData = oldData.request
    }

    const exists = oldData?.header?.some(item => item.value === "application/xml");

    var body = oldData?.body
    body.raw = exists ? body.raw : JSON.parse(body.raw)


    if (oldBeaer = oldData?.auth?.bearer?.length !== 0) {
      var oldBeaer = oldData?.auth?.bearer
      oldBeaer[0].Authorization = 'Bearer ' + oldBeaer[0].value
      delete oldBeaer[0].value
      header = [...oldData?.header, ...oldBeaer]
    }
    let json = {
      "request": {
        "host": oldData?.url?.raw,
        "type": oldData?.method,
        "body": body.raw, // We'll set this below
      },
      "header": header !== null ? header : oldData?.header
    };

    // Handle the body parsing

    console.log('json--', json);

    console.log('oldData', oldData);


    if (json) {
      try {
        console.log('json', json);
        const res = await AllApiCallHere(json, proxy, exists);
        console.log('res', res);

        let jsonResult;
        if (exists) {
          jsonResult = xmlToJson(res);
        }

        console.log('jsonResult', jsonResult);
        console.log('tempGlobalArr', tempGlobalArr);

        tempGlobalArr = await CompileConfiguration(tempGlobalArr, jsonResult === undefined ? res : jsonResult);

      } catch (error) {
        console.error('Error processing request:', error);
      }
    }
  }
};

export const replaceValues = (obj, valueMap) => {
  const replaceHashInString = (str) => {
    return str.replace(/#([a-zA-Z0-9]+)/g, (match, p1) => {
      return valueMap[p1] !== undefined ? valueMap[p1] : match;
    });
  };

  if (typeof obj !== 'object' || obj === null) {
    return typeof obj === 'string' ? replaceHashInString(obj) : obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => replaceValues(item, valueMap));
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      typeof value === 'string' ? replaceHashInString(value) :
        typeof value === 'object' ? replaceValues(value, valueMap) : value
    ])
  );
};

export const extractHashValues = (obj) => {
  const result = new Set();
  const traverse = (item) => {
    if (typeof item === 'object' && item !== null) {
      Object.values(item).forEach(traverse);
    } else if (typeof item === 'string') {
      const matches = item.match(/#[a-zA-Z0-9]+/g);
      if (matches) {
        matches.forEach(match => result.add(match));
      }
    }
  };
  traverse(obj);
  return [...result];
};

export const dynamicFetch = async ({ request }) => {
  if (!request) return JSON.stringify({ success: false, error: 'Invalid request', errorType: 'ValidationError' });

  const { method, url, header, body, auth } = request;
  const fetchUrl = url.raw || (url.host && url.path ? `https://${url.host.join('.')}/${url.path.join('/')}` : null);
  if (!fetchUrl) return JSON.stringify({ success: false, error: 'Invalid URL', errorType: 'ValidationError' });

  const headers = new Headers(header?.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {}));
  if (auth?.type === 'bearer' && auth.bearer?.[0]?.value) {
    headers.append('Authorization', `Bearer ${auth.bearer[0].value}`);
  }

  const fetchOptions = {
    method: method || 'GET',
    headers,
    ...(body && body.mode === 'raw' && body.raw && method !== 'GET' && { body: body.raw }),
  };

  try {
    const response = await fetch(fetchUrl, fetchOptions);
    const contentType = response.headers.get("content-type");
    const data = contentType?.includes("application/json") ? await response.json() : await response.text();
    return JSON.stringify(response.ok ? data : { error: data });
  } catch (error) {
    return JSON.stringify(error);
  }
};

// export const CompileConfiguration = (configurations, input) => {
//     const processConfig = (config, inputData) => {
//         return Object.fromEntries(Object.entries(config).map(([mainKey, path]) => {
//             if (typeof path === 'object' && path !== null) {
//                 return [mainKey, processConfig(path, inputData)];
//             }
//             if (typeof path === 'string' && path.length > 0) {
//                 const keys = path.split('.');
//                 const inputValues = keys.reduce((acc, key) => {
//                     if (acc === undefined || acc === null) return undefined;
//                     const match = key.match(/([^\[]+)\[(\d+)\]/);
//                     if (match) {
//                         const [arrayKey, index] = match.slice(1, 3);
//                         return acc[arrayKey]?.[parseInt(index, 10)];
//                     }
//                     return acc[key];
//                 }, inputData);
//                 return [mainKey, inputValues !== undefined ? inputValues : path];
//             }
//             return [mainKey, "blank"];
//         }));
//     };
//     return Promise.resolve(configurations.map(config => processConfig(config, input)));
// };

export const CompileConfiguration = (configurations, input) => {
  return new Promise((resolve, reject) => {
    try {
      const processConfig = (config, inputData) => {
        const result = {};

        Object.keys(config).forEach((mainKey) => {
          const path = config[mainKey]; // Get the path or object from config

          if (typeof path === 'object' && path !== null) {
            // If the path is an object, recursively process it
            result[mainKey] = processConfig(path, inputData);
          } else if (typeof path === 'string' && path.length > 0) {
            // If path is a non-empty string, use it to fetch data from inputData
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
            result[mainKey] = inputValues !== undefined ? inputValues : path;
          } else {
            // If path is not a valid string, assign "blank"
            result[mainKey] = "blank";
          }
        });

        return result;
      };

      let compiledDataArray;
      if (Array.isArray(configurations)) {
        // If configurations is an array, use map
        compiledDataArray = configurations.map((config) => processConfig(config, input));
      } else if (typeof configurations === 'object' && configurations !== null) {
        // If configurations is an object, use Object.keys or Object.entries
        compiledDataArray = processConfig(configurations, input);
      } else {
        // If configurations is neither an array nor an object, reject with an error
        throw new Error('Invalid configurations format. Expected an array or object.');
      }

      resolve(compiledDataArray);
    } catch (error) {
      // Reject the promise if there's an error
      console.error('Error compiling configuration:', error);
      reject(error);
    }
  });
};

export const checkJSONFormat = (json) => {
  try {
    if (typeof json === 'string') {
      JSON.parse(json);
      return "stringified";
    } else if (typeof json === 'object' && json !== null) {
      JSON.stringify(json);
      return "parsed";
    }
    return "neither";
  } catch {
    return "invalid";
  }
};





//   export const convertNodeToJson = (node) => {
//     const obj = {};

//     if (node.nodeType === Node.ELEMENT_NODE) {
//       if (node.attributes.length > 0) {
//         obj['@attributes'] = {};
//         for (let j = 0; j < node.attributes.length; j++) {
//           const attribute = node.attributes.item(j);
//           obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
//         }
//       }

//       if (node.hasChildNodes()) {
//         for (let i = 0; i < node.childNodes.length; i++) {
//           const child = node.childNodes[i];
//           if (child.nodeType === Node.ELEMENT_NODE) {
//             const nodeName = child.nodeName.replace(/^.*:/, '');
//             if (typeof obj[nodeName] === 'undefined') {
//               obj[nodeName] = convertNodeToJson(child);
//             } else {
//               if (!Array.isArray(obj[nodeName])) {
//                 obj[nodeName] = [obj[nodeName]];
//               }
//               obj[nodeName].push(convertNodeToJson(child));
//             }
//           } else if (child.nodeType === Node.TEXT_NODE && child.nodeValue.trim() !== '') {
//             obj['#text'] = child.nodeValue.trim();
//           }
//         }
//       }
//     }

//     return obj;
//   };


export const xmlToJson = (xmlString) => {
  // Create a new DOMParser
  const parser = new DOMParser();

  // Parse the XML string
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");

  // Check for parsing errors
  const parseError = xmlDoc.getElementsByTagName("parsererror");
  if (parseError.length > 0) {
    throw new Error("Error parsing XML: " + parseError[0].textContent);
  }

  // Convert the XML document to JSON
  const jsonResult = convertNodeToJson(xmlDoc.documentElement);

  return jsonResult;
};

export const convertNodeToJson = (node) => {
  const obj = {};

  if (node.nodeType === Node.ELEMENT_NODE) {
    if (node.attributes.length > 0) {
      obj['@attributes'] = {};
      for (let j = 0; j < node.attributes.length; j++) {
        const attribute = node.attributes.item(j);
        obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
      }
    }

    if (node.hasChildNodes()) {
      for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];
        if (child.nodeType === Node.ELEMENT_NODE) {
          const nodeName = child.nodeName.replace(/^.*:/, '');
          if (typeof obj[nodeName] === 'undefined') {
            obj[nodeName] = convertNodeToJson(child);
          } else {
            if (!Array.isArray(obj[nodeName])) {
              obj[nodeName] = [obj[nodeName]];
            }
            obj[nodeName].push(convertNodeToJson(child));
          }
        } else if (child.nodeType === Node.TEXT_NODE && child.nodeValue.trim() !== '') {
          obj['#text'] = child.nodeValue.trim();
        }
      }
    }
  }

  return obj;
};





export function convertJsonToXml(obj, rootName = 'rm:command') {
  const xmlArray = [];

  function convertObjectToXml(obj, parentName) {
    for (const key in obj) {
      if (key === '@attributes') {
        continue;
      }
      const value = obj[key];
      if (typeof value === 'object') {
        if (key === '#text') {
          xmlArray.push(value);
        } else {
          xmlArray.push(`<${key}`);
          if (obj['@attributes'] && obj['@attributes'][key]) {
            Object.keys(obj['@attributes'][key]).forEach(attr => {
              xmlArray.push(` ${attr}="${obj['@attributes'][key][attr]}"`);
            });
          }
          xmlArray.push('>');
          convertObjectToXml(value, key);
          xmlArray.push(`</${key}>`);
        }
      } else {
        xmlArray.push(`<${key}>${value}</${key}>`);
      }
    }
  }

  xmlArray.push(`<?xml version="1.0" encoding="UTF-8"?>`);
  xmlArray.push(`<${rootName}`);
  if (obj['@attributes']) {
    Object.keys(obj['@attributes']).forEach(attr => {
      xmlArray.push(` ${attr}="${obj['@attributes'][attr]}"`);
    });
  }
  xmlArray.push('>');
  convertObjectToXml(obj, rootName);
  xmlArray.push(`</${rootName}>`);

  return xmlArray.join('');
}