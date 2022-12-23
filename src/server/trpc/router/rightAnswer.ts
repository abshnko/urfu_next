import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const rightAnswerRouter = router({
  getRightAnswers: publicProcedure
    .input(z.object({ questionIds: z.array(z.string()) }))
    .query(async ({ ctx, input }) => {
      console.log("================QUESTION IDS: ", input.questionIds);

      return await ctx.prisma.rightAnswer.findMany({
        where: {
          questionId: {
            in: [...input.questionIds],
          },
        },
      });
    }),
});
