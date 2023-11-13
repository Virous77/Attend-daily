import React from "react";

type PollType = {
  onClose: () => void;
};

const Poll: React.FC<PollType> = ({ onClose }) => {
  return <div>Poll</div>;
};

export default Poll;
