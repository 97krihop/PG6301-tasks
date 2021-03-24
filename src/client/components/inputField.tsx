import React from "react";

export interface props {
  value: string | number | undefined;
  onValueChange: (x: string | number) => void;
  type: string;
  label: string;
}

export function InputField({
  value,
  onValueChange,
  type = "text",
  label,
}: props) {
  return (
    <div>
      <label>
        {label}:{" "}
        <input
          type={type}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
        />
      </label>
    </div>
  );
}
