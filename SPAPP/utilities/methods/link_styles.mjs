const linked = {};

export default function link_styles({ css_href }) {
  if (!css_href) return;
  if (!Array.isArray(css_href)) css_href = [css_href];
  const results = [];
  for (const ref of css_href) {
    if (linked[ref]) {
      results.push(linked[ref]);
      continue;
    }
    linked[ref] = document.createElement("link");
    linked[ref].rel = "stylesheet";
    linked[ref].href = ref;
    document.head.appendChild(linked[ref]);
    results.push(linked[ref]);
  }
  if (results.length === 1) return results[0];
  return results;
}
