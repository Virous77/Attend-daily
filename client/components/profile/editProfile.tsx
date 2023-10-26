/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Sheet, SheetContent, SheetFooter } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Avatar } from "@nextui-org/react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { StateType } from "./userData";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type EditProfileProps = {
  open: StateType;
  setOpen: React.Dispatch<React.SetStateAction<StateType>>;
};

const EditProfile: React.FC<EditProfileProps> = ({ open, setOpen }) => {
  const [color, setColor] = useState<"primary" | "secondary" | undefined>(
    undefined
  );

  const handleImagePreview = (file: React.ChangeEvent<HTMLInputElement>) => {
    if (file.target.files && file.target.files.length > 0) {
      const previewImage = URL.createObjectURL(file.target.files[0]);
      setOpen((prev) => ({
        ...prev,
        previewImage: previewImage,
        image: file.target.files ? file.target.files[0] : null,
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOpen((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = () => {
    const { image, name, email, bio } = open;
    const packet = { image, name, email, bio };
    console.log(packet);
  };

  return (
    <Sheet
      open={open.active}
      onOpenChange={() => setOpen((prev) => ({ ...prev, active: false }))}
    >
      <SheetContent side="right" className="w-full" closeButton={true}>
        <div className="mt-10 w-full flex items-center justify-center relative">
          <Avatar
            isBordered
            color={color}
            src={open?.previewImage}
            alt={open?.name}
            className="w-[120px] h-[120px]"
          />
          <label
            className="-bottom-[10%] absolute z-[100] left-[46%] bg-foreground w-8 h-8 rounded-full text-accent flex items-center justify-center cursor-pointer"
            htmlFor="image"
          >
            <AiOutlineCloudUpload size={20} />
          </label>
          <input
            type="file"
            id="image"
            className="hidden"
            onChange={handleImagePreview}
          />
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2 mt-16">
            <Label>Name</Label>
            <Input value={open.name} name="name" onChange={handleChange} />
          </div>

          <div className="flex flex-col gap-2 mt-8">
            <Label htmlFor="email">Email</Label>
            <Input
              value={open.email}
              name="email"
              id="email"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2 mt-8">
            <Label htmlFor="bio">Bio</Label>
            <Input
              value={open.bio}
              name="bio"
              id="bio"
              onChange={handleChange}
            />
          </div>
          <SheetFooter className="mt-5">
            <Button onClick={handleUpdateProfile}>Save changes</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditProfile;
