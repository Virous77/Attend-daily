/* eslint-disable react/display-name */
import { Separator } from "@radix-ui/react-dropdown-menu";
import React from "react";

type TimeType = {
  firstRef: string;
  data: string[];
  value: string;
  onChange: (value: string) => void;
};

const Time = React.forwardRef<HTMLDivElement, TimeType>(
  ({ firstRef, data, value, onChange }, ref) => {
    return (
      <div ref={ref}>
        {[firstRef, ...data.filter((val) => val !== firstRef)].map(
          (tag, idx) => (
            <React.Fragment key={idx}>
              <div
                className={`text-sm cursor-pointer hover:bg-accent p-3 ${
                  tag === value ? "text-green-500 bg-white" : ""
                }`}
                onClick={() => onChange(tag)}
              >
                {tag}
              </div>
              <Separator className="h-[1px] bg-accent" />
            </React.Fragment>
          )
        )}
      </div>
    );
  }
);

export default Time;
