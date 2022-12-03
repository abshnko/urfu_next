import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const answerRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ ctx, input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure
    .input(z.object({ questionId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.answer.findMany({
        where: {
          questionId: input.questionId,
        },
      });
    }),
});
