"use client";

import { postData } from "@/api/api";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useAppContext } from "@/store/useAppContext";
import axios from "axios";
import { AppError, User } from "@/types/types";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";

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
  };
  const { setState, state } = useAppContext();
  const [formData, setFormData] = useState(initialState);
  const { password, email, name, userName } = formData;
  const router = useRouter();

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
      return postData({
        params: data,
        endPoints: endPoints,
      });
    },
    onSuccess: (data) => {
      if (state.authModal) {
        toast({
          description: data.message,
          duration: 4000,
        });

        setState((prev) => ({ ...prev, authModal: false }));
        setFormData(initialState);
        return;
      }

      const userData: LoginUserType = jwt_decode(data.data || "");
      if (!state.authModal) {
        const config = {
          method: "post",
          url: "/api/login",
          data: { token: data.data },
        };
        axios(config);
        setState((prev) => ({ ...prev, isLogged: true, user: userData.data }));
        router.push("/feed");
      }
    },
    onError: (err: any) => {
      const errResponse: AppError = err.data;
      toast({
        description: errResponse.message,
        duration: 4000,
        variant: "destructive",
      });
    },
  });

  return { formData, setFormData, mutate, isLoading };
};

export default useAuth;
