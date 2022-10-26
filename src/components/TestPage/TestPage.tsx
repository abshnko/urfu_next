import { useState } from "react";
import { data } from "data";
import Question from "./Question";
import Header from "./Header";
import QuestionList from "./QuestionList";

const TestPage = ({ id }: { id: string }) => {
  const questions = data.test.questions;
  const currentQuestion = questions.find((q) => q.id === id);
  const [chosenAnswerId, setChosenAnswerId] = useState<string | undefined>(
    undefined
  );
  const ids = questions.map((q) => q.id);

  const chooseAnswer = (id: string) => {
    setChosenAnswerId(id);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <QuestionList questions={questions} currentQuestionId={id} allIds={ids} />
      <div className="ml-[100px] flex w-[calc(100%-100px)] flex-col items-center">
        <Header
          all={data.test.questions.length}
          current={ids.indexOf(id) + 1}
          time={data.test.isTimed ? data.test.timeInMinutes : undefined}
        />
        {currentQuestion && (
          <Question
            timer={
              currentQuestion.isTimed
                ? currentQuestion.timeInSeconds
                : undefined
            }
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
