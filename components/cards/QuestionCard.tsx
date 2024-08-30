import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Link from "next/link";
import RenderTag from "@/components/shared/RenderTag";
import Metric from "@/components/shared/Metric";
import { Eye, MessageCircle, ThumbsUp, User } from "lucide-react";

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
  };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  title,
  answers,
  author,
  createdAt,
  upvotes,
  views,
  tags,
}: QuestionProps) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <section className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark-400 dark:text-light-700 line-clamp-1 flex sm:hidden">
            {createdAt && getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </section>

      <section className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </section>

      <section className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          icon={author?.picture}
          value={author.name}
          title={` - asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="body-medium text-dark-400 dark:text-light-700"
        />

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
      </section>
    </div>
  );
};

export default QuestionCard;
