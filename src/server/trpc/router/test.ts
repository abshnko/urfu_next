import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const testRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ ctx, input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.test.findMany({
      where: {
        authorId: ctx.session?.user?.id,
      },
    });
  }),
  getById: publicProcedure
    .input(z.object({ testId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.test.findUnique({
        where: {
          id: input.testId,
        },
      });
    }),
});
