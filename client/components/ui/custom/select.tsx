import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectProps = {
  data: string[];
  value: string;
  onChange: (e: string) => void;
  placeHolder: string;
  label?: string;
  className: string;
};

const SelectComp: React.FC<SelectProps> = ({
  data,
  value,
  onChange,
  placeHolder,
  label,
  className,
}) => {
  return (
    <Select value={value} onValueChange={(e) => onChange(e)}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {data.map((value, idx) => (
            <SelectItem
              key={idx}
              value={value.toLowerCase()}
              className="font-bold"
            >
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectComp;
