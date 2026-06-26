import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const HARDCODED_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRQb3J0YWxJZCI6ImtaMDRwYVlSNmh0dXdKWENHRWVjOCIsImlhdCI6MTc4MjIxNTM5Mn0.LBd4utfh3xzpTFqi1s64jn1loW3W_zIXuBAffgaKrZM";

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
        "x-app-token": HARDCODED_TOKEN,
      },
      fetchOptions: { cache: "no-store" },
    }),
    cache: new InMemoryCache(),
  });
}
