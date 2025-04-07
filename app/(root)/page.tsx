import QuestionCard from "@/components/cards/QuestionCard";
import { Button } from "@/components/ui/button";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "constants/route";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "How to learn React?",
    content: "I want to learn React, can anyone help me?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "JavaScript" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "How to learn JavaScript?",
    content: "I want to learn JavaScript, can anyone help me?",
    tags: [
      { _id: "1", name: "Javascript" },
      { _id: "2", name: "JavaScript" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Home({ searchParams }: SearchParams) {
  const { query = "", filter = "" } = await searchParams;

  const filteredQuestion = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query?.toLowerCase());

    const matchesFilter = filter
      ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
      : true;

    return matchesQuery && matchesFilter;
  });
  return (
    <>
      <section className="w-full flex flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
        <h1 className="h1-bold text_dark100_light900">All Questions</h1>

        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestion.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
}
