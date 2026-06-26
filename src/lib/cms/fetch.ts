const ENDPOINT =
  process.env.GRAPHQL_URL ??
  process.env.NEXT_PUBLIC_GRAPHQL_URL ??
  process.env.ERXES_ENDPOINT ??
  process.env.NEXT_PUBLIC_ERXES_ENDPOINT ??
  "/graphql";

export async function cmsFetch(query: string, variables?: Record<string, unknown>) {
  const token =
    process.env.ERXES_APP_TOKEN ?? process.env.NEXT_PUBLIC_ERXES_APP_TOKEN ?? "";
  const clientPortalId =
    process.env.CLIENT_PORTAL_ID ?? process.env.NEXT_PUBLIC_CLIENT_PORTAL_ID ?? "";

  if (!ENDPOINT || ENDPOINT === "/graphql") {
    throw new Error("CMS endpoint is not configured");
  }
  if (!token) {
    throw new Error("ERXES_APP_TOKEN is not configured");
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-app-token": token,
      ...(clientPortalId ? { "x-client-portal-id": clientPortalId } : {}),
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`CMS fetch failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as {
    data?: Record<string, unknown>;
    errors?: Array<{ message: string }>;
  };

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  return json.data ?? {};
}
