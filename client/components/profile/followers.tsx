import { Image, Tab, Tabs } from "@nextui-org/react";
import { Sheet, SheetContent } from "../ui/sheet";
import { useAppContext } from "@/store/useAppContext";
import { UserNetwork } from "@/types/types";
import { useParams } from "next/navigation";
import { useUserContext } from "@/store/useUserContext";
import UserNetworkComp from "@/common/user-network";
import noFollowers from "../../public/folowers.svg";

const Followers = ({
  userData,
  otherUserData,
}: {
  userData: UserNetwork | null;
  otherUserData: UserNetwork;
}) => {
  const { name }: { name: string } = useParams();
  const {
    state: { open, support, user },
    setState,
  } = useAppContext();
  const { networkData } = useUserContext();

  const followers =
    name === user?.userName ? userData?.followers : otherUserData?.followers;
  const following =
    name === user?.userName ? userData?.following : otherUserData?.following;

  const Common = (type: string) => {
    return (
      <>
        {open === type && (
          <div className=" flex items-center justify-center h-[60vh]">
            <Image
              src={noFollowers.src}
              alt="followers"
              placeholder="blur"
              width={250}
              height={250}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <Sheet
      open={open === "followers" || open === "following" ? true : false}
      onOpenChange={() =>
        setState((prev) => ({ ...prev, open: "", support: "true" }))
      }
    >
      <SheetContent side="right" className="w-full" closeButton={true}>
        <div className="flex flex-wrap gap-4 mt-4">
          <Tabs
            variant={"underlined"}
            aria-label="Tabs variants"
            selectedKey={open}
            onSelectionChange={(e) => {
              if (typeof e === "string") {
                if (support !== "true") {
                  setState((prev) => ({ ...prev, open: e }));
                }
              }
            }}
          >
            <Tab key="followers" title="Followers" className=" pl-0" />
            <Tab key="following" title="Following" />
          </Tabs>
        </div>
        <>
          {open === "followers" && followers && followers?.length > 0 ? (
            <UserNetworkComp
              data={followers}
              compareData={networkData.data?.following}
            />
          ) : (
            Common("followers")
          )}
          {open === "following" && following && following.length > 0 ? (
            <UserNetworkComp
              data={following}
              compareData={networkData.data?.followers}
            />
          ) : (
            Common("following")
          )}
        </>
      </SheetContent>
    </Sheet>
  );
};

export default Followers;
