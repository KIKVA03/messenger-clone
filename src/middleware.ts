import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/",
    },
});
//aq qvemot aris romel routebsac icavs da zemot kidev weria saac unda gadaamisamartos
export const config = {
    matcher: ["/users/:path*", "/conversations/:path*"],
};
