const loading_images = {};
const loaded_images = {};

export default async function load_image({ path_to_image }) {
  if (loaded_images[path_to_image]) return loaded_images[path_to_image];
  const resolves = [];
  if (!loading_images[path_to_image]) {
    loading_images[path_to_image] = loaded_images[path_to_image] = new Image();
    return new Promise((resolve, reject) => {
      loading_images[path_to_image].onload = () => {
        resolves.push(() => resolve(loaded_images[path_to_image]));
        loaded_images[path_to_image] = loading_images[path_to_image];
        delete loading_images[path_to_image];
        for (const res of resolves) {
          res();
        }
      };
      loading_images[path_to_image].onerror = reject;
      loading_images[path_to_image].src = path_to_image;
    });
  } else {
    return new Promise((resolve, reject) => {
      resolves.push(() => resolve(loaded_images[path_to_image]));
    });
  }
}
