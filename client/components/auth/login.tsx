import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import Common from "./common";
import useAuth from "@/hooks/useAuth";

const Login = () => {
  const { formData, mutate, isLoading, setFormData } = useAuth("/auth/login");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleLogin = () => {
    mutate();
  };

  return (
    <div>
      <Common
        handleChange={(e) => handleChange(e)}
        formData={formData}
        handleFormSubmit={handleLogin}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Login;
