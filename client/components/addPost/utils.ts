type ProcessFileType = {
  image: File[];
  video: File[];
  previewImage: string[];
  previewVideo: string[];
};

export const processFile = ({
  image,
  video,
  previewImage,
  previewVideo,
}: ProcessFileType) => {
  const file = [...image, ...video];
  const formData = new FormData();
  const uploadedImg = previewImage.filter((img) =>
    img.includes("https://res.cloudinary.com")
  );
  const uploadedVideo = previewVideo.filter((vdo) =>
    vdo.includes("https://res.cloudinary.com")
  );

  if (file.length > 0) {
    formData.append("file1", file[0]);
    formData.append("file2", file[1]);
    formData.append("file3", file[2]);
    formData.append("file4", file[3]);
  }

  return { file, formData, uploadedImg, uploadedVideo };
};

type UploadType = {
  length: number;
  formData: FormData;
  token: string | undefined;
};

export const uploadFiles = async ({ length, formData, token }: UploadType) => {
  let data;
  if (length > 0) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/upload`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    data = await response.json();
  }

  return { data };
};
