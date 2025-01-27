import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Link from "next/link";
import RenderTag from "@/components/shared/RenderTag";
import Metric from "@/components/shared/Metric";
import { Eye, MessageCircle, ThumbsUp, User } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface QuestionProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?: string | null;
}

const QuestionCard = ({
  _id,
  clerkId,
  title,
  answers,
  author,
  createdAt,
  upvotes,
  views,
  tags,
}: QuestionProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <div className="card-wrapper rounded-[10px] p-5 sm:p-9 sm:px-11 dark:border-none border space-y-5">
      <section className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark-400 dark:text-light-700 line-clamp-1 flex sm:hidden">
            {createdAt && getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold font-inter font-[500] text-dark-100 dark:text-light-900 line-clamp-1 flex-1">
              {title.charAt(0).toUpperCase() + title.slice(1)}
            </h3>
          </Link>
        </div>
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </section>

      <section className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </section>

      <section className="flex-between mt-6 w-full flex-wrap gap-3 font-inter">
        <Metric
          icon={author?.picture}
          value={author.name}
          title={` - asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="body-medium text-dark-400 dark:text-light-700"
        />

        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            icon={ThumbsUp}
            value={formatAndDivideNumber(upvotes.length)}
            title=" Votes"
            textStyles="small-medium text-dark-400 dark:text-light-800"
          />

          <Metric
            icon={MessageCircle}
            value={formatAndDivideNumber(answers.length)}
            title=" Answers"
            textStyles="small-medium text-dark-400 dark:text-light-800"
          />
          <Metric
            icon={Eye}
            value={formatAndDivideNumber(views)}
            title=" Views"
            textStyles="small-medium text-dark-400 dark:text-light-800"
          />
        </div>
      </section>
    </div>
  );
};

export default QuestionCard;
