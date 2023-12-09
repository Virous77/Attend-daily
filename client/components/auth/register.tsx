import React, { ChangeEvent } from "react";
import Common from "./common";
import useAuth from "@/hooks/useAuth";

const Register = () => {
  const { formData, setFormData, mutate, isLoading } =
    useAuth("/auth/register");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRegister = () => {
    mutate();
  };

  return (
    <div>
      <Common
        handleChange={handleChange}
        formData={formData}
        handleFormSubmit={handleRegister}
        isLoading={isLoading}
        setFormData={setFormData}
      />
    </div>
  );
};

export default Register;
