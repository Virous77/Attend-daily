"use client";

import { postData } from "@/api/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useAppContext } from "@/store/useAppContext";
import axios from "axios";
import { AppError, User } from "@/types/types";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";
import useToast from "./useToast";

type RegisterResponse = {
  message: string;
  status: boolean;
  data: null | string;
};

type LoginUserType = {
  data: User;
};

const useAuth = (endPoints: string) => {
  const initialState = {
    password: "",
    email: "",
    name: "",
    userName: "",
    isRememberMe: false,
  };
  const { setState, state } = useAppContext();
  const [formData, setFormData] = useState(initialState);
  const { password, email, name, userName, isRememberMe } = formData;
  const router = useRouter();
  const { notify } = useToast();

  const RegisterData = {
    password,
    email,
    name,
    userName,
  };

  const LoginData = {
    password,
    email,
  };

  const data = state.authModal ? RegisterData : LoginData;

  const { mutate, isPending: isLoading } = useMutation<RegisterResponse>({
    mutationFn: () => {
      setState((prev) => ({ ...prev, isLoading: "login" }));

      return postData({
        params: data,
        endPoints: endPoints,
      });
    },
    onSuccess: (data) => {
      if (state.authModal) {
        notify(data.message);
        setState((prev) => ({ ...prev, authModal: false }));

        setFormData(initialState);
        return;
      }

      const userData: LoginUserType = jwt_decode(data.data || "");
      if (!state.authModal) {
        const config = {
          method: "post",
          url: "/api/login",
          data: { token: data.data, remember: isRememberMe },
        };
        axios(config);
        setState((prev) => ({
          ...prev,
          isLogged: true,
          user: { ...userData.data, token: data.data ? data.data : "" },
          isLoading: "",
        }));
        router.push("/feed");
      }
    },
    onError: (err: any) => {
      const errResponse: AppError = err.data;
      notify(errResponse.message);
      setState((prev) => ({ ...prev, isLoading: "" }));
    },
  });

  const handleLogout = async () => {
    const { data } = await axios.get(endPoints);
    if (data.status === 200) {
      router.push("/");
      window.location.reload();
    }
  };

  return { formData, setFormData, mutate, isLoading, handleLogout };
};

export default useAuth;
