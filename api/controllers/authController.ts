import { APIRequestContext, expect } from "@playwright/test";

export default class AuthController {
  request: APIRequestContext;
  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async signIn(email: string, password: string) {
    let sid: string;

    const response = await this.request.post("/api/auth/signin", {
      data: {
        email: email,
        password: password,
        remember: false,
      },
    });

    expect(response.status()).toBe(200);
    const headers = response.headers();
    const setCookieHeader = headers["set-cookie"];

    sid = setCookieHeader?.split(";")[0];
    expect(sid).toContain("sid=");
    return sid;
  }
}
