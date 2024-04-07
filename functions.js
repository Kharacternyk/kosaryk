export const createHandler =
  ({ run, requiredKeys = [], optionalKeys = [], isPublic = false }) =>
  async (context) => {
    context.request.body?.cancel();

    const { searchParams } = new URL(context.request.url);

    if (
      !isPublic &&
      !(await isVerifiedHuman(
        searchParams.get("token"),
        context.env.turnstileSecret
      ))
    ) {
      return new Response(null, { status: 401 });
    }

    const requiredValues = [];

    for (const key of requiredKeys) {
      if (!searchParams.has(key)) {
        return new Response(null, { status: 400 });
      }
      requiredValues.push(searchParams.get(key));
    }

    const optionalValues = optionalKeys.map((key) => searchParams.get(key));
    const result = await run(
      context.env.database,
      ...requiredValues,
      ...optionalValues
    );

    if (!result || !result.meta) {
      return Response.json(result);
    }

    if (result.results) {
      return Response.json(result.results);
    }

    return new Response();
  };

const isVerifiedHuman = async (token, secret) => {
  if (!token) {
    return false;
  }

  const body = new FormData();

  body.append("secret", secret);
  body.append("response", token);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      body,
      method: "post",
    }
  );
  const { success } = await response.json();

  return success;
};
