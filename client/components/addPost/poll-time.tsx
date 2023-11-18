import { DatePickerComp } from "../ui/custom/date-picker";
import TimePicker from "../ui/custom/time-picker";

const PollTime = () => {
  return (
    <div className=" mt-6 pb-3 pl-14">
      <h1
        className=" uppercase opacity-75 pb-2 pl-1"
        style={{ letterSpacing: "3px" }}
      >
        Set Expiry timer
      </h1>

      <div className=" flex items-center justify-between">
        <DatePickerComp />
        <TimePicker />
      </div>
    </div>
  );
};

export default PollTime;
