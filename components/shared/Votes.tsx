"use client";

import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { viewQuestions } from "@/lib/actions/interaction.action";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { toggleSavedQuestion } from "@/lib/actions/user.action";
import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface VoteProps {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  hasdownVoted,
  hasupVoted,
  hasSaved,
}: VoteProps) => {
  const pathname = usePathname();
  const router = useRouter()

  const handleSave = async () => {
    await toggleSavedQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname,
    });
  };

  const handleVote = async (voteType: string) => {
    if (!userId) {
      return;
    }

    if (voteType === "upvote") {
      if (type === "Question") {
        await upvoteQuestion({
          userId: JSON.parse(userId),
          questionId: JSON.parse(itemId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await upvoteAnswer({
          userId: JSON.parse(userId),
          answerId: JSON.parse(itemId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      }

      return;
    }

    if (voteType === "downvote") {
      if (type === "Question") {
        await downvoteQuestion({
          userId: JSON.parse(userId),
          questionId: JSON.parse(itemId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await downvoteAnswer({
          userId: JSON.parse(userId),
          answerId: JSON.parse(itemId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      }
    }
  };

  useEffect(() => {
       viewQuestions({
        questionId: JSON.parse(itemId),
        userId: userId ? JSON.parse(userId) : undefined,
       })
  }, [itemId, userId, router, pathname])

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={hasupVoted ? "/upvoted.svg" : "/upvote.svg"}
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(upvotes)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <Image
            src={hasdownVoted ? "/downvoted.svg" : "/downvote.svg"}
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>

      {type === "Question" && (
        <Image
          src={hasSaved ? "/star-filled.svg" : "/star-red.svg"}
          width={18}
          height={18}
          alt="star"
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
