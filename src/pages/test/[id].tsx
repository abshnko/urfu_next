import TestPage from "@/components/TestPage/TestPage";
import { useRouter } from "next/router";

const Question = () => {
  const { id } = useRouter().query;
  console.log(id);

  return <TestPage id={id as string} />;
};

export default Question;
