import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Link from "next/link";
import Metric from "../shared/Metric";
import { ThumbsUp } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface AnswerProps {
    clerkId?: string | null;
    _id: string;
    question: {
      _id: string;
      title: string;
    };
    author: {
      _id: string;
      clerkId: string;
      name: string;
      picture: string;
    };
    upvotes: number;
    createdAt: Date;
    answer?: string
  }

const AnswerCard = ({_id, clerkId, question, author, upvotes, createdAt} : AnswerProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId
  return (
    <Link
      href={`/question/${question._id}/#${_id}`}
      className="card-wrapper rounded-[10px] px-11 py-9"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row font-inter">
        <div>
          <span className="subtle-regular text-dark-400 dark:text-light-700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <h3 className="sm:h3-semibold base-semibold text-dark-200 dark:text-light-900 line-clamp-1 flex-1">
            {question.title}
          </h3>
        </div>
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)}/>
          )}
        </SignedIn>
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
         icon={author?.picture}
          value={author.name}
          title={` • answerd ${getTimestamp(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          textStyles="body-medium text-dark400_light700"
          isAuthor
        />

        <div className="flex-center gap-3">
          <Metric
            icon={ThumbsUp}
            value={formatAndDivideNumber(upvotes)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </Link>
  )
}

export default AnswerCard