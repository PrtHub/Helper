import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignedOut } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="invert-colors sm:hidden cursor-pointer" />
      </SheetTrigger>
      <SheetContent side='left' className="bg-light-900 dark:bg-dark-200 border-none">
      <Link href={"/"}>
        <h2 className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 ">
          Dev<span className="text-primary-500">Hub</span>
        </h2>
      </Link>
      <section>     
      </section>
      </SheetContent>
    </Sheet>
  );
};


export default MobileNav;
