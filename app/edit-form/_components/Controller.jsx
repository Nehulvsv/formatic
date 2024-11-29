import React, { useState } from "react";
import Select from "react-select";
import { themeData } from "../../_data/ThemeData";
import GradientData from "../../_data/GradientData";
function Controller({ setSelectedTheme , setSelectedBackground}) {
  const themes = Object.keys(themeData).map((key) => ({
    name: key,
    primary: themeData[key].primary,
    secondary: themeData[key].secondary,
    accent: themeData[key].accent,
    neutral: themeData[key].neutral,
  }));
const [indexNum , setIndexNum] = useState(6)
  const options = themes.map((theme) => ({
    value: theme.name,
    label: (
      <div className="flex items-center gap-2">
        <div
          style={{ backgroundColor: theme.primary }}
          className="w-4 h-4 rounded-full inline-block"
        ></div>
        <div
          style={{ backgroundColor: theme.secondary }}
          className="w-4 h-4 rounded-full inline-block"
        ></div>
        <div
          style={{ backgroundColor: theme.accent }}
          className="w-4 h-4 rounded-full inline-block"
        ></div>
        <div
          style={{ backgroundColor: theme.neutral }}
          className="w-4 h-4 rounded-full inline-block"
        ></div>

        <span>{themeData[theme.name].name}</span>
      </div>
    ),
  }));

  const handleChange = (selectedOption) => {
    setSelectedTheme(selectedOption.value);
  };

  return (
    <div>
      {/* select theme controller */}
      <h2 className="my-1">Theme</h2>
      <Select
        options={options}
        onChange={handleChange}
        className="w-full max-w-xs"
      />
      {/* select background color controller*/}

      <h2 className="my-1">Background</h2>
      <div className="grid grid-cols-3 gap-4">
        {GradientData.map((bg, index) => index < indexNum && (
          <div
            className="w-full h-[70px] mb-1 rounded-lg hover:border-black hover:border border border-gray-300 flex items-center justify-center cursor-pointer "
            style={{ backgroundImage: bg.gradient }}
            onClick={()=> setSelectedBackground(bg.gradient)}
            key={index}
          >
            {index==0 && "None"}
          </div>
        ))}
        
      </div>
      <input
              type="submit"
              value={indexNum > 6 ? "Show Less" : "Show More"}
              className="btn w-full border border-gray-500 hover:border-black"
              onClick={()=>setIndexNum((pre)=> pre == 6 ? 20 : 6 )}
            />
    </div>
  );
}

export default Controller;
