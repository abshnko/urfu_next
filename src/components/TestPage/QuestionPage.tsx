import { useEffect, useState } from "react";
import { data } from "data";
import Question from "./Question";
import Header from "./Header";
import QuestionList from "./QuestionList";
import { trpc } from "@/utils/trpc";
import { Question as QuestionType } from "@prisma/client";
import { useSession } from "next-auth/react";
import useLocalStorage from "use-local-storage";
import { QuestionAnswer } from "@/types/types";

const QuestionPage = ({
  questionId,
  testId,
}: {
  questionId: string;
  testId: string;
}) => {
  const { data: questions, isLoading } = trpc.question.getAll.useQuery({
    testId: testId as string,
  });
  const { data: session } = useSession();

  const [questionAnswers, setQuestionAnswers] = useLocalStorage<
    QuestionAnswer[]
  >("testAnswers", []);

  const [currentQuestion, setCurrentQuestion] = useState<
    QuestionType | undefined
  >(undefined);
  const [chosenAnswerId, setChosenAnswerId] = useState<string | undefined>(
    undefined
  );
  const [ids, setIds] = useState<string[]>([]);

  const chooseAnswer = (id: string) => {
    setChosenAnswerId(id);
  };

  useEffect(() => {
    if (questions) {
      setCurrentQuestion(questions.find((q) => q.id === questionId));
      setIds(questions.map((q) => q.id));
    }
  }, [questions, questionId]);

  if (isLoading) return <div>Вопрос загружается...</div>;

  return (
    <div className="flex min-h-screen flex-col">
      <QuestionList
        testId={testId}
        questions={questions}
        currentQuestionId={questionId}
        allIds={ids}
      />
      <div className="ml-[100px] flex w-[calc(100%-100px)] flex-col items-center">
        <Header
          all={data.test.questions.length}
          current={ids.indexOf(questionId) + 1}
          time={data.test.isTimed ? data.test.timeInMinutes : undefined}
        />
        {currentQuestion && questions && (
          <Question
            timer={
              currentQuestion.isTimed && currentQuestion.timeInSeconds
                ? currentQuestion.timeInSeconds
                : undefined
            }
            chooseAnswer={chooseAnswer}
            chosenAnswerId={chosenAnswerId}
            currentQuestion={currentQuestion}
            allIds={ids}
            testId={testId}
            questionAnswers={questionAnswers}
            setQuestionAnswers={setQuestionAnswers}
            setChosenAnswerId={setChosenAnswerId}
          />
        )}
      </div>
      <div className="footer h-28 w-[calc(100%-100px)]"></div>
    </div>
  );
};

export default QuestionPage;
