import { Avatar, Textarea, Input } from "@nextui-org/react";
import { useAppContext } from "@/store/useAppContext";
import FileUpload from "./file-upload";
import { Switch } from "@nextui-org/react";
import Action from "./action";
import React from "react";
import { usePost } from "@/store/usePostContext";
import Preview from "./preview";
import { toast } from "../ui/use-toast";
import { postData, putData } from "@/api/api";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "../ui/loader/Loader";

type PostProps = {
  onClose: () => void;
  name: string;
};

const Post: React.FC<PostProps> = ({ onClose, name }) => {
  const {
    state: { user },
    activeType,
  } = useAppContext();
  const { formData, setFormData, tempFileStore, preview, setStatus, status } =
    usePost();
  const { title, pin, location, id, image, video } = formData;
  const client = useQueryClient();
  const size = preview.image.length + preview.video.length;

  const commonAction = () => {
    setStatus((prev) => ({ ...prev, isLoading: false }));
    client.invalidateQueries({
      queryKey: ["feed"],
      exact: true,
      refetchType: "all",
    });
    client.invalidateQueries({
      queryKey: [`${user?._id}-post`],
      exact: true,
      refetchType: "all",
    });
    onClose();
  };

  const handleSavePost = async () => {
    const file = [...tempFileStore.image, ...tempFileStore.video];
    const formData = new FormData();
    const uploadedImg = preview.image.filter((img) =>
      img.includes("https://res.cloudinary.com")
    );
    const uploadedVideo = preview.video.filter((vdo) =>
      vdo.includes("https://res.cloudinary.com")
    );

    if (file.length > 0) {
      formData.append("file1", file[0]);
      formData.append("file2", file[1]);
      formData.append("file3", file[2]);
      formData.append("file4", file[3]);
    }

    try {
      let data;
      setStatus((prev) => ({ ...prev, isLoading: true }));

      if (file.length > 0) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/upload`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        data = await response.json();
      }
      const isNewData = data?.data
        ? { image: data.data.image, video: data.data.video }
        : { image: [], video: [] };
      const packet = {
        image: [...isNewData.image, ...uploadedImg],
        video: [...isNewData.video, ...uploadedVideo],
        title,
        pin,
        location,
        userId: user?._id,
        postType: "post",
      };

      const updatePacket = {
        ...packet,
        id,
        deleteFiles: [...image, ...video],
      };

      if (activeType === "post") {
        await postData({
          endPoints: "post",
          params: packet,
          token: user?.token,
        });
        commonAction();
      } else {
        await putData({
          endPoints: "post",
          params: updatePacket,
          token: user?.token,
        });
        commonAction();
      }
    } catch (error) {
      setStatus((prev) => ({ ...prev, isLoading: false }));

      toast({
        variant: "destructive",
        title: "Something went wrong,Try again later",
      });
    }
  };

  return (
    <div className=" mt-14 p-5">
      <div className=" flex gap-4 items-start">
        <div>
          <Avatar isBordered={true} color="default" src={user?.image} />
        </div>

        <Textarea
          variant="underlined"
          labelPlacement="outside"
          placeholder="What's Happening...?"
          value={title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          disabled={status.isLoading}
        />
      </div>
      {size < 4 && <FileUpload />}
      <div className=" pl-14 mt-6">
        <Switch
          defaultChecked={pin}
          color="success"
          classNames={{
            label: " text-[14px]",
          }}
          onValueChange={(e) => setFormData((prev) => ({ ...prev, pin: e }))}
          isDisabled={status.isLoading}
          isSelected={pin}
        >
          Pin this post to your profile.
        </Switch>
      </div>

      <div className="pl-14 mt-6">
        <Input
          type="text"
          label="Location"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, location: e.target.value }))
          }
          value={location}
          disabled={status.isLoading}
        />
      </div>
      <Preview />

      <Action
        name={status.isLoading ? <Loader /> : name}
        onClick={handleSavePost}
        onClose={onClose}
        active={
          title
            ? true
            : false || preview.image.length > 0 || preview.video.length > 0
        }
        disabled={status.isLoading}
      />
    </div>
  );
};

export default Post;
