"use client";

import { useLayoutEffect, useState } from "react";
import Logo from "../../public/AppImages/android-chrome-512x512.png";
import Image from "next/image";

const View = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);
  function updateScreenStatus() {
    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const isMobile = screenWidth < 768;
    setIsMobile(isMobile);
  }

  function debounce(func: any, delay: number) {
    let timeoutId: any;
    return function () {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };
  }

  const debouncedUpdateScreenStatus = debounce(updateScreenStatus, 200);
  window.addEventListener("resize", debouncedUpdateScreenStatus);

  useLayoutEffect(() => {
    updateScreenStatus();
  }, []);

  if (!isMobile) {
    return (
      <main className=" w-full h-screen bg-background flex items-center justify-center">
        <div className=" flex items-center justify-center flex-col">
          <Image src={Logo.src} alt="ChatX" width={200} height={200} />
          <div className=" w-[50%] text-center">
            <p>
              I building this app with the prospective of making it full PWA
              friendly. This is the reason i don&apos;t work on to make it
              desktop friendly.
            </p>

            <p className="mt-3">
              Still If you prefer using the application on a desktop, you have
              the option to install configure your display settings to a width
              of 768 pixels or lower. or you can configure you browser width
              too. This will optimize the user experience for desktop access.
            </p>
          </div>
        </div>
      </main>
    );
  } else {
    return <main>{children}</main>;
  }
};

export default View;
