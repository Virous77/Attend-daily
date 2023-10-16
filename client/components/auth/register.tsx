import React, { ChangeEvent, useState } from "react";
import Common from "./common";

const Register = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    name: "",
    loading: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRegister = () => {
    console.log(formData);
  };

  return (
    <div>
      <Common
        handleChange={handleChange}
        formData={formData}
        handleFormSubmit={handleRegister}
      />
    </div>
  );
};

export default Register;
