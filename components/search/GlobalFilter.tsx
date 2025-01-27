"use client";

import React, { useState } from "react";
import { formUrlQuery } from "@/lib/utils";
import { GlobalSearchFilters } from "@/lib/constant";
import { useRouter, useSearchParams } from "next/navigation";

const GlobalFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParams = searchParams.get("type");
  const [active, setActive] = useState(typeParams || "");

  const handleTypeClick = (item: string) => {
    if (item === active) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: null,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <section className="flex items-center gap-5 px-5 font-inter">
      <p className="text-dark-400 dark:text-light-900 body-medium">Type: </p>
      <div className="flex gap-3">
        {GlobalSearchFilters.map((item) => (
          <button
            type="button"
            key={item.value}
            className={`light-border-2 small-medium :text-light-800 rounded-2xl px-5 py-2 capitalize hover:text-primary-500
              ${
                active === item.value
                  ? "bg-primary-500 text-light-900 hover:text-light-850"
                  : "bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-500 dark:text-light-700"
              }
            `}
            onClick={() => handleTypeClick(item.value)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default GlobalFilter;
