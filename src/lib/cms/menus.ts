import { cmsFetch } from "@/lib/cms/fetch";

const CP_MENUS_QUERY = `
  query CpMenus($language: String, $kind: String) {
    cpMenus(language: $language, kind: $kind) {
      _id
      label
      url
      order
      target
    }
  }
`;

export async function getHeaderMenu(locale: string) {
  const data = await cmsFetch(CP_MENUS_QUERY, {
    language: locale,
    kind: "header",
  });
  return (
    (data.cpMenus as Array<{
      _id: string;
      label?: string;
      url?: string;
      order?: number;
      target?: string;
    }>) ?? []
  ).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getFooterMenu(locale: string) {
  const data = await cmsFetch(CP_MENUS_QUERY, {
    language: locale,
    kind: "footer",
  });
  return (
    (data.cpMenus as Array<{
      _id: string;
      label?: string;
      url?: string;
      order?: number;
      target?: string;
    }>) ?? []
  ).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
