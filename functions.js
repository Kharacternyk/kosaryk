export const respond = (status = 200) => new Response(null, { status });

export const getQuery = (context) => {
  const { searchParams } = new URL(context.request.url);

  context.request.body?.cancel();

  return searchParams;
};

export const isBot = async (token, secret) => {
  if (token == null) {
    return true;
  }

  const body = new FormData();

  body.append("secret", secret);
  body.append("response", token);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      body,
      method: "POST",
    }
  );
  const result = await response.json();

  return !result.success;
};
