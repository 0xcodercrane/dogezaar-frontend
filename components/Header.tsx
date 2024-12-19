"use client";
// import Link from "next/link";
import { useState } from "react";
import ConnectBtn from "./WalletConnection/ConnectBtn";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Creator", link: "/creators" },
  ];
  const pathName = usePathname();

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <div className="font-bold text-[42px]">
            <Link href="/">
              <h1 className="leading-8 text-[32px] sm:text-[40px]">Dogezaar</h1>
            </Link>
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            className="hover:text-danger text-2xl duration-200"
            color={pathName === "/" ? "danger" : "foreground"}
            href="/"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="hover:text-danger text-2xl duration-200"
            color={pathName === "/creators" ? "danger" : "foreground"}
            href="/creators"
          >
            Creator
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ConnectBtn />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={pathName === item.link ? "danger" : "foreground"}
              href={item.link}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
