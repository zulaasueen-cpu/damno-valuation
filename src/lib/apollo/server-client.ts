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
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      fetchOptions: { cache: "no-store" },
    }),
    cache: new InMemoryCache(),
  });
}
