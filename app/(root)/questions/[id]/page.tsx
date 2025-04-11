import AllAnswers from "@/components/answers/AllAnswers";
import TagCard from "@/components/cards/TagCards";
import Preview from "@/components/editor/Preview";
import AnswerForm from "@/components/forms/AnswerForm";
import Metric from "@/components/Metric";
import UserAvatar from "@/components/UserAvatar";
import Votes from "@/components/votes/Votes";
import ROUTES from "@/constants/routes";
import { getAnswers } from "@/lib/actions/answer.actions";
import { getQuestion, incrementViews } from "@/lib/actions/question.actions";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { after } from "next/server";
import React from "react";

const QuestionDetails = async ({ params }: RouteParams) => {
  const { id } = await params;
  const { success, data: question } = await getQuestion({ questionId: id });

  after(async () => {
    await incrementViews({ questionId: id });
  });

  if (!success && !question) return redirect("/404");

  const {
    success: areAnswersLoaded,
    data: answersResults,
    error: answersError,
  } = await getAnswers({
    questionId: id,
    page: 1,
    pageSize: 10,
    filter: "latest",
  });

  const {
    _id,
    author,
    createdAt,
    answers,
    views,
    tags,
    title,
    content,
    upvotes,
    downvotes,
  } = question!;

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

          <div className="flex justify-end">
            <Votes
              upvotes={upvotes}
              hasUpVoted={true}
              downvotes={downvotes}
              hasDownVoted={true}
            />
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
          data={answersResults?.answers}
          success={areAnswersLoaded}
          error={answersError}
          totalAnswers={answersResults?.totalAnswers || 0}
        />
      </section>

      <section className="my-5">
        <AnswerForm
          questionId={_id}
          questionTitle={title}
          questionContent={content}
        />
      </section>
    </>
  );
};

export default QuestionDetails;
