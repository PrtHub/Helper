import Link from "next/link";
import Filter from "@/components/shared/Filter";
import { Button } from "@/components/ui/button";
import LocalSearchbar from "@/components/search/LocalSearchbar";
import { HomePageFilters } from "@/lib/constant";
import HomeFilters from "@/components/home/HomeFilters";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import {
  getQuestions,
  getRecomemdedQuestions,
} from "@/lib/actions/question.action";
import { auth } from "@clerk/nextjs/server";
import Pagination from "@/components/shared/Pagination";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Helper",
};

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId } = auth();

  let results;

  if (searchParams.filter === "recommended") {
    if (userId) {
      results = await getRecomemdedQuestions({
        userId,
        searchQuery: searchParams?.q,
        page: searchParams?.page ? +searchParams.page : 1,
      });
    } else {
      results = {
        questions: [],
        isNext: false,
      };
    }
  } else {
    results = await getQuestions({
      searchQuery: searchParams?.q,
      filter: searchParams?.filter,
      page: searchParams?.page ? +searchParams.page : 1,
    });
  }

  return (
    <>
      <section className="flex w-full justify-between gap-4 flex-col sm:flex-row sm:items-center font-inter">
        <h1 className="h1-bold text-dark-100 dark:text-light-900">
          All Questions
        </h1>
        <Link href="/ask-question" className="flex sm:justify-end w-full sm:w-fit">
          <Button className="primary-gradient min-h-[46px] w-full px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </section>
      <section className="mt-11 flex justify-between sm:items-center max-sm:flex-col gap-5">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </section>
      <HomeFilters />
      <section className="mt-10 flex w-full flex-col gap-6">
        {results.questions.length > 0 ? (
          results.questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              clerkId={userId}
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
            title="There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </section>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={results.isNext}
        />
      </div>
    </>
  );
}
