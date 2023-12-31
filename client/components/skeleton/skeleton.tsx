import { Button, Card, Image, Skeleton } from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/navigation";
import notFound from "../../public/notfound.svg";
import Logo from "../../public/AppImages/android-chrome-512x512.png";

export const FeedSkeleton = () => {
  return (
    <Card className="h-[400px] w-full space-y-5 p-4 mt-3" radius="lg">
      <div className="max-w-[300px] w-full flex items-center gap-3">
        <div>
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>
      <Skeleton className="p-4 w-full h-full rounded-lg mt-2" />
      <div className=" flex items-center justify-between mt-2">
        {[1, 2, 3, 4, 5].map((item) => (
          <React.Fragment key={item}>
            <div className=" flex items-center gap-2">
              <Skeleton className="w-[20px] h-[20px] rounded-full" />
              <Skeleton className="w-[35px] rounded-lg h-[10px]" />
            </div>
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
};

export const ThreeDotsSkeleton = () => {
  return (
    <div className="flex items-center gap-[8px]">
      <Skeleton className="w-[20px] h-[20px] rounded-full" />
      <Skeleton className="w-[20px] h-[20px] rounded-full" />
      <Skeleton className="w-[20px] h-[20px] rounded-full" />
    </div>
  );
};

export const PostNotFound = () => {
  const router = useRouter();
  return (
    <div className=" h-screen w-full flex items-center justify-center">
      <div className=" flex flex-col items-center">
        <div className=" flex flex-col items-center">
          <Image
            src={notFound.src}
            alt="not found"
            isBlurred
            width={200}
            height={200}
          />
          <p className=" mt-2 text-[13px]">Oops! Post not found.</p>
        </div>

        <Button
          className=" mt-3 rounded"
          color="primary"
          variant="shadow"
          onClick={() => router.back()}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export const CommentSkeleton = () => {
  return (
    <div className=" p-4 mb-[80px]">
      <div className="max-w-[300px] w-full flex items-center gap-3">
        <div>
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>

      <Skeleton className=" w-2/3 h-2 rounded-lg mt-4" />
      <Skeleton className=" w-1/3 h-2 rounded-lg mt-3" />

      <div className=" flex items-center gap-4 mt-4 ">
        {[1, 2].map((item) => (
          <React.Fragment key={item}>
            <div className=" flex items-center gap-2">
              <Skeleton className="w-[20px] h-[20px] rounded-full" />
              <Skeleton className="w-[35px] rounded-lg h-[10px]" />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const AppLoad = () => {
  return (
    <div className=" fixed top-0 left-0 bg-background w-full h-screen z-[1000000000000] flex items-center justify-center">
      <div className=" flex flex-col gap-3 items-center justify-center">
        <Image src={Logo.src} alt="ChatX" isBlurred width={120} height={120} />
        <p className=" text-[13px] text-center">Loading...</p>
      </div>
    </div>
  );
};
