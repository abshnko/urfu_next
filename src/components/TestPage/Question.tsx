import React, { Dispatch, SetStateAction, useEffect } from "react";
import AnswerButton from "./AnswerButton";
import Button from "../Button/Button";
import Image from "next/image";
import CircleTimer from "../CircleTimer/CircleTimer";
import { Question } from "@prisma/client";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { QuestionAnswer } from "@/types/types";
import { useSession } from "next-auth/react";

const Question = ({
  currentQuestion,
  chosenAnswerId,
  chooseAnswer,
  timer,
  allIds,
  testId,
  questionAnswers,
  setQuestionAnswers,
  setChosenAnswerId,
}: {
  currentQuestion: Question;
  chosenAnswerId: string | undefined;
  chooseAnswer: (id: string) => void;
  timer?: number;
  allIds: string[];
  testId: string;
  questionAnswers: QuestionAnswer[];
  setQuestionAnswers: any;
  setChosenAnswerId: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const { data: answers, isLoading } = trpc.answer.getAll.useQuery({
    questionId: currentQuestion.id,
  });
  const router = useRouter();
  const submitMutation = trpc.userTestAnswer.submitTestAnswers.useMutation();
  const { data } = useSession();

  const answerAndGoToNextQuestion = () => {
    const arrCopy = [...questionAnswers];
    const maybeFound = arrCopy.findIndex(
      (obj) => obj.questionId === currentQuestion.id
    );
    if (maybeFound === -1) {
      arrCopy.push({
        questionId: currentQuestion.id,
        userAnswerId: chosenAnswerId!,
      });
    } else {
      arrCopy[maybeFound] = {
        questionId: currentQuestion.id,
        userAnswerId: chosenAnswerId!,
      };
    }
    setQuestionAnswers(arrCopy);

    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    const currId = currentQuestion.id;
    const currIndex = allIds.findIndex((id) => id === currId);
    if (currIndex !== -1 && currIndex !== allIds.length - 1) {
      router.push(`/test/${testId}/${allIds[currIndex + 1]}`);
      setChosenAnswerId(undefined);
    }
  };

  const submitTestResult = () => {
    const arrCopy = [...questionAnswers];
    const maybeFound = arrCopy.findIndex(
      (obj) => obj.questionId === currentQuestion.id
    );
    if (maybeFound === -1) {
      arrCopy.push({
        questionId: currentQuestion.id,
        userAnswerId: chosenAnswerId!,
      });
    } else {
      arrCopy[maybeFound] = {
        questionId: currentQuestion.id,
        userAnswerId: chosenAnswerId!,
      };
    }
    answerAndGoToNextQuestion();
    submitMutation.mutate({ questionAnswers: [...arrCopy], testId: testId });
    router.push(`/${testId}/results`);
  };

  useEffect(() => {
    setChosenAnswerId(
      questionAnswers.find((qa) => qa.questionId === currentQuestion.id)
        ?.userAnswerId || undefined
    );
  }, [currentQuestion.id]);

  useEffect(() => {
    console.log("chosenAnswerId changed: ", chosenAnswerId);
  }, [chosenAnswerId]);

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
        <div
          className="text-sm font-medium uppercase text-darkGreen"
          onClick={goToNextQuestion}
        >
          Пропустить
        </div>
        {allIds.findIndex((id) => id === currentQuestion.id) ===
        allIds.length - 1 ? (
          <Button onClick={submitTestResult}>Отправить тест</Button>
        ) : (
          <Button
            disabled={
              questionAnswers.find(
                (qa) => qa.questionId === currentQuestion.id
              ) === undefined && chosenAnswerId === undefined
            }
            onClick={answerAndGoToNextQuestion}
          >
            Ответить
          </Button>
        )}
      </div>
    </div>
  );
};

export default Question;
