import NextAuth from "next-auth";
import { studioAuthOptions } from "@/lib/studio-auth";

const handler = NextAuth(studioAuthOptions);

export { handler as GET, handler as POST };
