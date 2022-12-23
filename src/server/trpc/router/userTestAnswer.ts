import { router, publicProcedure, protectedProcedure } from "../trpc";
import { input, z } from "zod";

export const userTestAnswerRouter = router({
  submitTestAnswers: protectedProcedure
    .input(
      z.object({
        questionAnswers: z.array(
          z.object({ questionId: z.string(), userAnswerId: z.string() })
        ),
        testId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userTestAnswer = await ctx.prisma.userTestAnswer.create({
        data: {
          userId: ctx.session.user.id,
          testId: input.testId,
        },
      });
      const questionAnswersWithIds = input.questionAnswers.map((ans) => ({
        ...ans,
        userTestAnswerId: userTestAnswer.id,
      }));
      console.log("----------------------", questionAnswersWithIds);

      const answeredQuestions =
        await ctx.prisma.userAnswerForQuestion.createMany({
          data: questionAnswersWithIds,
        });

      return { success: true, answeredQuestions };
    }),
  getTestAnswers: publicProcedure
    .input(z.object({ testId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.userTestAnswer.findFirst({
        where: {
          testId: input.testId,
        },
      });
    }),
});
