import { trpc } from "@/utils/trpc";
import React from "react";

const MyTests = () => {
  const { data, isLoading } = trpc.test.getAll.useQuery();

  if (isLoading) return <div>Тесты загружаются</div>;
  return (
    <div>
      <div>Tests</div>
      <div>
        {data?.map((t) => {
          return <div key={t.id}>{t.name}</div>;
        })}
      </div>
    </div>
  );
};

export default MyTests;
