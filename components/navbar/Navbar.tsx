import React from "react";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";

import Theme from "@/components/Theme";
import GlobalSearch from "@/components/search/GlobalSearch"; 
import MobileNav from "@/components/navbar/MobileNav";

const Navbar = () => {
  return (
    <nav className="w-full flex-between p-6 gap-5 shadow-light-300 dark:shadow-none sm:px-12 bg-light-900 dark:bg-dark-200">
      <Link href={"/"} className="">
        <h2 className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900">
          Dev<span className="text-primary-500">Hub</span>
        </h2>
      </Link>
      <GlobalSearch />

      <section className="flex-center gap-2 sm:gap-5">
        <Theme />
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "sm:h-10 sm:w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>

        <MobileNav/>
      </section>
    </nav>
  );
};

export default Navbar;
