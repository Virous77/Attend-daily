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
import Info from "./info";
import { processFile, uploadFiles } from "./utils";
import Choice from "./choice";
import PollTime from "./poll-time";

type PostProps = {
  onClose: () => void;
  name: string;
};

const Post: React.FC<PostProps> = ({ onClose, name }) => {
  const {
    state: { user },
    activeType,
  } = useAppContext();
  const {
    formData,
    setFormData,
    tempFileStore,
    preview,
    setStatus,
    status,
    reset,
  } = usePost();
  const { title, pin, location, id, image, video } = formData;
  const client = useQueryClient();
  const size = preview.image.length + preview.video.length;

  const commonAction = () => {
    setStatus((prev) => ({ ...prev, isLoading: false }));
    reset();
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
    const { formData, file, uploadedImg, uploadedVideo } = processFile({
      image: tempFileStore.image,
      video: tempFileStore.video,
      previewImage: preview.image,
      previewVideo: preview.video,
    });

    try {
      setStatus((prev) => ({ ...prev, isLoading: true }));
      const { data } = await uploadFiles({
        length: file.length,
        formData,
        token: user?.token,
      });
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
      {name === "Poll" && (
        <>
          <Choice />
          <PollTime />
        </>
      )}

      <div className=" pl-14 mt-6 flex items-center gap-2">
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
          Pin this {name}?
        </Switch>
        <Info name={name} />
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
        name={status.isLoading ? <Loader /> : `Add ${name}`}
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
