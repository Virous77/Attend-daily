import React, { ChangeEvent, useState } from "react";
import Common from "./common";
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/api/api";
import { useAppContext } from "@/store/useAppContext";
import { useToast } from "../ui/use-toast";

type RegisterResponse = {
  message: string;
  status: boolean;
  data: null;
};

const Register = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    name: "",
  });

  const { password, email, name } = formData;
  const { setState } = useAppContext();
  const { toast } = useToast();

  const { mutate, isLoading } = useMutation<RegisterResponse>({
    mutationFn: () => {
      return postData({
        params: { password, email, name },
        endPoints: "/auth/register",
      });
    },
    onSuccess: (data) => {
      toast({
        description: data.message,
        duration: 4000,
      });

      setState((prev) => ({ ...prev, authModal: false }));
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = e.target;
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
      />
    </div>
  );
};

export default Register;
