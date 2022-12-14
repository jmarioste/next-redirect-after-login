import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { MiddlewareFactory } from "./types";

export const withAuthorization: MiddlewareFactory = (next) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    if (["/admin", "/"]?.some((path) => pathname == path)) {
      const token = await getToken({ req });
      if (!token) {
        const url = new URL(`/api/auth/signin`, req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }
    }
    return next(req, _next);
  };
};
