import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../utils/';
import { useNavigate } from 'react-router-dom';

type userDataProps = {
  email: string;
  password: string;
}

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signin = async (userData: userDataProps) => {
    setLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/api/v1/user/auth/login`, userData);
      setLoading(false);
      navigate('/');
    } catch (err) {
      setError(err.response ? err.response.data.message: "An error occurred");
      setLoading(false);
    }
  }
  return { signin, loading, error };
}

export default useLogin;
