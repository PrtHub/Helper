"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

interface CustomInputProps {
  route: string;
  iconPosition: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearchbar = ({
  otherClasses,
  route,
  iconPosition,
  placeholder,
}: CustomInputProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const debouncedFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });

        router.push(newUrl);
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            keysToRemove: ["q"],
            params: searchParams.toString(),
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(debouncedFn);
  }, [search, route, pathname, router, searchParams, query]);

  return (
    <div
      className={`bg-light-800 dark:dark-gradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 font-inter ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Search className="cursor-pointer text-light-500" />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="paragraph-regular text-dark-400 dark:text-light-700 no-focus placeholder bg-transparent border-none shadow-none outline-none"
      />
      {iconPosition === "right" && (
        <Search className="cursor-pointer text-light-500" />
      )}
    </div>
  );
};

export default LocalSearchbar;
