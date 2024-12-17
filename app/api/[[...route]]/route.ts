// import { httpHandler } from "@/server";
//
// export const runtime = "edge";
//
// export { httpHandler as GET, httpHandler as POST };
import { NextResponse } from "next/server";

export const POST = () => {
  return NextResponse.json({ ok: true });
};
