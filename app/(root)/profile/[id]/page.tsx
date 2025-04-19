import { auth } from "@/auth";
import ProfileLink from "@/components/user/ProfileLink";
import UserAvatar from "@/components/UserAvatar";
import { getUser } from "@/lib/actions/user.actions";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Profile = async ({ params }: RouteParams) => {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const loggedInUser = await auth();
  const { success, data, error } = await getUser({
    userId: id,
  });

  if (!success) {
    return (
      <div>
        <div className="h1-bld text-dark100_light900">{error?.message}</div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, totalQuestions, totalAnswers } = data!;

  const { _id, name, image, portfolio, bio, location, createdAt, username } =
    user;

  return (
    <section className="flex flex-col-reverse items-start justify-between sm:flex-row">
      <div className="flex flex-col items-start gap-4 lg:flex-row">
        <UserAvatar
          id={_id}
          name={name}
          imageUrl={image}
          className="size-[140px] rounded-full object-cover"
          fallbackClassName="text-6xl font-bolder"
        />

        <div className="mt-3">
          <h2 className="h2-bold text-dark100_light900">{name}</h2>
          <p className="paragraph-regular text-dark200_light800">@{username}</p>

          <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
            {portfolio && (
              <ProfileLink
                imgUrl="/icons/link.svg"
                href={portfolio}
                title="Portfolio"
              />
            )}

            {location && (
              <ProfileLink imgUrl="/icons/location.svg" title="Location" />
            )}

            <ProfileLink
              imgUrl="/icons/calendar.svg"
              href={portfolio}
              title={dayjs(createdAt).format("MMMM YYYY")}
            />
          </div>

          {bio && (
            <p className="paragraph-regular text-dark400_light800 mt-8">
              {bio}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end max-sm:mb-6 max-sm:w-full sm:mt-3">
        {loggedInUser?.user?.id === _id && (
          <Link href="/profile/edit">
            <Button className="paragpraph-medium btn-secondary text-dark300_light900 min-h-12 min-w-44 px-4 py-3">
              Edit Profile
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default Profile;
