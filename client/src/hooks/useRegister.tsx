import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../utils/';
import { useNavigate } from 'react-router-dom';

type userDataProps = {
  email: string;
  password: string;
  fullName: string;
  country: string;
  gender: string;
  dob: string;
}

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const register = async (userData: userDataProps) => {
    setLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/api/v1/user/auth/register`, userData);
      setLoading(false);
      navigate('/auth/login');
    } catch (err) {
      setError(err.response ? err.response.data.message: "An error occurred");
      setLoading(false);
    }
  }
  return { register, loading, error };
}

export default useRegister;
