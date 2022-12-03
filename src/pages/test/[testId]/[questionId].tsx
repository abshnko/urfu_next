import QuestionPage from "@/components/TestPage/QuestionPage";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

const Question = () => {
  const { questionId, testId } = useRouter().query;

  return (
    <QuestionPage questionId={questionId as string} testId={testId as string} />
  );
};

export default Question;
