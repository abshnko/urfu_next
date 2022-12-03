import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const questionRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ ctx, input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure
    .input(z.object({ testId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.question.findMany({
        where: {
          testId: input.testId,
        },
      });
    }),
});
