/* eslint-disable @next/next/no-img-element */
import { usePost } from "@/store/usePostContext";
import { useAppContext } from "@/store/useAppContext";
import { Trash2 } from "lucide-react";

const Preview = () => {
  const {
    preview,
    setPreview,
    tempFileStore,
    setTempFileStore,
    status,
    setFormData,
  } = usePost();
  const { activeType } = useAppContext();
  const { image, video } = preview;

  const handleDelete = (url: string, idx: number, type: string) => {
    if (status.isLoading) return;
    if (type === "video") {
      if (activeType === "edit-post") {
        setFormData((prev) => ({ ...prev, video: [...prev.image, url] }));
      }
      const filterPreview = video.filter((vdo) => vdo !== url);
      const tempFilter = tempFileStore.video.filter(
        (vdo, index) => index !== idx
      );
      setPreview((prev) => ({ ...prev, video: filterPreview }));
      setTempFileStore((prev) => ({ ...prev, video: tempFilter }));
    } else {
      if (activeType === "edit-post") {
        setFormData((prev) => ({ ...prev, image: [...prev.image, url] }));
      }
      const filterPreview = image.filter((img) => img !== url);
      const tempFilter = tempFileStore.image.filter(
        (img, index) => index !== idx
      );
      setPreview((prev) => ({ ...prev, image: filterPreview }));
      setTempFileStore((prev) => ({ ...prev, image: tempFilter }));
    }
  };

  return (
    <div className=" flex flex-col gap-5 w-full mt-4 pb-[120px]">
      {video.length > 0 && (
        <ul className=" flex flex-col w-full gap-2">
          {video.map((vdo, idx) => (
            <li key={idx} className=" shadow rounded relative">
              <video
                src={vdo}
                autoPlay={true}
                loop={true}
                controls={true}
                className=" rounded"
              ></video>

              <span
                className=" absolute bottom-2 left-2 w-8 h-8 rounded-full bg-red-600 text-white z-10 flex items-center justify-center cursor-pointer transition hover:scale-[1.03]"
                onClick={() => handleDelete(vdo, idx, "video")}
              >
                <Trash2 size={22} />
              </span>
            </li>
          ))}
        </ul>
      )}
      {image.length > 0 && (
        <ul className=" flex flex-col gap-2 w-full">
          {image.map((img, idx) => (
            <li key={idx} className=" shadow rounded relative">
              <img src={img} alt="preview" className=" rounded w-full" />

              <span
                className=" absolute bottom-2 left-2 w-8 h-8 rounded-full bg-red-600 text-white z-10 flex items-center justify-center cursor-pointer transition hover:scale-[1.03]"
                onClick={() => handleDelete(img, idx, "image")}
              >
                <Trash2 size={22} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Preview;
