import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import styles from "./form.module.scss";
import { useAppContext } from "@/store/useAppContext";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import Loader from "../ui/loader/Loader";

type FormData = {
  email: string;
  password: string;
  name: string;
  userName: string;
};

type PropsType = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: FormData;
  handleFormSubmit: () => void;
  isLoading: boolean;
};

const Common: React.FC<PropsType> = ({
  handleChange,
  formData,
  handleFormSubmit,
  isLoading,
}) => {
  const { state, setState } = useAppContext();
  const componentType = state.authModal ? "SIGN UP" : "SIGN IN";

  return (
    <>
      <form className="grid gap-4 py-4" onSubmit={(e) => e.preventDefault()}>
        {state.authModal && (
          <>
            <div className={styles.box}>
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                onChange={(e) => handleChange(e)}
                value={formData.name}
              />
            </div>

            <div className={styles.box}>
              <Label htmlFor="userName" className="text-right">
                UserName
              </Label>
              <Input
                id="userName"
                className="col-span-3"
                onChange={(e) => handleChange(e)}
                value={formData.userName}
              />
            </div>
          </>
        )}
        <div className={styles.box}>
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            className="col-span-3"
            onChange={(e) => handleChange(e)}
            value={formData.email}
          />
        </div>
        <div className={styles.box}>
          <Label htmlFor="password" className="text-right">
            Password
          </Label>
          <Input
            id="password"
            className="col-span-3"
            onChange={(e) => handleChange(e)}
            value={formData.password}
          />
        </div>

        <p className="text-end -mt-2 text-xs">
          {state.authModal
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span
            className="cursor-pointer underline hover:text-sky-700"
            onClick={() => setState({ ...state, authModal: !state.authModal })}
          >
            {state.authModal ? "Sign In" : "Sign Up"}
          </span>{" "}
        </p>

        <DialogFooter>
          <Button
            type="submit"
            className="sm:w-36"
            onClick={handleFormSubmit}
            disabled={isLoading}
            variant={isLoading ? "disabled" : "default"}
          >
            {isLoading ? <Loader /> : componentType}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
};

export default Common;
