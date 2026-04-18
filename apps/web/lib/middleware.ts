import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // nothing needed here for now
  },
  {
    pages: {
      signIn: "/signup", // 👈 redirect here
    },
  },
);
export const config = {
  matcher: ["/", "/projects/:path*", "/tasks/:path*", "/dashboard/:path*"],
};
