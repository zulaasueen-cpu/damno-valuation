import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export async function getServerApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri:
        process.env.GRAPHQL_URL ??
        process.env.NEXT_PUBLIC_GRAPHQL_URL ??
        "/graphql",
      headers: {
        "x-app-token": process.env.ERXES_APP_TOKEN ?? "",
      },
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        const req = new Request(input, init);
        console.log("[apollo fetch]", req.url, "headers:", JSON.stringify(Object.fromEntries(req.headers.entries())));
        return fetch(input, init);
      },
      fetchOptions: { cache: "no-store" },
    }),
    cache: new InMemoryCache(),
  });
}
