import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchData = (endPoint, setDataContext) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(`/api/GetData`, { endPoint });
        console.log('Response data is:', response.data);
        setDataContext(response.data); // Assuming response data is the final data we need
      } catch (error) {
        // Axios throws an error when the server returns a status outside the 2xx range
        setError(error.response?.statusText || error.message);
        console.error('Fetch error:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endPoint]); // Removed setDataContext from the dependency array

  return { loading, error };
};

export default useFetchData;
