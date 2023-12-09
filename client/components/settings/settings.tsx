import Header from "@/common/header";
import TabList from "./tab-list";
import AccountData from "./account/account-data";

const SettingsComp = () => {
  return (
    <main>
      <Header name="Settings" />
      <section className=" mt-16">
        <p className=" text-center tracking-[6px] text-[13px]">
          CHAT-X VERSION {process.env.NEXT_PUBLIC_APP_VERSION}
        </p>
        <TabList />
      </section>
    </main>
  );
};

export default SettingsComp;
