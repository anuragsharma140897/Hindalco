export const FullJson = {
    "name": "This My Request",
    "serviceName": "DummyService",
    "serviceId": "66d216e9eb63a54e65b9c928",
    "request": {
        "auth": {
            "type": "bearer",
            "bearer": [
                {
                    "key": "",
                    "value": "",
                    "type": ""
                }
            ]
        },
        "method": "POST",
        "header": [
            {
                "key": "",
                "value": ""
            },
        ],
        "body": {
            "mode": "raw",
            "raw": "",
            "options": {
                "raw": {
                    "language": "json"
                }
            }
        },
        "url": {
            "raw": "",
            "host": [
                "api",
                "example",
                "com"
            ],
            "path": [
                "user",
                "create"
            ]
        }
    },
    "response": [
        {
            // Response data fields can be filled here
        }
    ]
}

export const dynamicFetch = async (requestDoc) => {
  if (!requestDoc || !requestDoc.request) {
    return JSON.stringify({
      success: false,
      error: 'Invalid request document',
      errorType: 'ValidationError'
    });
  }

  console.log("Request details:", JSON.stringify(requestDoc.request, null, 2));

  const { method, url, header, body, auth } = requestDoc.request;

  // Construct URL
  let fetchUrl = url.raw;
  if (!fetchUrl && url.host && url.path) {
    fetchUrl = `http://${url.host.join('.')}/${url.path.join('/')}`;
  }

  if (!fetchUrl) {
    return JSON.stringify({
      success: false,
      error: 'Invalid URL',
      errorType: 'ValidationError'
    });
  }

  console.log("Fetch URL:", fetchUrl);

  // Prepare headers
  const headers = new Headers();
  if (header && Array.isArray(header)) {
    header.forEach(({ key, value }) => {
      if (key && value) headers.append(key, value);
    });
  }

  // Add authorization header if present
  if (auth && auth.type === 'bearer' && auth.bearer && auth.bearer[0]) {
    const token = auth.bearer[0].value;
    if (token) headers.append('Authorization', `Bearer ${token}`);
  }

  // Prepare request options
  const fetchOptions = {
    method: method || 'GET',
    headers: headers,
  };

  // Add no-cors mode and redirect option for non-raw body modes
  if (requestDoc.request?.body?.mode !== 'raw') {
    fetchOptions.mode = 'no-cors';
    fetchOptions.redirect = 'follow';
  }

  // Handle body based on mode
  if (body) {
    if (body.mode === 'raw' || body.mode === 'XML') {
      fetchOptions.body = body.raw;
      console.log("Request body:", body.raw);
    } else {
      console.log('Unsupported body mode:', body.mode);
    }
  }

  console.log('Fetch options:', JSON.stringify(fetchOptions, null, 2));

  try {
    const response = await fetch(fetchUrl, fetchOptions);
    console.log('Response status:', response.status);
    console.log('Response headers:', JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2));

    const contentType = response.headers.get("content-type");
    console.log('Content-Type:', contentType);

    // Get the raw response text
    const rawResponseText = await response.text();
    console.log('Raw response text:', rawResponseText);

    let data;
    if (contentType && contentType.includes("application/json")) {
      try {
        data = JSON.parse(rawResponseText);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        data = rawResponseText;
      }
    } else if (contentType && contentType.includes("application/xml")) {
      // For XML, we'll keep the raw text
      data = rawResponseText;
    } else {
      data = rawResponseText;
    }

    console.log('Processed response data:', data);

    if (rawResponseText === "") {
      console.log('Warning: Empty response received');
      return JSON.stringify({ 
        success: true, 
        data: "",
        message: "Empty response received. This might indicate an issue with the server or the request."
      });
    }

    return JSON.stringify({ success: true, data });
  } catch (error) {
    console.error('Fetch error:', error);
    return JSON.stringify({ 
      success: false, 
      error: error.message,
      stack: error.stack
    });
  }
};

// export const dynamicFetch = async (requestDoc) => {
//     if (!requestDoc || !requestDoc.request) {
//       return JSON.stringify({
//         success: false,
//         error: 'Invalid request document',
//         errorType: 'ValidationError'
//       });
//     }
  
//     console.log("requestDoc.request", requestDoc.request);
  
//     const { method, url, header, body, auth } = requestDoc.request;
  
//     // Construct URL
//     let fetchUrl = url.raw;
//     if (!fetchUrl && url.host && url.path) {
//       fetchUrl = `https://${url.host.join('.')}/${url.path.join('/')}`;
//     }
  
//     if (!fetchUrl) {
//       return JSON.stringify({
//         success: false,
//         error: 'Invalid URL',
//         errorType: 'ValidationError'
//       });
//     }
  
//     // Prepare headers
//     const headers = new Headers();
//     if (header && Array.isArray(header)) {
//       header.forEach(({ key, value }) => {
//         if (key && value) headers.append(key, value);
//       });
//     }
  
//     // Add authorization header if present
//     if (auth && auth.type === 'bearer' && auth.bearer && auth.bearer[0]) {
//       const token = auth.bearer[0].value;
//       if (token) headers.append('Authorization', `Bearer ${token}`);
//     }
  
//     // Prepare request options
//     const fetchOptions = {
//       method: method || 'GET',
//       headers: headers,
//     };

//     if(requestDoc.request?.body?.mode !== 'raw'){
//       fetchOptions.mode = 'no-cors'
//       fetchOptions.redirect = 'follow'
//     }
    
  
//     // Add body if present and method is not GET
//     if (body && body.mode === 'raw' && body.raw && method !== 'GET') {
//       fetchOptions.body = body.raw;
//     }else{
//       fetchOptions.body = body.raw;
//     }

//     console.log('body',body);
  
//     console.log('fetchOptions', fetchOptions);
  
//     try {
//       const response = await fetch(fetchUrl, fetchOptions);
//       const contentType = response.headers.get("content-type");
//       let data;
  
//       if (contentType && contentType.includes("application/json")) {
//         data = await response.json();
//       } else {
//         data = await response.text();
//       }
  
//       if (!response.ok) {
//         return JSON.stringify(data);
//       }
  
//       console.log('Response:', data);
//       return JSON.stringify(data);
//     } catch (error) {
//       console.error('Fetch error:', error);
//       return JSON.stringify(error);
//     }
//   };