const Service = async (method, path, query, payload) => {
  const requestBody = JSON.stringify(payload);

  if (query) {
      path = path + '?' + query
  }

  var headers = {
      'Content-Type': 'application/json'
  };

  var requestConfig = {
      method,
      headers
  };

  if ( method === 'POST' || method === 'PUT' ) {
      requestConfig = {
          ...requestConfig,
          body: requestBody,
      };
  }
  
  const response = await fetch(`http://localhost:5000/${path}`, requestConfig);
    const json = await response.json();

    if (response.ok) { 
        return ({
            status: response.ok,
            body: json
        })
        
    } else {
        
        if (json.error){
            console.log(`Error: ${json.error}`);
            
            return ({
                status: response.ok, // false
                body: json
            })
        } 
    }
};

export default Service;
