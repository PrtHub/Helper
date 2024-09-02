import { getUserQuestions } from "@/lib/actions/user.action";
import QuestionCard from "../cards/QuestionCard";
import NoResult from "./NoResult";

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({ userId, clerkId, searchParams }: Props) => {
  const result = await getUserQuestions({
    userId,
    page: 1,
  });
  return (
    <>
      {result.questions.length > 0 ? (
        result.questions.map((question: any) => (
          <QuestionCard
            key={question._id}
            _id={question._id}
            clerkId={clerkId}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upvotes={question.upvotes}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
          />
        ))
      ) : (
        <NoResult
          title="There’s no post to show"
          description="Be the first to break the silence! 🚀 Create a post and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
          link="/ask-question"
          linkTitle="Create a post"
        />
      )}
    </>
  );
};

export default QuestionTab;
