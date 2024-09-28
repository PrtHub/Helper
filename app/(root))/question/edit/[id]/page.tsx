import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const result = await getQuestionById({ questionId: params.id });
  
  return {
    title: `${result.title} | Helper`,
  };
}

const QuestionEditPage = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  const result = await getQuestionById({
    questionId: params.id,
  });

  return (
    <>
      <h1 className="h1-bold text-dark-100 dark:text-light-900">
        Edit Question
      </h1>

      <div className="mt-9">
        <Question
          type="Edit"
          mongoUserId={mongoUser._id}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </>
  );
};

export default QuestionEditPage;
