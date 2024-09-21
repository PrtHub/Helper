import Navbar from "@/components/navbar/Navbar";
import LeftSidebar from "@/components/sidebar/LeftSidebar";
import RightSidebar from "@/components/sidebar/RightSidebar";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative bg-light-850 dark:bg-dark-100 text-white">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="min-h-screen flex flex-1 px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="w-full mx-auto max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
        <Toaster/>
      </div>
    </main>
  );
}
