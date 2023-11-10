import { Avatar, Textarea, Input } from "@nextui-org/react";
import { useAppContext } from "@/store/useAppContext";
import FileUpload from "./file-upload";
import { Switch } from "@nextui-org/react";
import Action from "./action";
import React from "react";
import usePost from "@/hooks/usePost";

type PostProps = {
  onClose: () => void;
};

const Post: React.FC<PostProps> = ({ onClose }) => {
  const {
    state: { user },
  } = useAppContext();
  const { formData, setFormData, handleSavePost } = usePost();
  const { title, pin, location, image, video } = formData;

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
        />
      </div>
      <FileUpload />
      <div className=" pl-14 mt-6">
        <Switch
          defaultChecked={pin}
          color="success"
          classNames={{
            label: " text-[14px]",
          }}
          onValueChange={(e) => setFormData((prev) => ({ ...prev, pin: e }))}
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
        />
      </div>

      <Action
        name="Post"
        onClick={handleSavePost}
        onClose={onClose}
        active={title ? true : false || image.length > 0 || video.length > 0}
      />
    </div>
  );
};

export default Post;
