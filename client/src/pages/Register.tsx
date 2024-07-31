import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import InputBox from "../components/InputBox";
import SubmitBox from "../components/SubmitBox";
import InputBoxWrapper from "../components/InputBoxWrapper";
import useRegister from '../hooks/useRegister';

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    gender: "",
    country: "",
    dob: "",
    fullName: "",
  });

  const { register, loading } = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmition = async (e: any) => {
    e.preventDefault();
    await register(formData);
  }

  return (
    <Layout>
      <div className="h-[96vh] w-full flex items-center justify-center">
        <div className="w-100 flex flex-col gap-3 shadow p-5 border border-gray-700 rounded-md">
          <h1 className="font-semibold text-xl">Create Account</h1>
          <InputBoxWrapper>
            <InputBox
              title={"Email"}
              type={"email"}
              name={"email"}
              value={formData.email}
              onChange={handleChange}
            />
            <InputBox
              title={"Password"}
              type={"password"}
              name={"password"}
              value={formData.password}
              onChange={handleChange}
            />
          </InputBoxWrapper>
          <InputBoxWrapper>
            <InputBox
              title={"FullName"}
              type={"text"}
              name={"fullName"}
              value={formData.fullName}
              onChange={handleChange}
            />
            <InputBox
              title={"Country"}
              type={"text"}
              name={"country"}
              value={formData.country}
              onChange={handleChange}
            />
          </InputBoxWrapper>
          <InputBoxWrapper>
            <InputBox
              title={"Gender"}
              type={"text"}
              name={"gender"}
              value={formData.gender}
              onChange={handleChange}
            />
            <InputBox
              title={"DOB"}
              type={"date"}
              name={"dob"}
              value={formData.dob}
              onChange={handleChange}
            />
          </InputBoxWrapper>
          <SubmitBox title={"Login"} disable={loading} onClick={handleSubmition} />
          <Link
            to={"/auth/login"}
            className="underline text-teal-800 hover:text-teal-700 text-xs"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default LogIn;
