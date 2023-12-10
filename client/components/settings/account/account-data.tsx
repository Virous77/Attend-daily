import { useAppContext } from "@/store/useAppContext";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import useQueryPut from "@/hooks/useQueryPut";
import LoaderComp from "@/components/ui/loader/Loader";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";
import Username from "@/common/username";

const AccountData = () => {
  const {
    state: { user },
  } = useAppContext();
  const [update, setUpdate] = useState(false);
  const [formData, setFormData] = useState({
    userName: user?.userName,
    email: user?.email,
    country: user?.country || "India",
    error: false,
  });
  const { mutateAsync, isPending } = useQueryPut();
  const { invalidateKey } = useQueryInvalidate();

  const handleFormSubmit = async () => {
    const { error, ...rest } = formData;
    const data = await mutateAsync({
      endPoint: "/user",
      data: rest,
    });
    if (data.status) {
      invalidateKey([`user`]);
      setUpdate(false);
    }
  };

  const isExist = formData.error && user?.userName !== formData.userName;

  return (
    <React.Fragment>
      {!update && (
        <div className=" mt-14 p-3 flex flex-col gap-3">
          <div className=" flex items-center justify-between">
            <b>Username</b>
            <span className=" opacity-70">@{user?.userName}</span>
          </div>
          <div className=" flex items-center justify-between">
            <b>Email</b>
            <span className=" opacity-70">{user?.email}</span>
          </div>

          <div className=" flex items-center justify-between">
            <b>Country</b>
            <span className=" opacity-70">{user?.country || "India"}</span>
          </div>

          <Button
            variant="faded"
            color="primary"
            className=" mt-3"
            onClick={() => setUpdate(true)}
          >
            Update Account
          </Button>
        </div>
      )}

      {update && (
        <div className=" mt-14 p-3">
          <div className=" flex flex-col gap-4">
            <Username
              errorCheck={true}
              value={formData.userName!}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, userName: e }))
              }
              onError={(e) => setFormData((prev) => ({ ...prev, error: e }))}
            />

            <Input
              label="Email"
              value={formData?.email}
              disabled={isPending}
              variant="bordered"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />

            <Input
              label="Country"
              value={formData.country}
              disabled={isPending}
              variant="bordered"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, country: e.target.value }))
              }
            />
          </div>

          <div className=" flex items-center justify-between gap-5 mt-6">
            <Button
              variant="ghost"
              color="primary"
              onClick={() => setUpdate(false)}
              className=" w-full"
            >
              Cancel
            </Button>
            <Button
              variant={isPending || isExist ? "faded" : "shadow"}
              color="primary"
              className=" w-full"
              disabled={isPending || isExist}
              onClick={handleFormSubmit}
            >
              {isPending ? <LoaderComp /> : "Save Changes"}
            </Button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AccountData;
