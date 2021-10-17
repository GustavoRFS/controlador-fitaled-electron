import "./App.scss";
import { ColorPicker } from "./components/ColorPicker";
import { ButtonsList } from "./components/ButtonsList";
import { FavoriteColorBox } from "./components/FavoriteColorBox";
import { MdStar } from "react-icons/md";
import { EffectCard } from "./components/EffectCard";

//const { ipcRenderer } = window.require("electron");

function App() {
  const colors = [
    "#faf",
    "#f00",
    "#00f",
    "#0f0",
    "#0ff",
    "#f0f",
    "#fef",
    "#aaa",
    "#eee",
    "#faf",
    "#f00",
    "#00f",
    "#0f0",
    "#0ff",
    "#f0f",
    "#fef",
    "#aaa",
    "#eee",
    "#faf",
    "#f00",
    "#00f",
    "#0f0",
    "#0ff",
    "#f0f",
    "#fef",
    "#aaa",
    "#eee",
  ];
  return (
    <div className="App">
      <header className="App-header">
        <div className="draggable"></div>
        <div
          onClick={() => {
            //ipcRenderer.send("header", "minimize");
          }}
          className="header-button"
        >
          _
        </div>
        <div
          className="header-button"
          onClick={() => {
            //ipcRenderer.send("header", "close");
          }}
        >
          X
        </div>
      </header>
      <div className="App-body">
        <div className="color-picker-container">
          <ColorPicker />
          <div className="button">
            <MdStar color="#fafafa" size={20} />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="control" style={{ width: "80%", marginBottom: 8 }}>
              <div className="button">-</div> Brilho{" "}
              <div className="button">+</div>
            </div>
            <div className="control" style={{ width: "72%" }}>
              <div className="button">-</div> Velocidade{" "}
              <div className="button">+</div>
            </div>
          </div>
        </div>

        <div className="lists-container">
          <ButtonsList title="Favoritos">
            {colors.map((color) => (
              <FavoriteColorBox color={color} />
            ))}
          </ButtonsList>
          <ButtonsList title="Efeitos">
            <EffectCard title="Pisca Pisca" description="pisca" />
            <EffectCard title="Pisca Pisca" description="pisca" />
            <EffectCard title="Pisca Pisca" description="pisca" />
          </ButtonsList>
        </div>
      </div>
    </div>
  );
}

export default App;
