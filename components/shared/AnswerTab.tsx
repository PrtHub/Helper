import { getUserAnswers, getUserQuestions } from "@/lib/actions/user.action";
import QuestionCard from "../cards/QuestionCard";
import NoResult from "./NoResult";
import AnswerCard from "../cards/AnswerCard";

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = async ({ userId, clerkId, searchParams }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: 1,
  });
  return (
    <>
      {result.answers.map((item) => (
        <AnswerCard 
          key={item._id}
          clerkId={clerkId}
          _id={item._id}
          question={item.question}
          author={item.author}
          upvotes={item.upvotes.length}
          createdAt={item.createdAt}
        />  
      ))}
    </>
  );
};

export default AnswerTab;
