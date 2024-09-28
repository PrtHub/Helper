import { getTopInteractedTags } from "@/lib/actions/tags.action";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import RenderTag from "../shared/RenderTag";

interface UserCardProps {
  user: {
    _id: string;
    name: string;
    username: string;
    clerkId: string;
    picture: string;
  };
}

const UserCard = async ({ user }: UserCardProps) => {
  const interactedTags = await getTopInteractedTags({ userId: user._id });

  console.log('interactedTags', interactedTags);

  return (
    <Link href={`/profile/${user.clerkId}`}>
      <article className="flex w-full flex-col items-center justify-center rounded-2xl border p-8 light-border bg-light-900 dark:bg-dark-200 font-inter">
        <Image
          src={user.picture}
          alt="user profile picture"
          width={100}
          height={100}
          className="rounded-full"
        />

        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark-200 dark:text-light-900 line-clamp-1 font-inter">
            {user.name}
          </h3>
          <p className="body-regular text-dark-500 dark:text-light-500 mt-2">
            @{user.username}
          </p>
        </div>

        <div className="mt-5">
          {interactedTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {interactedTags.map((tag) => (
                <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge className="subtle-medium bg-light-800 dark:bg-dark-300 text-light-400 dark:text-light-500 shadow-md rounded-md border-none px-4 py-2 uppercase">No tags yet</Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
