import { AnswerFilters } from "@/lib/constant";
import Filter from "./Filter";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";
import Pagination from "./Pagination";

interface AllAnswersProps {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: AllAnswersProps) => {
  const result = await getAnswers({
    questionId: questionId,
    page: page ? +page : 1,
    sortBy: filter,
  });

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {totalAnswers} {totalAnswers === 1 ? "Answer" : "Answers"}
        </h3>

        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {result.answers.length > 0 ? (
          result.answers.map((answer) => (
            <article key={answer._id} className="light-border border-b py-10">
              <div className="flex items-center justify-between">
                <section className="flex-1 mb-4 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                  <Link
                    href={`/profile/${answer.author.clerkId}`}
                    className="flex flex-1 gap-1 items-start"
                  >
                    <Image
                      src={answer.author.picture}
                      width={30}
                      height={30}
                      alt="profile"
                      className="rounded-full object-cover max-sm:mt-0.5"
                    />
                    <div className="flex flex-col sm:items-start">
                      <p className="body-semibold text-dark300_light700">
                        {answer.author.name}
                      </p>

                      <p className="small-regular text-light-400 dark:text-light-500 ml-0.5 mt-0.5 line-clamp-1">
                        {getTimestamp(answer.createdAt)}
                      </p>
                    </div>
                  </Link>
                  <div className="flex justify-end">
                    <Votes
                      type="Answer"
                      userId={JSON.stringify(userId)}
                      itemId={JSON.stringify(answer?._id)}
                      upvotes={answer.upvotes.length}
                      downvotes={answer.downvotes.length}
                      hasupVoted={answer.upvotes.includes(userId)}
                      hasdownVoted={answer.downvotes.includes(userId)}
                    />
                  </div>
                </section>
              </div>
              <ParseHTML data={answer.content} />
            </article>
          ))
        ) : (
          <div>No answers yet</div>
        )}
      </div>
      <div className="mt-10 w-full">
        <Pagination 
          pageNumber={page ? +page : 1}
          isNext={result.isNextAnswer}
        />
      </div>
    </section>
  );
};

export default AllAnswers;
