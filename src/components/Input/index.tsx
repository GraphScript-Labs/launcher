import type { InputHTMLAttributes } from "react";
import "./style.css";

export function Input({
  updateValue,
  ...props
}: {
  updateValue: (value: string) => void;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (<>
    <input
      className="input"
      onInput={(event) => {
        const target = event.target as HTMLInputElement;
        updateValue(target.value);
      }}
      {...props}
    />
  </>);
}

