import "./App.scss";
import { ColorPicker } from "./components/ColorPicker";
const { ipcRenderer } = window.require("electron");

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="draggable"></div>
        <div
          onClick={() => {
            ipcRenderer.send("header", "minimize");
          }}
          className="header-button"
        >
          _
        </div>
        <div
          className="header-button"
          onClick={() => {
            ipcRenderer.send("header", "close");
          }}
        >
          X
        </div>
      </header>
      <div className="App-body">
        <div className="color-picker-container">
          <ColorPicker />
          <div className="button">Adicionar cor aos favoritos</div>
        </div>

        <div>kkkkkk</div>
      </div>
    </div>
  );
}

export default App;
