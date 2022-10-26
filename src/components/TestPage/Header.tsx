import Image from "next/image";
import useTimer from "@/hooks/useTimer";

const Header = ({
  all,
  current,
  time,
}: {
  all: number;
  current: number;
  time?: number;
}) => {
  const timer = useTimer(time!);
  return (
    <div className="upper_row border-[##E0E0E0] flex h-[128px] w-full  items-center justify-between border-b-[1px] pl-[38px]">
      <div className="counters flex">
        <div className="mr-[30px] flex">
          <div className="relative h-9 w-9">
            <Image src={"/icons/question.svg"} alt="question" layout={"fill"} />
          </div>
          <div className="nums ml-[9px] text-2xl">{`${current}/${all}`}</div>
        </div>
        <div className="flex">
          <div className="relative h-9 w-9">
            <Image src={"/icons/clock.svg"} alt="question" layout={"fill"} />
          </div>
          {time && <div className="nums ml-[9px] text-2xl">{timer}</div>}
        </div>
      </div>
      <div className="game_name text-xl uppercase text-[#828282]">
        Русь и золотая орда
      </div>
      <div className="logo mr-8 flex w-[253px] justify-end">
        <div className="relative h-16 w-16">
          <Image src={"/icons/logo.svg"} alt="question" layout={"fill"} />
        </div>
      </div>
    </div>
  );
};

export default Header;
