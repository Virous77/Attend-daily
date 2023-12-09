import { Tab, Tabs } from "@nextui-org/react";
import { BarChart3, FileText, Table2 } from "lucide-react";
import React from "react";

type TabProps = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
};

const TabComp: React.FC<TabProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        variant="underlined"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-divider",
          cursor: "w-full bg-[#16a34a]",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#16a34a]",
        }}
        onSelectionChange={(e) => {
          if (typeof e === "string") {
            setActiveTab(e);
          }
        }}
      >
        <Tab
          key="feed"
          title={
            <div className="flex items-center space-x-2">
              <Table2 size={20} />
              <span className=" text-[16px]">Feed</span>
            </div>
          }
        />
        <Tab
          key="post"
          title={
            <div className="flex items-center space-x-2">
              <FileText size={20} />
              <span className=" text-[16px]">Post</span>
            </div>
          }
        />
        <Tab
          key="poll"
          title={
            <div className="flex items-center space-x-2">
              <BarChart3 size={20} />
              <span className=" text-[16px]">Poll</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
};

export default TabComp;
