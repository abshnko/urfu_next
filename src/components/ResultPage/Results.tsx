import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Details from "./Details";

const Results = () => {
  const { testId } = useRouter().query;
  const { data } = trpc.userTestAnswer.getTestAnswers.useQuery({
    testId: testId as string,
  });
  const [rightAnswers, setRightAnswers] = useState(0);
  const [questionIds, setQuestionIds] = useState<string[]>([]);

  const { data: userAnswers } =
    trpc.userAnswerForQuestion.getAllUserAnswers.useQuery({
      userTestAnswerId: data?.id!,
    });
  const [userTestAnswer, setUserTestAnswer] = useState("");
  console.log("ANSWERS: ", userAnswers);

  useEffect(() => {
    if (data) {
      setUserTestAnswer(data.id);
    }
  }, [data]);

  useEffect(() => {
    if (userAnswers) {
      setQuestionIds(userAnswers.map((answer) => answer.questionId));
    }
  }, [userAnswers]);

  if (!questionIds || questionIds.length < 1 || !userAnswers) {
    return null;
  }

  return (
    <div>
      <div>Результаты теста: </div>
      <Details questionIds={questionIds} userAnswers={userAnswers} />
    </div>
  );
};

export default Results;
