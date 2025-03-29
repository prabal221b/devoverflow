import SocialAuthForm from "@/components/forms/SocialAuthForm";
import Image from "next/image";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cover bg-auth-light bg-no-repeat dark:bg-auth-dark px-4 py-10">
      <section className="light-border background-light800_dark200 shadow-light100_dark100 min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8">
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-2.5">
            <h1 className="h2-bold text-dark100_light900">Join DevOverFlow</h1>
            <p className="paragraph-regular text-dark500_light400">
              To Get Your Questions Answered
            </p>
          </div>
          <Image
            src="images/site-logo.svg"
            alt="DevOverFlow Logo"
            width={23}
            height={23}
            className="object-contain"
          />
        </div>
        {children}
        <SocialAuthForm />
      </section>
    </main>
  );
};

export default layout;
