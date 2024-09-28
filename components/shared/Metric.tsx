import { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MetricProps {
  icon: LucideIcon | string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
}

const Metric = ({
  icon: Icon,
  value,
  title,
  href,
  textStyles,
  isAuthor,
}: MetricProps) => {

  const isLucideIcon = typeof Icon !== "string" && Icon?.$$typeof === Symbol.for("react.forward_ref");

  const metricContent = (
    <>
      {isLucideIcon ? (
        <Icon className={`size-4 text-light-400 ${href && "rounded-full "}`} />
      ) : (
        <Image src={Icon as string} alt={title} width={16} height={16} className={`object-contain ${href ? 'rounded-full' : ''}`} />
      )}
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? "max-sm:hidden" : ""
          }`}
        >
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex-center gap-1">
        {metricContent}
      </Link>
    );
  }

  return <div className="flex-center flex-wrap gap-1">{metricContent}</div>;
};

export default Metric;
