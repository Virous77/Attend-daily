import { base_url } from "@/api/api";
import { CircularProgress, Input } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { useAppContext } from "@/store/useAppContext";

type TUsername = {
  value: string;
  onChange: (e: string) => void;
  errorCheck: boolean;
  onError?: (e: boolean) => void;
};

const Username: React.FC<TUsername> = ({
  value,
  onChange,
  errorCheck,
  onError,
}) => {
  const {
    state: { user },
  } = useAppContext();
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
              onError && onError(true);
            } else {
              setExist("success");
            }
          } else {
            setExist("error");
            onError && onError(true);
          }
        }
      } catch (error) {
        setExist("error");
        onError && onError(true);
      }
    }, 500);

    setTimer(newTimer);
    onChange(value);
  };

  const isExist = errorCheck
    ? exist === "exist" && user?.userName !== value
    : exist === "exist";

  return (
    <Input
      id="userName"
      className="col-span-3"
      onChange={handleInputChange}
      value={value}
      variant="bordered"
      type="text"
      label="UserName"
      isInvalid={isExist ? true : false}
      errorMessage={isExist ? "Username already exist" : null}
      endContent={
        exist === "loading" ? (
          <CircularProgress size="sm" aria-label="Loading..." />
        ) : null
      }
    />
  );
};

export default Username;
