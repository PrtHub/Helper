"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { themes } from "@/lib/constant";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";

const Theme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger>
          {theme === "light" ? (
            <Sun fill="#FF7000" className="active-theme cursor-pointer" />
          ) : (
            <Moon fill="#FF7000" className="active-theme cursor-pointer" />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] mt-3 min-w-[120px] rounded border py-2 dark:border-dark-400 dark:bg-dark-300">
          {themes.map((item, index) => (
            <MenubarItem
              key={index}
              className="flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400"
              onClick={() => {
                setTheme(item.value);

                if (item.value !== "system") {
                  localStorage.theme = item.value;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
            >
              <item.icon
                size={16}
                className={`${
                  theme === item.value && "active-theme"
                } text-light-500`}
              />
              <p
                className={`body-semibold  ${
                  theme === item.value
                    ? "text-primary-500"
                    : "dark:text-light-900 text-dark-100"
                }`}
              >
                {item.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
