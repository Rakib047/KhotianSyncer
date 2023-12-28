import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password,username) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/user/signup', {
        email,
        password,
        username
      });

      // Assuming the server returns JSON
      const json = response.data;

      // Handle successful response
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json });

      // update loading state
      setIsLoading(false);
    } catch (error) {
      // Handle error response
      setIsLoading(false);
      setError(error.response.data.error || 'An error occurred');
    }
  };

  return { signup, isLoading, error };
};
