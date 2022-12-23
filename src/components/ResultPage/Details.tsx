import { trpc } from "@/utils/trpc";
import React, { useEffect } from "react";

const Details = ({
  questionIds,
  userAnswers,
}: {
  questionIds: string[];
  userAnswers: any[];
}) => {
  console.log("QUESTION IDS: ", questionIds);

  const { data: rightAnswers } = trpc.rightAnswer.getRightAnswers.useQuery({
    questionIds,
  });
  console.log("RIGHT ANSWERS: ", rightAnswers);
  const arr = [];

  console.log("USER ANSWERS: ", userAnswers);

  useEffect(() => {
    userAnswers.forEach((userA) => {
      const questionId = userA.questionId;
      const index = rightAnswers?.findIndex(
        (ra) =>
          ra.questionId === questionId && ra.answerId === userA.userAnswerId
      );
      console.log("INDEX: ", index);

      if (index !== -1) {
        arr.push(userA);
      }
    });
  }, []);

  return (
    <div>
      <div>{`${arr.length} из ${questionIds.length}`}</div>
    </div>
  );
};

export default Details;
