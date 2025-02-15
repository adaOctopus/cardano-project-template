"use client";

import { SearchIcon } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { useState } from "react";
import { Notification } from "./notification";
import { Button } from "antd"
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";
import dynamic from "next/dynamic";
import WalletConnect  from "../../Wallet/WalletComponent";

// const WalletConnect = dynamic(() => import('../../Wallet/WalletComponent'), {
//   ssr: false,// Disables SSR
//   loading: () => <Button
//       onClick={() => console.log('Crypto')}
//       className="btn btn3"
//       ghost
//       type="primary"
//       style={{
//           color: 'white',
//           background: "linear-gradient(to right, #DA22FF 0%, #9733EE  51%, #DA22FF  100%)",
//           width: "200px"
//       }}
//   >
//       CONNECT WALLET
//   </Button>,

// });

export function Header() {
  const { toggleSidebar, isMobile } = useSidebarContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-stroke bg-white px-4 py-5 shadow-1 dark:border-stroke-dark dark:bg-gray-dark md:px-5 2xl:px-10">
      <button
        onClick={toggleSidebar}
        className="rounded-lg border px-1.5 py-1 dark:border-stroke-dark dark:bg-[#020D1A] hover:dark:bg-[#FFFFFF1A] lg:hidden"
      >
        <MenuIcon />
        <span className="sr-only">Toggle Sidebar</span>
      </button>

      {isMobile && (
        <Link href={"/"} className="ml-2 max-[430px]:hidden min-[375px]:ml-4">
          <Image
            src={"/images/logo/logo-icon.svg"}
            width={32}
            height={32}
            alt=""
            role="presentation"
          />
        </Link>
      )}

      {/* <div className="max-xl:hidden">
        <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
          Dashboard
        </h1>
        <p className="font-medium">Next.js Admin Dashboard Solution</p>
      </div> */}

      <div className="flex flex-1 items-center justify-end gap-2 min-[375px]:gap-4">
        {/* <div className="relative w-full max-w-[300px]">
          <input
            type="search"
            placeholder="Search"
            className="flex w-full items-center gap-3.5 rounded-full border bg-gray-2 py-3 pl-[53px] pr-5 outline-none transition-colors focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-dark-4 dark:hover:bg-dark-3 dark:hover:text-dark-6 dark:focus-visible:border-primary"
          />

          <SearchIcon className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 max-[1015px]:size-5" />
        </div> */}

      {/* <div className="relative w-full max-w-[300px]" >
        <button

          type="submit"
          onClick={() => setIsModalOpen(true)}
          style={{borderRadius: '70px', height: "50px"}}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          CONNECT WALLET
          
        </button>
        </div> */}
         <div
          className="p-4 justify-end flex"
          //  style={{
          // boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
          //  }}
           ><WalletConnect /></div>

        <ThemeToggleSwitch />

        {/* <Notification /> */}

        <div className="shrink-0">
          <UserInfo />
        </div>
      </div>
    </header>
  );
}
