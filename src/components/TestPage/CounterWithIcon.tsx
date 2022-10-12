import React from "react";
import Image from "next/image";

const CounterWithIcon = ({
  numbers,
  icon,
}: {
  numbers: string;
  icon: string;
}) => {
  return (
    <div className="flex">
      <div className="relative h-9 w-9">
        <Image src={"/icons/question.svg"} alt="question" layout={"fill"} />
      </div>
      <div className="nums ml-[9px] text-2xl">{numbers}</div>
    </div>
  );
};

export default CounterWithIcon;
