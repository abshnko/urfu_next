import Button from "@/components/Button/Button";
import TestPage from "@/components/TestPage/QuestionPage";
import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Index = () => {
  const { testId } = useRouter().query;
  const { data: test, isLoading } = trpc.test.getById.useQuery({
    testId: testId as string,
  });
  const { data: questions, isLoading: isLoadingQuestions } =
    trpc.question.getAll.useQuery({ testId: testId as string });
  return (
    <div>
      <div>Страница с информацией о тесте</div>
      {isLoading ? (
        <div>Информация загружается...</div>
      ) : (
        <div>
          <div>{test?.name}</div>
          <Link
            href={`${testId}/${questions && questions[0]?.id}`}
            className={isLoadingQuestions ? "pointer-events-none" : ""}
          >
            <Button disabled={isLoadingQuestions}>Начать тест</Button>
          </Link>
        </div>
      )}
      <div></div>
    </div>
  );
};

export default Index;
