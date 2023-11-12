import { Avatar, Textarea, Input } from "@nextui-org/react";
import { useAppContext } from "@/store/useAppContext";
import FileUpload from "./file-upload";
import { Switch } from "@nextui-org/react";
import Action from "./action";
import React from "react";
import { usePost } from "@/store/usePostContext";
import Preview from "./preview";
import { toast } from "../ui/use-toast";
import { postData } from "@/api/api";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "../ui/loader/Loader";

type PostProps = {
  onClose: () => void;
};

const Post: React.FC<PostProps> = ({ onClose }) => {
  const {
    state: { user },
  } = useAppContext();
  const { formData, setFormData, tempFileStore, preview, setStatus, status } =
    usePost();
  const { title, pin, location } = formData;
  const client = useQueryClient();
  const size = preview.image.length + preview.video.length;

  const handleSavePost = async () => {
    const file = [...tempFileStore.image, ...tempFileStore.video];
    const formData = new FormData();
    formData.append("file1", file[0]);
    formData.append("file2", file[1]);
    formData.append("file3", file[2]);
    formData.append("file4", file[3]);

    try {
      setStatus((prev) => ({ ...prev, isLoading: true }));
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
      const data = await response.json();
      const packet = {
        image: data.data.image,
        video: data.data.video,
        title,
        pin,
        location,
        userId: user?._id,
        postType: "post",
      };

      await postData({
        endPoints: "post",
        params: packet,
        token: user?.token,
      });
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
        name={status.isLoading ? <Loader /> : "Post"}
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
