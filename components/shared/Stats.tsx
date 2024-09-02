import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";

interface StatsProps {
  totalQuestions: number;
  totalAnswers: number;
}

const Stats = ({ totalQuestions, totalAnswers }: StatsProps) => {
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark-200 dark:text-light-900">Stats</h4>
      <section className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="light-border bg-light-900 dark:bg-dark-300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark-200 dark:text-light-900">
              {formatAndDivideNumber(totalQuestions)}
            </p>
            <p className="body-medium text-dark-400 dark:text-light-700">
              Questions
            </p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark-200 dark:text-light-900">
              {formatAndDivideNumber(totalAnswers)}
            </p>
            <p className="body-medium text-dark-400 dark:text-light-700">
              Answers
            </p>
          </div>
        </div>

        <StatsCard imgUrl="/gold-medal.svg" value={0} title="Gold Badges" />
        <StatsCard imgUrl="/silver-medal.svg" value={0} title="Silver Badges" />
        <StatsCard imgUrl="/bronze-medal.svg" value={0} title="Bronze Badges" />
      </section>
    </div>
  );
};

export default Stats;

interface StatsCardProps {
  imgUrl: string;
  value: number;
  title: string;
}

const StatsCard = ({ imgUrl, value, title }: StatsCardProps) => (
  <div className="light-border bg-light-900 dark:bg-dark-300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
    <Image src={imgUrl} alt={title} width={40} height={50} />
    <div>
      <p className="paragraph-semibold text-dark-200 dark:text-light-900">
        {value}
      </p>
      <p className="body-medium text-dark-400 dark:text-light-700">{title}</p>
    </div>
  </div>
);
