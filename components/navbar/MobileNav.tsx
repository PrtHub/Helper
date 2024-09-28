"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { SignedOut, useAuth } from "@clerk/nextjs";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/lib/constant";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const { userId } = useAuth()
  const pathname = usePathname();
  
  return (
    <section className="flex h-full flex-col gap-6 pt-10 font-inter">
      {sidebarLinks.map((link, index) => {
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
          <SheetClose key={index} asChild>
            <Link
              href={link.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark-300 dark:text-light-900"
              } flex items-center justify-start gap-4 bg-transparent p-4 font-inter`}
            >
              <link.imgURL className={`${isActive ? "" : "invert-colors"}`} />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {link.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="invert-colors md:hidden cursor-pointer" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-light-900 dark:bg-dark-200 border-none md:hidden"
      >
        <Link href={"/"}>
          <h2 className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 ">
            Help<span className="text-primary-500">er</span>
          </h2>
        </Link>
        <section className="flex flex-col gap-5">
          <SheetClose asChild>
            <NavContent />
          </SheetClose>

          <SignedOut>
            <div className="flex flex-col gap-3 font-inter">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="small-medium btn-secondary min-h-10 w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className="small-medium light-border-2 btn-tertiary text-dark-400 dark:text-light-900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </section>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
