import Link from "next/link";
import { TagFilters } from "@/lib/constant";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import { getAllTags } from "@/lib/actions/tags.action";
import LocalSearchbar from "@/components/search/LocalSearchbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Tags | Helper',
}

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

const TagsPage = async ({ searchParams }: SearchParamsProps) => {
  const results = await getAllTags({
    searchQuery: searchParams?.q,
    filter: searchParams?.filter,
    page: searchParams?.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark-100 dark:text-light-900 font-inter">All Tags</h1>

      <section className="mt-11 flex justify-between sm:items-center max-sm:flex-col gap-5">
        <LocalSearchbar
          route={`/tags`}
          iconPosition="left"
          placeholder="Search for tags..."
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </section>

      <section className="mt-12 flex flex-wrap gap-4">
        {results.tags.length > 0 ? (
          results.tags.map((tag) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className="shadow-light-300 dark:shadow-none"
            >
              <article className="bg-light-900 dark:bg-dark-200 light-border flex w-full flex-col rounded-2xl border-2 dark:border px-8 py-10 sm:w-[260px] font-inter">
                <div className="bg-light-800 dark:bg-dark-400 w-fit rounded-sm px-5 py-1.5">
                  <p className="paragraph-semibold text-dark-200 dark:text-light-900">
                    {tag.name}
                  </p>
                </div>

                <p className="small-medium text-dark-400 dark:text-light-500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.questions.length}+
                  </span>{" "}
                  Questions
                </p>
              </article>
            </Link>
          ))
        ) : (
          <NoResult
            title="No Tags Found"
            description="It looks like there are no tags found."
            link="/ask-question"
            linkTitle="Ask a question"
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
};

export default TagsPage;
