import { useState, useEffect } from "react";
import NiceAvatar, { genConfig } from "react-nice-avatar";

const OPTIONS = {
  sex: ["man", "woman"],
  faceColor: ["#F9C9B6", "#AC6651", "#77311D", "#E0AC69", "#8D5524"],
  hairStyle: ["normal", "thick", "mohawk", "womanLong", "womanShort"],
  hairColor: ["#000000", "#FFFFFF", "#77311D", "#FC909F", "#D2EFF3", "#506AF4", "#F48150", "#FFEBA4"],
  eyeStyle: ["circle", "oval", "smile"],
  eyeBrowStyle: ["up", "upWoman"],
  mouthStyle: ["laugh", "smile", "peace"],
  noseStyle: ["short", "long", "round"],
  earSize: ["small", "big"],
  glassesStyle: ["none", "round", "square"],
  shirtStyle: ["hoody", "short", "polo"],
  shirtColor: ["#9287FF", "#6BD9E9", "#FC909F", "#F48150", "#77311D", "#E0DDFF", "#FFFFFF", "#000000"],
  hatStyle: ["none", "beanie", "turban"],
  hatColor: ["#000000", "#FFFFFF", "#77311D", "#FC909F", "#D2EFF3", "#506AF4", "#F48150"],
  bgColor: ["#E0DDFF", "#D2EFF3", "#FFEDEF", "#FFEFE4", "#F48150", "#C8F4D0", "#FFF6A3"],
};

export function AvatarDesigner({ value, onChange }) {
  const [config, setConfig] = useState(() => value || genConfig());

  // Wait for the component to mount before calling onchange initially (if needed)
  useEffect(() => {
    if (!value) {
      onChange(config);
    }
  }, []);

  const updateConfig = (key, val) => {
    const newConfig = { ...config, [key]: val };
    setConfig(newConfig);
    onChange(newConfig);
  };

  const randomize = () => {
    const newConfig = genConfig();
    setConfig(newConfig);
    onChange(newConfig);
  };

  const SELECT_CLS =
    "w-full dark:bg-white/5 bg-slate-100 border border-white/10 rounded-xl px-2 py-1.5 dark:text-white text-slate-900 text-xs focus:outline-none focus:border-indigo-500 transition-colors";

  const renderColorSwatches = (key, colors) => (
    <div className="flex gap-1.5 flex-wrap">
      {colors.map((c) => (
        <button
          key={c}
          type="button"
          className={`w-5 h-5 rounded-full border-2 transition-transform hover:scale-110 ${
            config[key] === c ? "border-indigo-500 shadow-md scale-110" : "border-transparent"
          }`}
          style={{ backgroundColor: c }}
          onClick={() => updateConfig(key, c)}
          title={c}
        />
      ))}
    </div>
  );

  return (
    <div className="p-4 border border-white/10 rounded-2xl dark:bg-slate-800/50 bg-white/50 space-y-5">
      <div className="flex flex-col items-center gap-3">
        <NiceAvatar style={{ width: "6rem", height: "6rem" }} {...config} />
        <button
          type="button"
          onClick={randomize}
          className="text-xs bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-500 dark:text-indigo-400 font-semibold px-4 py-1.5 rounded-full transition-colors flex items-center gap-2"
        >
          <span>🎲</span> Randomize Avatar
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {Object.entries(OPTIONS).filter(([k]) => !k.includes("Color") && k !== "bgColor" && k !== "faceColor").map(([key, opts]) => (
          <div key={key} className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider">
              {key.replace("Style", "").replace("Size", "")}
            </label>
            <select
              value={config[key] || "none"}
              onChange={(e) => updateConfig(key, e.target.value)}
              className={SELECT_CLS}
            >
              {opts.map((o) => (
                <option key={o} value={o} className="bg-slate-800 dark:text-white">
                  {o.charAt(0).toUpperCase() + o.slice(1)}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Colors Section */}
      <div className="border-t border-white/10 pt-4 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Colors</h4>
        {Object.entries(OPTIONS).filter(([k]) => k.includes("Color") || k === "bgColor" || k === "faceColor").map(([key, colors]) => (
          <div key={key} className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-semibold text-gray-500">
              {key.replace("Color", "")}
            </label>
            {renderColorSwatches(key, colors)}
          </div>
        ))}
      </div>
    </div>
  );
}
