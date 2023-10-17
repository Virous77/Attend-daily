import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import styles from "./form.module.scss";
import { useAppContext } from "@/store/useAppContext";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";

type FormData = {
  email: string;
  password: string;
  name?: string;
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
      <div className="grid gap-4 py-4">
        {state.authModal && (
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
          <Button type="submit" className="sm:w-36" onClick={handleFormSubmit}>
            {isLoading ? "Processing..." : componentType}
          </Button>
        </DialogFooter>
      </div>
    </>
  );
};

export default Common;
