export default function observe_resizing({ parent, callback }) {
  const resize_observer = new ResizeObserver((entries) => {
    const { width, height } = entries[0].contentRect;
    callback({ width, height });
  });
  resize_observer.observe(parent);
  return resize_observer;
}
