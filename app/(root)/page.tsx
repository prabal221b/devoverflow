import { auth } from "auth";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <>
      <h1 className="h1-bold text-center">Welcome to next</h1>
    </>
  );
}
