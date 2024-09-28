import UserCard from "@/components/cards/UserCard";
import LocalSearchbar from "@/components/search/LocalSearchbar";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import { getAllUsers } from "@/lib/actions/user.action";
import { UserFilters } from "@/lib/constant";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Community | DevHub',
}

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

const Community = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllUsers({
    searchQuery: searchParams?.q,
    filter: searchParams?.filter,
    page: searchParams?.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark-100 dark:text-light-900">All Users</h1>

      <section className="mt-11 flex justify-between sm:items-center max-sm:flex-col gap-5">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          placeholder="Search for amazing minds..."
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </section>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="paragraph-regular text-dark-200 dark:text-light-800 mx-auto max-w-4xl text-center font-inter">
            <p>No users yet</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
      <div>
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default Community;
