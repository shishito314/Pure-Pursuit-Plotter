import appView from "app-view.mjs";

export function getDims() {
  rect = appView.getGraphicPanel().getBoundingClientRect();
  return {
    x: rect.width,
    y: rect.height,
  };
}
