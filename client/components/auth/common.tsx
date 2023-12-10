import React, { useState } from "react";
import styles from "./form.module.scss";
import { useAppContext } from "@/store/useAppContext";
import Loader from "../ui/loader/Loader";
import { Button, Checkbox, Input, ModalFooter } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import Username from "@/common/username";

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
  const [exist, setExist] = useState(false);

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
              <Username
                errorCheck={false}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, userName: e }))
                }
                value={formData.userName}
                onError={(e) => setExist(e)}
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
            disabled={isLoading || exist}
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
