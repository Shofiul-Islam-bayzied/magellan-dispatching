import { useEffect } from "react";

export interface PageMeta {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const ROUTE_JSONLD_ID = "page-route-jsonld";

function upsertMetaByName(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertMetaByProperty(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function usePageMeta(meta: PageMeta) {
  const jsonLdKey = meta.jsonLd ? JSON.stringify(meta.jsonLd) : "";

  useEffect(() => {
    if (meta.title) document.title = meta.title;
    if (meta.description) upsertMetaByName("description", meta.description);
    if (meta.canonical) upsertLink("canonical", meta.canonical);
    if (meta.ogTitle) upsertMetaByProperty("og:title", meta.ogTitle);
    if (meta.ogDescription) upsertMetaByProperty("og:description", meta.ogDescription);
    if (meta.ogUrl) upsertMetaByProperty("og:url", meta.ogUrl);

    document.getElementById(ROUTE_JSONLD_ID)?.remove();
    if (meta.jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = ROUTE_JSONLD_ID;
      script.textContent = JSON.stringify(meta.jsonLd);
      document.head.appendChild(script);
    }
  }, [
    meta.title,
    meta.description,
    meta.canonical,
    meta.ogTitle,
    meta.ogDescription,
    meta.ogUrl,
    jsonLdKey,
  ]);
}
