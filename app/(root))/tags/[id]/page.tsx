import QuestionCard from "@/components/cards/QuestionCard";
import LocalSearchbar from "@/components/search/LocalSearchbar";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import { getQuestionsByTagId } from "@/lib/actions/tags.action";
import { QuestionFilters } from "@/lib/constant";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const result = await getQuestionsByTagId({ tagId: params.id });
  
  return {
    title: `${result.tagTitle} | Helper`,
  };
}

const page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: searchParams.page? +searchParams.page : 1,
    searchQuery: searchParams?.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark-100 dark:text-light-900 font-inter">
        {result.tagTitle}
      </h1>
      <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route={`/tags/${params.id}`}
          iconPosition="left"
          placeholder="Search tag questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </section>

      <section className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
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
            title="There’s no tag question saved to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </section>
      <div className="mt-10">
        <Pagination pageNumber={searchParams?.page ? +searchParams.page : 1} isNext={result.isNext}/>
      </div>
    </>
  );
};

export default page;
