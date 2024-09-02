import { getUserAnswers } from "@/lib/actions/user.action";
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
          // answer={item.content}
          author={item.author}
          upvotes={item.upvotes.length}
          createdAt={item.createdAt}
        />  
      ))}
    </>
  );
};

export default AnswerTab;
