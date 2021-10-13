import { ChromePicker } from "react-color";
import { useState } from "react";
import "./ColorPicker.scss";

export const ColorPicker = () => {
  const [color, setColor] = useState("#f00");

  const handleColorChange = ({ hex, rgb }) => {
    setColor(hex);
  };

  return (
    <ChromePicker
      className="color-picker"
      color={color}
      onChange={handleColorChange}
      width={300}
    />
  );
};
