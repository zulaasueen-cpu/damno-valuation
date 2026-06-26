import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export async function getServerApolloClient() {
  const uri =
    process.env.GRAPHQL_URL ??
    process.env.NEXT_PUBLIC_GRAPHQL_URL ??
    process.env.ERXES_ENDPOINT ??
    process.env.NEXT_PUBLIC_ERXES_ENDPOINT ??
    "/graphql";

  return new ApolloClient({
    link: new HttpLink({
      uri,
      headers: {
        "x-app-token":
          process.env.ERXES_APP_TOKEN ??
          process.env.NEXT_PUBLIC_ERXES_APP_TOKEN ??
          "",
      },
      fetchOptions: { cache: "no-store" },
    }),
    cache: new InMemoryCache(),
  });
}
