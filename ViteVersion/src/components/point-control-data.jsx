import { useState } from "react";

function PointControlData(props) {
  const [pathData, setPathData] = useState({});

  function handleChangeX(e) {}
  function handleChangeY(e) {}
  function handleClickStop(e) {}
  function handleClickFwd(e) {}

  this.xInput.addEventListener("change", this.changeX.bind(this));
  this.yInput.addEventListener("change", this.changeY.bind(this));
  this.isFwdButton.addEventListener("click", this.changeFwd.bind(this));
  this.isStopButton.addEventListener("click", this.changeStop.bind(this));
  this.deleteButton.addEventListener("click", this.deletePoint.bind(this));
  // FOR DRAG AND DROP
  return (
    <div>
      <div>
        <label>X:</label>
        <input onChange={handleChangeX}></input>
      </div>
      <div>
        <label>Y:</label>
        <input onChange={handleChangeY}></input>
      </div>
      <div>
        <label>Fwd:</label>
        <input onChange={handleClickFwd}></input>
      </div>
      <div>
        <label>Stop:</label>
        <input onChange={handleClickStop}></input>
      </div>
      <button></button>
    </div>
  );
}

export default PointControlData;
