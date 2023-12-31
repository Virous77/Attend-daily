import { Avatar, Textarea, Input } from "@nextui-org/react";
import { useAppContext } from "@/store/useAppContext";
import FileUpload from "./file-upload";
import { Switch } from "@nextui-org/react";
import Action from "./action";
import React from "react";
import { usePost } from "@/store/usePostContext";
import Preview from "./preview";
import { postData, putData } from "@/api/api";
import Loader from "../ui/loader/Loader";
import Info from "./info";
import { processFile, uploadFiles } from "./utils";
import Choice from "./choice";
import PollTime from "./poll-time";
import moment from "moment";
import useQueryInvalidate from "@/hooks/useQueryInvalidate";
import RePostContent from "./repost-content";
import useToast from "@/hooks/useToast";

type CommonType = {
  image: any[];
  video: any[];
  title: string;
  pin: boolean;
  location: string;
  userId: string | undefined;
  postType: string;
};

type UpdatePostType = CommonType & {
  id: string;
  deleteFiles: string[];
};

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
    choice,
    time,
    rePostData,
  } = usePost();
  const { title, pin, location, id, image, video } = formData;
  const size = preview.image.length + preview.video.length;
  const { invalidateKey } = useQueryInvalidate();
  const { notify } = useToast();

  const toastMessage = (message: string) => {
    notify(message);
  };

  const validatePost = () => {
    let error = false;
    if (activeType === "poll") {
      if (choice[0].trim() === "" || choice[1].trim() === "") {
        error = true;
        toastMessage("There must be two choice for poll.");
      }

      const today = new Date();
      const pollTime = `${time.hour}:${Number(time.minutes) + 1} ${time.type}`;
      const formatDate = moment(time.date).format("YYYY-MM-DD");
      const date = new Date(`${formatDate} ${pollTime}`).getTime();

      if (date < today.getTime()) {
        error = true;
        toastMessage("Expiry should be in future time.");
      }
    }
    return error;
  };

  const commonAction = () => {
    setStatus((prev) => ({ ...prev, isLoading: false }));
    reset();
    invalidateKey([
      `${user?._id}-post`,
      "feedhome feed",
      "feedposts",
      "feedpolls",
    ]);
    onClose();
  };

  const commonDate = () => {
    const pollTime = `${time.hour}:${Number(time.minutes) + 1} ${time.type}`;
    const formatDate = moment(time.date, "YYYY-MM-DD").format("YYYY-MM-DD");
    const formattedDateTime = `${formatDate} ${pollTime}`;

    const parsedDate = moment(formattedDateTime, "YYYY-MM-DD hh:mm A");
    const date = parsedDate.toDate().getTime();
    return date;
  };

  const handleCreatePost = async (params: CommonType) => {
    await postData({
      endPoints: "post",
      params: params,
      token: user?.token,
    });
    commonAction();
  };

  const handleUpdatePost = async (params: UpdatePostType) => {
    await putData({
      endPoints: "post",
      params: params,
      token: user?.token,
    });
    commonAction();
  };

  const handleCreatePoll = async (params: CommonType) => {
    await postData({
      endPoints: "poll",
      params: params,
      token: user?.token,
    });
    commonAction();
  };

  const handleUpdatePoll = async (params: UpdatePostType) => {
    await putData({
      endPoints: "poll",
      params: params,
      token: user?.token,
    });
    commonAction();
  };

  const handleCreateRepost = async (params: any) => {
    await postData({
      endPoints: "quote/repost",
      params: params,
      token: user?.token,
    });
    commonAction();
  };

  const handleSavePost = async () => {
    const result = validatePost();
    if (result) return;

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

      const postPacket = {
        image: [...isNewData.image, ...uploadedImg],
        video: [...isNewData.video, ...uploadedVideo],
        title,
        pin,
        location,
        userId: user?._id,
        postType: activeType.includes("post") ? "post" : "poll",
      };

      if (activeType === "post") {
        await handleCreatePost(postPacket);
      }

      if (activeType === "edit-post") {
        const updatePostPacket = {
          ...postPacket,
          id,
          deleteFiles: [...image, ...video],
        };
        await handleUpdatePost(updatePostPacket);
      }

      if (activeType === "poll") {
        const pollPacket = {
          ...postPacket,
          choice,
          expiryDate: commonDate(),
        };
        await handleCreatePoll(pollPacket);
      }

      if (activeType === "edit-poll") {
        const updatePacket = {
          ...postPacket,
          id,
          deleteFiles: [...image, ...video],
          choice,
          expiryDate: commonDate(),
        };
        await handleUpdatePoll(updatePacket);
      }

      if (activeType === "repost") {
        const repostPacket = {
          ...postPacket,
          repostRef: rePostData?.post.isRetweeted
            ? rePostData?.post.originalPost._id
            : rePostData?.post._id,
        };
        await handleCreateRepost(repostPacket);
      }

      setStatus((prev) => ({ ...prev, isLoading: false }));
    } catch (error: any) {
      setStatus((prev) => ({ ...prev, isLoading: false }));
      notify("Something went wrong,Try again later");
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
      {activeType === "repost" && rePostData && (
        <RePostContent post={rePostData.post} />
      )}
      {(name === "Poll" || name === "Update Poll") && (
        <>
          <Choice name={name} pollTime={commonDate()} />
          <PollTime name={name} />
        </>
      )}

      <div className="mt-6 flex items-center gap-2">
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

      <div className="mt-6">
        <Input
          type="text"
          label="Location"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, location: e.target.value }))
          }
          value={location}
          disabled={status.isLoading}
          variant="bordered"
        />
      </div>

      <Preview />

      <Action
        name={
          status.isLoading ? (
            <Loader />
          ) : (
            `${!name.includes("Update") ? "Add" : ""} ${name}`
          )
        }
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
