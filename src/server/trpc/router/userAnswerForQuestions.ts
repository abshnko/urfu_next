import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const userAnswerForQuestion = router({
  getAllUserAnswers: publicProcedure
    .input(z.object({ userTestAnswerId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.userAnswerForQuestion.findMany({
        where: {
          userTestAnswerId: input.userTestAnswerId,
        },
      });
    }),
});
