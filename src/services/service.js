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
  //console.log(requestConfig);
  const response = await fetch(`http://localhost:5000/${path}`, requestConfig);
    const json = await response.json();

    if (response.ok) { // Devuelve true si el status está entre 200 y 299

        // if (json.user)
        //     saveUser(json.user.id);
        // if (path.includes(DELEGATIONS_AND_UNITS) && !path.includes('count'))
        //     saveDelegation(json);
        // if (path.includes(CATEGORIES) && !query)
        //     saveCategories(json);
        // if (path.includes(PLACES) && !query)
        //     savePlace(json);

        return ({
            status: response.ok,
            body: json
        })
        
    } else {
        // switch(response.status) {
        //     case 401: {
        //         Alert.alert('Sesion finalizada');
        //         deleteToken();
        //         break;
        //     }
        //     case 403: {
        //         Alert.alert('Acceso no autorizado');
        //         deleteToken();
        //         break;
        //     }
        //     default: break;
        // }
        if (json.error){
            console.log(`Error: ${json.error}`);
            // if(json.message) {
            //     if(Array.isArray(json.message)){
            //         if(json.message[0].messages[0].message === 'Username already taken')
            //             Alert.alert('El nombre de usuario o correo ya existe')
            //         if(json.message[0].messages[0].message === 'Email already taken')
            //             Alert.alert('El nombre de usuario o correo ya existe')
            //         return ({
            //             status: response.ok, // false
            //             //body: json
            //         })
            //     }
            // }
            return ({
                status: response.ok, // false
                body: json
            })
        } 
    }
};

export default Service;
