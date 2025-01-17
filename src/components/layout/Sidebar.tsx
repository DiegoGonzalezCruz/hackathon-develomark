"use client";

import { useContext } from "react";
import { SidebarContext } from "./ClientProvider";
import Image from "next/image";

export const Sidebar = () => {
  const sidebar = useContext(SidebarContext);

  return (
    <div
      data-open={sidebar.open || undefined}
      className="h-dvh relative group data-[open]:w-72 w-[4.5rem] transition-all"
    >
      <div className="p-3 group-data-[open]:opacity-100 opacity-0 transition-opacity">
        <Image
          src="./logo_splashdash_gray+magenta.svg"
          className="px-10"
          alt="Logo"
          width={50}
          height={50}
        />
      </div>
      <button
        className="absolute grid place-items-center bottom-2 right-2 size-14 hover:bg-neutral-200 rounded-xl"
        onClick={sidebar.toggle}
      >
        <span className="absolute text-3xl text-neutral-300 group-data-[open]:rotate-180 transition-transform">
          ❱
        </span>
      </button>
    </div>
  );
};
