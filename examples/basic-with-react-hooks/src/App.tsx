import React, { useState } from "react";
import { RGB, ColorState, SketchPicker } from "replace-react-color";

const App = () => {
  const [color, setColor] = useState<RGB | undefined>(undefined);

  const handleChangeComplete = (colorState: ColorState) => setColor(colorState.rgb);

  return (
    <div className="App">
      <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
    </div>
  );
};

export default App;
