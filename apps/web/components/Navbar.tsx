"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full border-b bg-black text-white px-6 py-3 flex items-center justify-between">
      {/* Left: Logo */}
      <Link href="/projects" className="text-xl font-bold">
        <Logo />
      </Link>

      {/* Right: User */}
      <div className="flex items-center gap-4">
        {session?.user && (
          <>
            <span className="text-sm text-gray-600">{session.user.name}</span>

            {session.user.image && (
              <img
                src={session.user.image}
                alt="user"
                className="w-8 h-8 rounded-full"
              />
            )}
          </>
        )}
      </div>
    </nav>
  );
}
