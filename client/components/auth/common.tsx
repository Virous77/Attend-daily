import React, { useState } from "react";
import styles from "./form.module.scss";
import { useAppContext } from "@/store/useAppContext";
import Loader from "../ui/loader/Loader";
import {
  Button,
  Checkbox,
  CircularProgress,
  Input,
  ModalFooter,
} from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { base_url } from "@/api/api";

type FormData = {
  email: string;
  password: string;
  name: string;
  userName: string;
  isRememberMe: boolean;
};

type PropsType = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: FormData;
  handleFormSubmit: () => void;
  isLoading: boolean;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const Common: React.FC<PropsType> = ({
  handleChange,
  formData,
  handleFormSubmit,
  isLoading,
  setFormData,
}) => {
  const { state, setState } = useAppContext();
  const componentType = state.authModal ? "SIGN UP" : "SIGN IN";
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [timer, setTimer] = useState<any>(undefined);
  const [exist, setExist] = useState("initial");

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    clearTimeout(timer);

    const newTimer = setTimeout(async () => {
      try {
        if (value.length > 0) {
          setExist("loading");
          const { data } = await axios.get(
            `${base_url}username?username=${value}`
          );
          if (data.status) {
            if (data.data) {
              setExist("exist");
            } else {
              setExist("success");
            }
          } else {
            setExist("error");
          }
        }
      } catch (error) {
        setExist("error");
      }
    }, 500);

    setTimer(newTimer);
    handleChange(event);
  };

  return (
    <>
      <form className="grid gap-4 py-4" onSubmit={(e) => e.preventDefault()}>
        {state.authModal && (
          <>
            <div className={styles.box}>
              <Input
                id="name"
                className="col-span-3"
                onChange={(e) => handleChange(e)}
                value={formData.name}
                label="Name"
                variant="bordered"
                type="text"
              />
            </div>

            <div className={styles.box}>
              <Input
                id="userName"
                className="col-span-3"
                onChange={handleInputChange}
                value={formData.userName}
                variant="bordered"
                type="text"
                label="UserName"
                isInvalid={exist === "exist" ? true : false}
                errorMessage={
                  exist === "exist" ? "Username already exist" : null
                }
                endContent={
                  exist === "loading" ? (
                    <CircularProgress size="sm" aria-label="Loading..." />
                  ) : null
                }
              />
            </div>
          </>
        )}
        <div className={styles.box}>
          <Input
            id="email"
            className="col-span-3"
            onChange={(e) => handleChange(e)}
            value={formData.email}
            variant="bordered"
            type="email"
            label="Email"
          />
        </div>
        <div className={styles.box}>
          <Input
            variant="bordered"
            id="password"
            className="col-span-3"
            onChange={(e) => handleChange(e)}
            value={formData.password}
            label="Password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <Eye className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
        </div>

        <div
          className={`flex py-2 px-1 ${
            state.authModal ? "justify-end" : "justify-between"
          }`}
        >
          {!state.authModal && (
            <Checkbox
              classNames={{
                label: "text-small",
              }}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isRememberMe: e.target.checked,
                }))
              }
              checked={formData.isRememberMe}
            >
              Remember me
            </Checkbox>
          )}
          <p className="text-small">
            {state.authModal
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <span
              className="cursor-pointer hover:underline  text-[13px] text-primary"
              onClick={() =>
                setState({ ...state, authModal: !state.authModal })
              }
            >
              {state.authModal ? "Sign In" : "Sign Up"}
            </span>{" "}
          </p>
        </div>

        <ModalFooter className=" w-full -mt-2 pl-[0px] pr-[0px]">
          <Button
            type="submit"
            className="rounded w-full"
            onClick={handleFormSubmit}
            disabled={isLoading || exist === "exist" ? true : false}
            variant={isLoading ? "ghost" : "shadow"}
            color="primary"
          >
            {isLoading ? <Loader /> : componentType}
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};

export default Common;
