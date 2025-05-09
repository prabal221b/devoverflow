import AllAnswers from "@/components/answers/AllAnswers";
import TagCard from "@/components/cards/TagCards";
import Preview from "@/components/editor/Preview";
import AnswerForm from "@/components/forms/AnswerForm";
import Metric from "@/components/Metric";
import SaveQuestion from "@/components/questions/SaveQuestion";
import UserAvatar from "@/components/UserAvatar";
import Votes from "@/components/votes/Votes";
import ROUTES from "@/constants/routes";
import { getAnswers } from "@/lib/actions/answer.actions";
import { hasSavedQuestion } from "@/lib/actions/collection.actions";
import { getQuestion, incrementViews } from "@/lib/actions/question.actions";
import { hasVoted } from "@/lib/actions/vote.actions";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { after } from "next/server";
import React, { Suspense } from "react";

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { id } = await params;

  const { success, data: question } = await getQuestion({ questionId: id });

  if (!success || !question)
    return {
      title: "Dev Overflow | Question Not Found",
      description: "The question you are looking for does not exist.",
    };

  return {
    title: question.title,
    description: question.content.slice(0, 100),
    twitter: {
      card: "summary_large_image",
      title: question.title,
      description: question.content.slice(0, 100),
    },
  };
}

const QuestionDetails = async ({ params, searchParams }: RouteParams) => {
  const { id } = await params;
  const { page, pageSize, filter } = await searchParams;
  const { success, data: question } = await getQuestion({ questionId: id });

  after(async () => {
    await incrementViews({ questionId: id });
  });

  if (!success || !question) return redirect("/404");

  const {
    success: areAnswersLoaded,
    data: answersResults,
    error: answersError,
  } = await getAnswers({
    questionId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    filter,
  });

  const hasVotedPromise = hasVoted({
    targetId: question._id,
    targetType: "question",
  });

  const hasSavedQuestionPromise = hasSavedQuestion({
    questionId: question._id,
  });

  const { author, createdAt, answers, views, tags, title, content } = question;

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between">
          <div className="flex items-center justify-start gap-1">
            <UserAvatar
              id={author._id}
              imageUrl={author.image}
              name={author.name}
              className="size-[22px]"
              fallbackClassName="text-[10px]"
            />

            <Link href={ROUTES.PROFILE(author._id)}>
              <p className="pragraph-semibold text-dark300_light700">
                {author.name}
              </p>
            </Link>
          </div>

          <div className="flex justify-end items-center gap-4">
            <Suspense fallback={<div>Loading...</div>}>
              <Votes
                upvotes={question.upvotes}
                downvotes={question.downvotes}
                targetType="question"
                targetId={question._id}
                hasVotedPromise={hasVotedPromise}
                currUserId={author._id}
              />
            </Suspense>

            <Suspense fallback={<div>Loading...</div>}>
              <SaveQuestion
                questionId={question._id}
                hasSavedQuestionPromise={hasSavedQuestionPromise}
              />
            </Suspense>
          </div>
        </div>

        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full">
          {title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/icons/clock.svg"
          alt="clock-icon"
          title=""
          value={`asked ${getTimeStamp(new Date(createdAt))}`}
          textStyles="small-regular text-dark400_light700"
        />

        <Metric
          imgUrl="/icons/message.svg"
          alt="message-icon"
          title=""
          value={answers}
          textStyles="small-regular text-dark400_light700"
        />

        <Metric
          imgUrl="/icons/eye.svg"
          alt="eye-icon"
          title=""
          value={formatNumber(views)}
          textStyles="small-regular text-dark400_light700"
        />
      </div>

      <Preview content={content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag: Tag) => (
          <TagCard
            key={tag._id}
            _id={tag._id as string}
            name={tag.name}
            compact
          />
        ))}
      </div>

      <section className="my-5">
        <AllAnswers
          page={Number(page) || 1}
          isNext={answersResults?.isNext || false}
          data={answersResults?.answers}
          success={areAnswersLoaded}
          error={answersError}
          totalAnswers={answersResults?.totalAnswers || 0}
        />
      </section>

      <section className="my-5">
        <AnswerForm
          questionId={question._id}
          questionTitle={title}
          questionContent={content}
        />
      </section>
    </>
  );
};

export default QuestionDetails;
