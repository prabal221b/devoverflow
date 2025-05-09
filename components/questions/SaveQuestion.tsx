"use client";

import { toast } from "@/hooks/use-toast";
import { toggleSaveQuestion } from "@/lib/actions/collection.actions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { use, useState } from "react";

const SaveQuestion = ({
  questionId,
  hasSavedQuestionPromise,
}: {
  questionId: string;
  hasSavedQuestionPromise: Promise<ActionResponse<{ saved: boolean }>>;
}) => {
  const session = useSession();
  const userId = session?.data?.user?.id;

  const { data } = use(hasSavedQuestionPromise);

  const { saved: hasSaved } = data || {};

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (isLoading) return;
    if (!userId) {
      return toast({
        title: "Please login to save this question",
        description: "You need to be logged in to save this question.",
      });
    }

    setIsLoading(true);

    try {
      const { success, data, error } = await toggleSaveQuestion({
        questionId: questionId,
      });

      if (!success) {
        throw new Error(error?.message || "Something went wrong");
      }
      toast({
        title: `Question ${data?.saved ? "saved" : "unsaved"}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Image
      src={hasSaved ? "/icons/star-filled.svg" : "/icons/star-red.svg"}
      width={18}
      height={18}
      alt="save"
      className={`cursor-pointer ${isLoading && "opacity-50"}`}
      aria-label="Save Question"
      onClick={handleSave}
    />
  );
};

export default SaveQuestion;
