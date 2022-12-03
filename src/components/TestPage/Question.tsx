import React from "react";
import AnswerButton from "./AnswerButton";
import Button from "../Button/Button";
import Image from "next/image";
import CircleTimer from "../CircleTimer/CircleTimer";
import { Question } from "@prisma/client";
import { trpc } from "@/utils/trpc";

const Question = ({
  currentQuestion,
  chosenAnswerId,
  chooseAnswer,
  timer,
}: {
  currentQuestion: Question;
  chosenAnswerId: string | undefined;
  chooseAnswer: (id: string) => void;
  timer?: number;
}) => {
  const { data: answers, isLoading } = trpc.answer.getAll.useQuery({
    questionId: currentQuestion.id,
  });

  if (isLoading) return <div>Варианты ответов загружаются...</div>;
  return (
    <div className="question_area mt-[128px] flex w-max flex-1 flex-col items-center justify-center">
      {currentQuestion.isTimed && <CircleTimer timer={timer!} />}
      {currentQuestion.hasMedia ? (
        <div className="relative mt-[60px] mb-[20px] h-[400px] w-[600px]">
          <Image
            src={`/game_assets${currentQuestion.mediaSrc}`}
            alt="question"
            layout={"fill"}
            objectFit="contain"
          />
        </div>
      ) : null}
      <div className="question">{currentQuestion.text}</div>
      <div className="answers mt-[60px] grid grid-cols-2 gap-6">
        {answers?.map((answer: any) => {
          return (
            <AnswerButton
              onChooseAnswer={() => chooseAnswer(answer.id)}
              id={answer.id}
              isChecked={chosenAnswerId === answer.id}
              text={answer.text}
              key={answer.text}
            />
          );
        })}
      </div>
      <div className="buttons mt-[100px] grid grid-cols-2 items-center gap-12 self-end">
        <div className="text-sm font-medium uppercase text-darkGreen">
          Пропустить
        </div>
        <Button disabled={chosenAnswerId === undefined}>Ответить</Button>
      </div>
    </div>
  );
};

export default Question;
