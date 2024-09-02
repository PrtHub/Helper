import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface ProfileLinkProps {
  icon: LucideIcon;
  title: string;
  href?: string;
}

const ProfileLink = ({ icon: Icon, title, href }: ProfileLinkProps) => {
  return (
    <section className="flex-center gap-1">
      <Icon className="size-4" />

      {href ? (
        <Link
          href={href}
          target="_blank"
          className="paragraph-medium text-blue-500"
        >
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium text-dark-400 dark:text-light-700">{title}</p>
      )}
    </section>
  );
};

export default ProfileLink;
