import React, { ChangeEvent, useState } from "react";
import Common from "./common";
import { postData } from "@/api/api";
import { useMutation } from "@tanstack/react-query";
import jwt_decode from "jwt-decode";

type LoginResponse = {
  message: string;
  status: boolean;
  data: string;
};

type LoginDataResponse = {
  data: {
    name: string;
    image: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
  };
};

const Login = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    loading: false,
  });

  const { password, email } = formData;

  const { mutate, isLoading } = useMutation<LoginResponse>({
    mutationFn: () => {
      return postData({
        params: { password, email },
        endPoints: "/auth/login",
      });
    },
    onSuccess: (data) => {
      const userData: LoginDataResponse = jwt_decode(data.data);
      localStorage.setItem("chatID", JSON.stringify(userData.data._id));
      localStorage.setItem("chatToken", JSON.stringify(data.data));
    },
  });

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
