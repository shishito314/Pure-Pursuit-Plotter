export default function create_element({
  preexisting,
  type,
  classes,
  parent,
  styles,
  attributes,
}) {
  const element = preexisting ? preexisting : document.createElement(type);
  if (classes) {
    // TODO if array logic
    for (const c of classes) element.classList.add(c);
  }
  if (styles) {
    for (const style in styles) element.style[style] = styles[style];
  }
  if (attributes) {
    for (const attribute in attributes)
      element.setAttribute(attribute, attributes[attribute]);
  }
  if (parent) parent.appendChild(element);
  return element;
}
