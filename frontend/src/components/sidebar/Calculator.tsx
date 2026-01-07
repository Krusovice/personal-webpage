import { useState } from "react";
import { evaluate } from "mathjs";

import styling from "./../../styles/sidebar/Calculator.module.css"

export default function CalculatorInput() {
  const [value, setValue] = useState("");

  return (
    <div className= { styling.calculator }>
      <input
        value={value}
        onChange={e => setValue(e.target.value.replace(/,/g, "."))}
        onKeyDown={e => {
          if (e.key === "Enter") {
            try { setValue(String(evaluate(value))); }
            catch { setValue("Error"); }
          }
        }}
        placeholder="Pocket Calculator"
        autoComplete="off"
        spellCheck={false}
        type="text"
      />
    </div>
  );
}