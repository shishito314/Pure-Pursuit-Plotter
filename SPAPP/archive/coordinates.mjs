import { FIELD_SIZE } from "../../model/config.mjs";

let _model, _view;

export function set_model_view({ model, view }) {
  _model = model;
  _view = view;
}

// export function convertDimToCanvasCoords(d) {
//   return point(
//     (d.x / (_model.isZoomedOut ? _model.ZOOM_OUT_SIZE : FIELD_SIZE)) *
//       canvas.width,
//     (d.y / (_model.isZoomedOut ? _model.ZOOM_OUT_SIZE : FIELD_SIZE)) *
//       canvas.width
//   );
// }

export default {
  set_model_view,
  convert_to_model_coords,
  convert_point_to_model_coords,
  convert_to_canvas_coords,
  convert_point_to_canvas_coords,
  // convertDimToCanvasCoords,
};
