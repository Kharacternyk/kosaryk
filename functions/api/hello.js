export const onRequest = async (context) => {
  const { searchParams } = new URL(context.request.url);
  const token = searchParams.get("token");
  let userName = "bot";

  if (token !== null) {
    const body = new FormData();

    body.append("secret", "1x0000000000000000000000000000000AA");
    body.append("response", token);
    body.append("remoteip", context.request.headers.get("CF-Connecting-IP"));

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        body,
        method: "POST",
      }
    );
    const result = await response.json();

    if (result.success) {
      userName = searchParams.get("name");
    }
  }

  return Response.json({ message: `Hello, ${userName}!` });
};
