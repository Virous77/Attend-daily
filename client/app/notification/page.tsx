import NotificationComp from "@/components/notification/notification";
import { get } from "../layout";
import jwtDecode from "jwt-decode";
import { redirect } from "next/navigation";
import { User } from "@/types/types";

type DecodedType = {
  data: User;
  iat: number;
  exp: number;
};

const Notification = async () => {
  const data = await get();

  if (!data?.value) return redirect("/");
  const user: DecodedType = jwtDecode(data.value);

  return <NotificationComp user={user.data} />;
};

export default Notification;
