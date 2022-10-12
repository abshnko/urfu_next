import React from "react";
import Image from "next/image";

const QuestionList = ({
  questions,
  setCurrentQuestionId,
}: {
  questions: any;
  setCurrentQuestionId: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
}) => {
  return (
    <div className="nav_column fixed h-screen w-[100px] shadow-lg">
      <div className="arrow_back flex h-[128px] items-center justify-center">
        <div className="relative h-[18px] w-[10px]">
          <Image src={"/icons/arrow_left.svg"} alt="question" layout={"fill"} />
        </div>
      </div>
      <div className="questions_list">
        {questions.map((q: any, i: number) => {
          return (
            <div
              onClick={() => setCurrentQuestionId(q.id)}
              className="mx-auto w-[34px] cursor-pointer border-b border-b-[#E0E0E0] py-[12px] text-center"
              key={q.id}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionList;
