import { useState } from "react";
import { Link } from 'react-router-dom';
import Layout from "../components/layout/Layout";
import InputBox from "../components/InputBox";
import SubmitBox from "../components/SubmitBox";
import useLogin from "../hooks/useLogin";

const initialValues = {
  email: "",
  password: ""
}

const LogIn = () => {
  const [ formData, setFormData ] = useState(initialValues);
  const { signin, loading } = useLogin();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    })) 
  }

  const handleSubmition = async (e: any) => {
    e.preventDefault();
    await signin(formData);
  }
  return (
    <Layout>
      <div className="h-[96vh] w-full flex items-center justify-center">
        <div className="w-96 flex flex-col gap-3 shadow p-5 border border-gray-700 rounded-md">
          <h1 className="font-semibold text-xl">Welcome Back!</h1>
          <InputBox
            title={"Email"}
            type={'email'}
            name={"email"}
            value={formData.email}
            onChange={ handleChange }
          />
          <InputBox
            title={"Password"}
            type={'password'}
            name={"password"}
            value={formData.password}
            onChange={handleChange}
          />
          <SubmitBox title={"Login"} disable={loading} onClick={handleSubmition} />
          <Link to={'/auth/register'} className="underline text-teal-800 hover:text-teal-700 text-xs">Create an account?</Link>
        </div>
      </div>
    </Layout>
  );
};

export default LogIn;
