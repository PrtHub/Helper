import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { popularTags, topQuestions } from "@/lib/constant";

const RightSidebar = () => {
  return (
    <section className="bg-light-900 dark:bg-dark-200 sticky top-0 left-0 h-screen w-[350px] flex flex-col overflow-y-scroll border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden light-border custom-scrollbar">
      <section className="w-full">
        <h3 className="h3-bold text-dark-200 dark:text-light-900 ">
          Top Questions
        </h3>
        <div className="w-full mt-8 flex flex-col gap-7">
          {topQuestions.map((question) => (
            <Link
              key={question._id}
              href={`/questions/${question._id}`}
              className="w-full flex cursor-pointer items-start justify-between gap-7"
            >
              <p className="body-medium text-dark-500 dark:text-light-700">
                {question.title}
              </p>
              <Image
                src="/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </section>
      <section className="mt-16">
        <h3 className="h3-bold text-dark-200 dark:text-light-900 ">
          Popular Tags
        </h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className="flex justify-between gap-2"
            >
              <Badge className="subtle-medium bg-light-800 dark:bg-dark-300 text-light-400 dark:text-light-500 rounded-md border-none px-4 py-2 uppercase">
                {tag.name}
              </Badge>
              <p className="small-medium text-dark-500 dark:text-light-700">
                {tag.totalQuestions}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
};

export default RightSidebar;
