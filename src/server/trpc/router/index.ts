// src/server/trpc/router/index.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { testRouter } from "./test";
import { questionRouter } from "./question";
import { answerRouter } from "./answer";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  test: testRouter,
  question: questionRouter,
  answer: answerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
