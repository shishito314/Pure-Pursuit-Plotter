import { useState } from "react";

function GraphicPanel(props) {
  const [path, setPath] = useState([]);

  return (
    <div className="graphicPanel">
      <canvas className="bgCanvas"></canvas>
      <canvas className="fgCanvas"></canvas>
    </div>
  );
}

export default GraphicPanel;
