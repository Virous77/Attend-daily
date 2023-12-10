import { ChangeEvent } from "react";
import { previewFiles } from "@/utils/utils";
import { usePost } from "@/store/usePostContext";
import { FileUp } from "lucide-react";
import useToast from "@/hooks/useToast";

const FileUpload = () => {
  const { setPreview, setTempFileStore, preview, status } = usePost();
  const size = preview.image.length + preview.video.length;
  const { notify } = useToast();

  const handleValidate = (e: ChangeEvent<HTMLInputElement>, size: number) => {
    if (e.target.files && e.target.files.length > 4) {
      getValidatedFiles([...e.target.files].slice(0, 4), size);
      notify("Only 4 files accepted.");
      e.preventDefault();
    } else {
      if (e.target.files) {
        getValidatedFiles([...e.target.files], size);
      }
    }
  };

  const getValidatedFiles = (e: File[], size: number) => {
    const { images, videos, PImages, PVideos, error } = previewFiles(e);
    const latestSelect = PImages.length + PVideos.length;

    if (size < 4 && latestSelect < 4) {
      setPreview((prev) => ({
        ...prev,
        image: [...prev.image, ...PImages],
        video: [...prev.video, ...PVideos],
      }));
      setTempFileStore((prev) => ({
        ...prev,
        video: [...prev.video, ...videos],
        image: [...prev.image, ...images],
      }));
    } else if (!error) {
      setPreview((prev) => ({
        ...prev,
        image: PImages,
        video: PVideos,
      }));
      setTempFileStore((prev) => ({
        ...prev,
        video: videos,
        image: images,
      }));
    } else {
      if (error) {
        notify(error.toString());
      }
    }

    if (error) {
      notify(error.toString());
    }
  };

  return (
    <>
      <div className=" border-dotted border-local p-4 flex items-center justify-center  mt-6">
        <input
          type="file"
          id="fileInput"
          multiple
          className=" hidden"
          onChange={(e) => handleValidate(e, size)}
          maxLength={4}
          max={4}
          disabled={status.isLoading}
        />
        <label htmlFor="fileInput" className="flex items-center gap-3">
          <FileUp size={22} />
          <p className=" text-[13px]">Add photo / video (4 max)</p>
        </label>
      </div>
    </>
  );
};

export default FileUpload;
