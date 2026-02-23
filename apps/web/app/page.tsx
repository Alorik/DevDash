"use client";


import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  setTimeout(() => {
    console.log("SESSION:", session);
  }, 2000);

  return (
    <div>
      {!session ? (
        <button onClick={() => signIn("github")}>Login with GitHub</button>
      ) : (
        <>
          <p>Welcome {session.user?.name}</p>
          <button onClick={() => signOut()}>Logout</button>
        </>
      )}

      <div>
      </div>
    </div>
  );
}
