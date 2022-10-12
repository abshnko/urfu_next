import React from "react";
import RadioButton from "../RadioButton/RadioButton";

const AnswerButton = ({
  text,
  isChecked,
  id,
  onChooseAnswer,
}: {
  text: string;
  isChecked: boolean;
  id: number;
  onChooseAnswer: () => void;
}) => {
  return (
    <div
      className="w-[400px]  cursor-pointer rounded py-4 pr-[72px] pl-[14px] shadow-lg"
      onClick={onChooseAnswer}
    >
      <RadioButton checked={isChecked} label={text} value={text} />
    </div>
  );
};

export default AnswerButton;
