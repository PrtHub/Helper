"use client";

import Link from "next/link";
import { SignedOut, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "@/lib/constant";
import { Button } from "@/components/ui/button";

const LeftSidebar = () => {
  const {userId} = useAuth()
  const pathname = usePathname();

  return (
    <section className="bg-light-900 dark:bg-dark-200 sticky top-0 left-0 h-screen flex flex-col justify-between overflow-y-scroll p-6 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px] custom-scrollbar">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            link.route === pathname ||
            (pathname.includes(link.route) && link.route.length > 1);

            if(link.route === '/profile'){
              if(userId){
               link.route = `${link.route}/${userId}`
              } else {
                return null
              }
            }

          return (
            <Link
              key={link.label}
              href={link.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark-300 dark:text-light-900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <link.imgURL className={`${isActive ? "" : "invert-colors"}`} />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="font-medium btn-secondary min-h-10 w-full rounded-lg px-4 py-3 shadow-none">
              <span className="primary-text-gradient max-lg:hidden font-medium">
                Log In
              </span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="font-medium light-border-2 btn-tertiary text-dark-400 dark:text-light-900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
              <span className="max-lg:hidden font-medium">Sign up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
