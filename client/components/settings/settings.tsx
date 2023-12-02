import Header from "@/common/header";

const SettingsComp = () => {
  return (
    <main>
      <Header name="Settings" />
      <section className=" mt-16">
        <p className=" text-center tracking-[6px] text-[13px]">
          CHAT-X VERSION {process.env.NEXT_PUBLIC_APP_VERSION}
        </p>
      </section>
    </main>
  );
};

export default SettingsComp;
