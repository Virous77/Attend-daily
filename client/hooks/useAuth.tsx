"use client";

import { postData } from "@/api/api";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useAppContext } from "@/store/useAppContext";
import axios from "axios";

type RegisterResponse = {
  message: string;
  status: boolean;
  data: null | string;
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

const useAuth = (endPoints: string) => {
  const { setState, state } = useAppContext();
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    name: "",
  });

  const { password, email, name } = formData;

  const RegisterData = {
    password,
    email,
    name,
  };

  const LoginData = {
    password,
    email,
  };

  const data = state.authModal ? RegisterData : LoginData;

  const { mutate, isLoading } = useMutation<RegisterResponse>({
    mutationFn: () => {
      return postData({
        params: data,
        endPoints: endPoints,
      });
    },
    onSuccess: (data) => {
      if (!state.authModal) {
        const config = {
          method: "post",
          url: "/api/login",
          data: { token: data.data },
        };
        axios(config);
        window.location.reload();
        return;
      }

      toast({
        description: data.message,
        duration: 4000,
      });

      setState((prev) => ({ ...prev, authModal: false }));
    },
  });

  return { formData, setFormData, mutate, isLoading };
};

export default useAuth;
