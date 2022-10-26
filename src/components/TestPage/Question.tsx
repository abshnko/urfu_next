import React from "react";
import { data } from "data";
import AnswerButton from "./AnswerButton";
import Button from "../Button/Button";
import Image from "next/image";
import CircleTimer from "../CircleTimer/CircleTimer";

const Question = ({
  currentQuestion,
  chosenAnswerId,
  chooseAnswer,
  timer,
}: {
  currentQuestion: typeof data.test.questions[0];
  chosenAnswerId: string | undefined;
  chooseAnswer: (id: string) => void;
  timer?: number;
}) => {
  return (
    <div className="question_area mt-[128px] flex w-max flex-1 flex-col items-center justify-center">
      {currentQuestion.isTimed && <CircleTimer timer={timer!} />}
      {currentQuestion.hasMedia && currentQuestion.mediaType === "img" ? (
        <div className="relative mt-[60px] mb-[20px] h-[400px] w-[600px]">
          <Image
            src={`/game_assets${currentQuestion.mediaSrc}`}
            alt="question"
            layout={"fill"}
            objectFit="contain"
          />
        </div>
      ) : (
        <div>Other type of media</div>
      )}
      <div className="question">{currentQuestion.text}</div>
      <div className="answers mt-[60px] grid grid-cols-2 gap-6">
        {currentQuestion.answers.map((answer: any) => {
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
