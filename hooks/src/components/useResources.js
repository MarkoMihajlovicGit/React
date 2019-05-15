import { useState, useEffect } from 'react';
import axios from 'axios';

//reusable code so WE CAN reuse this function anywhere inside our project
const useResources = resource => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    (async resource => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/${resource}`
      );

      setResources(response.data);
    })(resource);
  }, [resource]);

  return resources;
};

export default useResources;
