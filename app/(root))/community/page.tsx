import UserCard from "@/components/cards/UserCard";
import LocalSearchbar from "@/components/search/LocalSearchbar";
import Filter from "@/components/shared/Filter";
import { getAllUsers } from "@/lib/actions/user.action";
import { UserFilters } from "@/lib/constant";
import Link from "next/link";

const Community = async () => {
  const result = await getAllUsers({});

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
         result.users.map((user)=> (
            <UserCard key={user._id} user={user} />
          ))
        ) : (
          <div className="paragraph-regular text-dark-200 dark:text-light-800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default Community;