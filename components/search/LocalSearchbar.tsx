"use client"

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

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
  return (
    <div
      className={`bg-light-800 dark:dark-gradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Search className="cursor-pointer text-light-500" />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value=""
        onChange={() => {}}
        className="paragraph-regular no-focus placeholder bg-transparent border-none shadow-none outline-none"
      />
      {iconPosition === "right" && (
        <Search className="cursor-pointer text-light-500" />
      )}
    </div>
  );
};

export default LocalSearchbar;
