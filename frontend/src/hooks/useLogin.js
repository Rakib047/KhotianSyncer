import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/user/login', {
        email,
        password,
      });

      // Assuming the server returns JSON
      const json = response.data;
      // console.log(json.username)
      // Handle successful response
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json });

      // update loading state
      setIsLoading(false);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: `Logged in as ${json.username}`,
        confirmButtonColor: '#1aac83',
        background: '#f1f1f1',
      });

    } catch (error) {
      // Handle error response
      setIsLoading(false);
      setError(error.response.data.error || 'An error occurred');
    }
  };

  return { login, isLoading, error };
};
