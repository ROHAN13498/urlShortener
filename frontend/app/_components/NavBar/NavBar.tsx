"use client";
import { Button } from "@/components/ui/button";
import { Link as LucideLink } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import AvatarDropDown from "./AvatarDropDown";
import SideBarToogleButton from "./SideBarToogleButton";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="p-2 flex items-center border-b border-neutral-400 font-bold h-[65px]">
      {pathname === "/" && (
        <a
          className="flex items-center justify-center gap-x-3 hover:bg-neutral-100 p-2 rounded-lg transition-colors duration-300"
          href="/"
        >
          <LucideLink className="h-6 w-6 text-blue-500" />
          <span className="text-neutral-900 font-bold text-lg tracking-wide">
            ShortLink
          </span>
        </a>
      )}
      {pathname !== "/" && (
        <div className="md:hidden ml-2">
          <SideBarToogleButton />
        </div>
      )}
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        {pathname === "/" ? (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                router.push("/auth/login");
              }}
            >
              LogIn
            </Button>
            <Button
              onClick={() => {
                router.push("/auth/signup");
              }}
            >
              SignUp
            </Button>
          </div>
        ) : (
          <div className="flex items-center rounded-lg p-2">
            <AvatarDropDown />
          </div>
        )}
      </nav>
    </div>
  );
}
