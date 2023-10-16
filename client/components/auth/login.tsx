import React, { ChangeEvent, useState } from "react";
import Common from "./common";

const Login = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    loading: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleLogin = () => {
    console.log(formData);
  };

  return (
    <div>
      <Common
        handleChange={(e) => handleChange(e)}
        formData={formData}
        handleFormSubmit={handleLogin}
      />
    </div>
  );
};

export default Login;
