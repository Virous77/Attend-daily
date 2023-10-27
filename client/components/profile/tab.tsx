import React from "react";

type TabProps = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
};

const Tab: React.FC<TabProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ["Feed", "Posts", "Polls"];

  return (
    <div className=" flex items-center gap-5">
      {tabs.map((tab) => (
        <span
          key={tab}
          className={`text-[15px] font-bold ${
            activeTab === tab.toLowerCase()
              ? "pb-1 border-b-2 border-[green]"
              : "opacity-70 pb-[6.3px]"
          } cursor-pointer`}
          onClick={() => setActiveTab(tab.toLowerCase())}
        >
          {tab}
        </span>
      ))}
    </div>
  );
};

export default Tab;
