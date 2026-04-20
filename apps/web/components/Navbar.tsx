"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full text-white px-6 py-3 flex items-center justify-between">
      {/* Left: Logo */}
      <Link href="/projects" className="text-xl font-bold">
        <Logo />
      </Link>
    </nav>
  );
}
