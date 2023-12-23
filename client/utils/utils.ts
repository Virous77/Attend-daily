import moment from "moment";
import {
  Contact2,
  Home,
  LogOut,
  MessagesSquare,
  Palette,
  Search,
  ShieldCheck,
  User,
  Wallet,
} from "lucide-react";

export const getLocalData = (id: string) => {
  const localData = localStorage.getItem(id);
  return localData ? JSON.parse(localData) : null;
};

export const localAppError = {
  data: {
    message: "Something went wrong,Try again later",
    status: 400,
    success: false,
    stack: "",
    data: null,
  },
};

export const navLink = [
  {
    id: 1,
    name: "Home",
    link: "/feed",
    icon: Home,
  },
  {
    id: 2,
    name: "Search",
    link: "/search",
    icon: Search,
  },
  // {
  //   id: 3,
  //   name: "message",
  //   link: "/message",
  //   icon: MessagesSquare,
  // },
  // {
  //   id: 4,
  //   name: "Account",
  //   link: "/account",
  //   icon: Wallet,
  // },
  {
    id: 5,
    name: "Profile",
    link: "/profile",
    icon: Contact2,
  },
];

export const formatTimeAgo = (createdAt: Date) => {
  const now = moment();
  const createdMoment = moment(createdAt);
  const diffInMinutes = now.diff(createdMoment, "minutes");

  if (diffInMinutes < 1) {
    return `${diffInMinutes === 0 ? 1 : diffInMinutes} seconds ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else if (diffInMinutes < 1440) {
    const hoursAgo = Math.floor(diffInMinutes / 60);
    return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
  } else {
    const daysAgo = Math.floor(diffInMinutes / 1440);
    return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  }
};

export const previewFiles = (files: File[]) => {
  const PImages: string[] = [];
  const PVideos: string[] = [];
  const images: File[] = [];
  const videos: File[] = [];
  let error: string = "";

  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type.includes("image/")) {
        images.push(file);
        const newFile = URL.createObjectURL(file);
        PImages.push(newFile);
      } else {
        if (file.size > 10000000) {
          error = "File size must be below 10MB";
        } else {
          videos.push(file);
          const newFile = URL.createObjectURL(file);
          PVideos.push(newFile);
        }
      }
    }
  }

  return { images, videos, PImages, PVideos, error };
};

export const Tabs = [
  {
    name: "Account",
    icon: User,
  },
  {
    name: "Security",
    icon: ShieldCheck,
  },
  {
    name: "Theme",
    icon: Palette,
  },
  {
    name: "Logout",
    icon: LogOut,
  },
];
