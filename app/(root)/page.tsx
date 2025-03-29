import { Button } from "@/components/components/ui/button";
import { auth } from "auth";
import ROUTES from "constants/route";
import { signOut } from "auth";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <>
      <h1 className="h1-bold text-center">Welcome to next</h1>
      <form
        className="px-10 pt-[100px]"
        action={async () => {
          "use server";
          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button type="submit">Log Out</Button>
      </form>
    </>
  );
}
