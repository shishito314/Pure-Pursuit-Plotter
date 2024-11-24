export default function link_favicon({icon_href}) {
  const css_link = document.createElement("link");
  css_link.rel = "icon";
  css_link.href = icon_href;
  css_link.type = "image/png"; // TODO: support other types
  document.head.appendChild(css_link);
  return css_link;
}