import React, { useEffect, useState } from "react";
import { data } from "data";
import Question from "./Question";
import Header from "./Header";
import QuestionList from "./QuestionList";

const TestPage = () => {
  const questions = data.questions;
  const [currentQuestionId, setCurrentQuestionId] = useState(questions[0]?.id);
  const [currentQuestion, setCurrentQuestion] = useState<typeof questions[0]>();
  const [chosenAnswerId, setChosenAnswerId] = useState<number | undefined>(
    undefined
  );
  console.log(currentQuestionId);
  console.log(questions.find((q) => q.id === currentQuestionId)?.text);

  useEffect(() => {
    setCurrentQuestion(questions.find((q) => q.id === currentQuestionId));
    setChosenAnswerId(undefined);
  }, [currentQuestionId]);

  const chooseAnswer = (id: number) => {
    setChosenAnswerId(id);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <QuestionList
        questions={questions}
        setCurrentQuestionId={setCurrentQuestionId}
      />
      <div className="ml-[100px] flex w-[calc(100%-100px)] flex-col items-center">
        <Header />
        {currentQuestion && (
          <Question
            chooseAnswer={chooseAnswer}
            chosenAnswerId={chosenAnswerId}
            currentQuestion={currentQuestion}
          />
        )}
      </div>
      <div className="footer h-28 w-[calc(100%-100px)]"></div>
    </div>
  );
};

export default TestPage;
