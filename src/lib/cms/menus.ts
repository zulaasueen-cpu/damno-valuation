import { getServerApolloClient } from "@/lib/apollo/server-client";
import { CP_MENUS } from "@/graphql/cms/queries/menu";

export async function getHeaderMenu(locale: string) {
  const client = await getServerApolloClient();
  const { data } = await client.query<{ cpMenus?: Array<{ _id: string; label?: string; url?: string; order?: number; target?: string }> }>({
    query: CP_MENUS,
    variables: { language: locale, kind: "header" },
    context: { fetchOptions: { next: { revalidate: 60 } } },
  });
  return (data?.cpMenus ?? []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getFooterMenu(locale: string) {
  const client = await getServerApolloClient();
  const { data } = await client.query<{ cpMenus?: Array<{ _id: string; label?: string; url?: string; order?: number; target?: string }> }>({
    query: CP_MENUS,
    variables: { language: locale, kind: "footer" },
    context: { fetchOptions: { next: { revalidate: 60 } } },
  });
  return (data?.cpMenus ?? []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
