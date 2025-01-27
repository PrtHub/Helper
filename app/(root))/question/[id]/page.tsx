import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { Clock, Eye, MessageCircle } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const result = await getQuestionById({ questionId: params.id });
  
  return {
    title: `${result.title} | Helper`,
  };
}

const QuestionPage = async ({ params, searchParams }: any) => {
  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  const result = await getQuestionById({ questionId: params.id });

  return (
    <>
      <section className="w-full flex-col flex-start font-inter">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${result.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.author.picture}
              className="rounded-full"
              width={22}
              height={22}
              alt="profile"
            />
            <p className="paragraph-semibold text-dark-300 dark:text-light-700">
              {result.author.name}
            </p>
          </Link>
          <span className="flex justify-end">
            <Votes
              type="Question"
              userId={JSON.stringify(mongoUser?._id)}
              itemId={JSON.stringify(result._id)}
              upvotes={result.upvotes.length}
              downvotes={result.downvotes.length}
              hasupVoted={result.upvotes.includes(mongoUser?._id)}
              hasdownVoted={result.downvotes.includes(mongoUser?._id)}
              hasSaved={mongoUser?.saved.includes(result._id)}
            />
          </span>
        </div>
        <h2 className="h2-semibold font-[500] text-dark-200 dark:text-light-900 mt-3.5 w-full text-left">
          {result.title.charAt(0).toUpperCase() + result.title.slice(1)}
        </h2>
      </section>

      <section className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          icon={Clock}
          value={` asked ${getTimestamp(result.createdAt)}`}
          title="Asked"
          textStyles="small-medium text-dark-400 dark:text-light-800"
        />
        <Metric
          icon={MessageCircle}
          value={formatAndDivideNumber(result.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark-400 dark:text-light-800"
        />
        <Metric
          icon={Eye}
          value={formatAndDivideNumber(result.views)}
          title=" Views"
          textStyles="small-medium text-dark-400 dark:text-light-800"
        />
      </section>

      <ParseHTML data={result.content} />

      <section className="mt-8 flex flex-wrap gap-2">
        {result.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </section>

      <AllAnswers
        questionId={result._id}
        userId={mongoUser?._id}
        totalAnswers={result.answers.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
      />

      <Answer
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(mongoUser?._id)}
      />
    </>
  );
};

export default QuestionPage;
