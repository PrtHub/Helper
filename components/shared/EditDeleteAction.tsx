"use client";

import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import { Pencil, Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface ActionProps {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ itemId, type }: ActionProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };

  const handleDelete = async () => {
    if (type === "Question") {
      await deleteQuestion({
        questionId: JSON.parse(itemId),
        path: pathname,
      });
    }

    if (type === "Answer") {
      await deleteAnswer({
        answerId: JSON.parse(itemId),
        path: pathname,
      });
    }
  };

  return (
    <section className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "Question" && (
        <Pencil className="cursor-pointer size-4" onClick={handleEdit} />
      )}
      <Trash2 className="cursor-pointer size-4" onClick={handleDelete} />
    </section>
  );
};

export default EditDeleteAction;
