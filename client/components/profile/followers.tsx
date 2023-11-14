import { Card, CardBody, Tab, Tabs, User } from "@nextui-org/react";
import { Sheet, SheetContent } from "../ui/sheet";
import { useAppContext } from "@/store/useAppContext";
import { Button } from "../ui/button";
import { UserNetwork } from "@/types/types";
import { useParams } from "next/navigation";
import { useUserContext } from "@/store/useUserContext";

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
    name === user?.userName ? userData?.followers : otherUserData.followers;
  const following =
    name === user?.userName ? userData?.following : otherUserData.following;

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
          {open === "followers" && followers && followers?.length > 0 && (
            <Card className=" mt-3">
              <CardBody className=" p-3">
                <ul className=" flex flex-col w-full">
                  {followers?.map((follower) => (
                    <li
                      key={follower.id._id}
                      className=" flex items-center justify-between"
                    >
                      <User
                        name={follower.id.name}
                        description={`@${follower.id.userName}`}
                        avatarProps={{
                          src: follower.id.image,
                          showFallback: true,
                          classNames: {
                            base: "w-[45px] h-[45px]",
                          },
                        }}
                      />

                      {networkData.data?.userId !== follower.id._id && (
                        <>
                          {networkData?.data?.following?.find(
                            (follow) => follow.id._id === follower.id._id
                          ) ? (
                            <Button>Unfollow</Button>
                          ) : (
                            <Button>Follow</Button>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}
          {open === "following" && following && following.length > 0 && (
            <Card className=" mt-3">
              <CardBody className=" p-3">
                <ul className=" flex flex-col w-full">
                  {following?.map((follower) => (
                    <li
                      key={follower.id._id}
                      className=" flex items-center justify-between"
                    >
                      <User
                        name={follower.id.name}
                        description={`@${follower.id.userName}`}
                        avatarProps={{
                          src: follower.id.image,
                          showFallback: true,
                          classNames: {
                            base: "w-[45px] h-[45px]",
                          },
                        }}
                      />
                      {networkData.data?.userId !== follower.id._id && (
                        <>
                          {networkData?.data?.followers?.find(
                            (follow) => follow.id._id === follower.id._id
                          ) ? (
                            <Button>Unfollow</Button>
                          ) : (
                            <Button>Follow</Button>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}
        </>
      </SheetContent>
    </Sheet>
  );
};

export default Followers;
