import { FiFilePlus } from "react-icons/fi";
import usePost, { TFile } from "@/hooks/usePost";
import { ChangeEvent, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { previewFiles } from "@/utils/utils";

type TempFileType = {
  image: File[];
  video: File[];
};

const FileUpload = () => {
  const { setFormData, formData } = usePost();
  const [preview, setPreview] = useState<TFile>({
    image: [],
    video: [],
  });
  const [tempFileStore, setTempFileStore] = useState<TempFileType>({
    image: [],
    video: [],
  });

  const handleValidate = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 4) {
      getValidatedFiles([...e.target.files].slice(0, 4));
      toast({
        title: "Only 4 files accepted.",
        variant: "destructive",
        duration: 3000,
      });
      e.preventDefault();
    } else {
      if (e.target.files) {
        getValidatedFiles([...e.target.files]);
      }
    }
  };

  const getValidatedFiles = (e: File[]) => {
    const { images, videos, PImages, PVideos } = previewFiles(e);
    setPreview((prev) => ({ ...prev, image: PImages, video: PVideos }));
    setTempFileStore((prev) => ({ ...prev, video: videos, image: images }));
  };

  return (
    <>
      <div className=" border-dotted border-local p-4 flex items-center justify-center  mt-6 ml-14">
        <input
          type="file"
          id="fileInput"
          multiple
          className=" hidden"
          onChange={handleValidate}
        />
        <label htmlFor="fileInput" className="flex items-center gap-3">
          <FiFilePlus size={22} />
          <p className=" text-[13px]">Add photo / video (4 max)</p>
        </label>
      </div>
    </>
  );
};

export default FileUpload;
