import { useState } from "react";

function DataPanel(props) {
  const [path, setPath] = useState([]);

  const dataList = path?.map((pathPoint) => (
    <PointControlData
      id={pathPoint.id}
      key={pathPoint.id}
      name={pathPoint.name}
      completed={pathPoint.completed}
    />
  ));

  function handleSubmit(e) {}

  function handleChange(e) {}

  return (
    <div className="dataPanel">
      <h1>Path Data</h1>
      {dataList}
    </div>
  );
}

export default DataPanel;
