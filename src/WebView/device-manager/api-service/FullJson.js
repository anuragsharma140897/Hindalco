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
  
    console.log("requestDoc.request", requestDoc.request);
  
    const { method, url, header, body, auth } = requestDoc.request;
  
    // Construct URL
    let fetchUrl = url.raw;
    if (!fetchUrl && url.host && url.path) {
      fetchUrl = `https://${url.host.join('.')}/${url.path.join('/')}`;
    }
  
    if (!fetchUrl) {
      return JSON.stringify({
        success: false,
        error: 'Invalid URL',
        errorType: 'ValidationError'
      });
    }
  
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
  
    // Add body if present and method is not GET
    if (body && body.mode === 'raw' && body.raw && method !== 'GET') {
      fetchOptions.body = body.raw;
    }
  
    console.log('fetchOptions', fetchOptions);
  
    try {
      const response = await fetch(fetchUrl, fetchOptions);
      const contentType = response.headers.get("content-type");
      let data;
  
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }
  
      if (!response.ok) {
        return JSON.stringify({
          success: false,
          error: `HTTP error! status: ${response.status}`,
          errorType: 'HTTPError',
          statusCode: response.status,
          data: typeof data === 'string' ? data : JSON.stringify(data)
        });
      }
  
      console.log('Response:', data);
      return JSON.stringify({
        success: true,
        data: typeof data === 'string' ? data : JSON.stringify(data),
        statusCode: response.status
      });
    } catch (error) {
      console.error('Fetch error:', error);
      return JSON.stringify({
        success: false,
        error: error.message || 'An error occurred during the fetch operation',
        errorType: error.name || 'FetchError'
      });
    }
  };