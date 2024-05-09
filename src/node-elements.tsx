import React from "react";

const color_hex_map = {
  red: "#ff0000",
  orange: "#ffa500",
  yellow: "#ffff00",
  green: "#008000",
  blue: "#0000ff",
  indigo: "#4b0082",
  violet: "#ee82ee",
  white: "#ffffff",
  black: "#000000",
  gray: "#808080",
  cyan: "#00ffff",
  magenta: "#ff00ff",
  pink: "#ffc0cb",
  brown: "#a52a2a",
  purple: "#800080",
  gold: "#ffd700",
  silver: "#c0c0c0",
};

interface TextInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  disableDrag(disable: boolean): void;
}

interface FileInputProps {
  label: string;
}

interface RadioInputProps {
  label: string;
  options: string[];
}

interface ColorInputProps {
  label: string;
  initialColor: string;
}

interface SliderInputProps {
  label: string;
  min: number;
  max: number;
  step: number;
  initial: number;
  disableDrag(disable: boolean): void;
}

interface DropdownInputProps {
  label: string;
  options: string[];
}

interface CheckboxInputProps {
  label: string;
  options: string[];
}

interface BezierCurveInputProps {
  label: string;
  initialHandles: { x: number; y: number }[];
  disableDrag(disable: boolean): void;
  maxX: number;
  maxY: number;
}

interface DatetimeInputProps {
  label: string;
  startingDate: string;
}

interface NumberInputProps {
  label: string;
  min?: number;
  max?: number;
  step?: number;
  initial?: number;
  disableDrag(disable: boolean): void;
}

function getHexCode(colorName: string): string {
  return color_hex_map[colorName] || "";
}

export function TextInput(props: TextInputProps) {
  return (
    <div
      onMouseEnter={() => props.disableDrag(true)}
      onMouseLeave={() => props.disableDrag(false)}
      style={{ display: "flex", gap: "5px", alignItems: "center" }}
    >
      <label style={{ textWrap: "nowrap", textAlign: "left" }}>
        {props.label}
      </label>
      <input
        type={props.type ? props.type : "text"}
        placeholder={props.placeholder ? props.placeholder : ""}
        style={{ fontSize: "12px", width: "100%" }}
      />
    </div>
  );
}

export function FileInput(props: FileInputProps) {
  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
      <label style={{ textWrap: "nowrap", textAlign: "left" }}>
        {props.label}
      </label>
      <input
        type="file"
        style={{ fontSize: "12px", width: "100%", color: "white" }}
      />
    </div>
  );
}

export function RadioInput(props: RadioInputProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <label style={{ textWrap: "nowrap", textAlign: "left" }}>
        {props.label}
      </label>
      <fieldset
        style={{
          border: "none",
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          padding: "0",
        }}
        id="group"
      >
        {props.options.map((label, index) => (
          <div style={{ textAlign: "center" }} key={index}>
            <input
              type="radio"
              value={label}
              name="group"
              style={{ fontSize: "12px" }}
            />
            <p
              style={{
                lineHeight: 0,
                fontSize: "10px",
                color: "white",
                margin: "10px 0 0 0",
              }}
            >
              {label}
            </p>
          </div>
        ))}
      </fieldset>
    </div>
  );
}

export function ColorInput(props: ColorInputProps) {
  const [color, setColor] = React.useState(
    getHexCode(props.initialColor) || props.initialColor
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
      <label style={{ textWrap: "nowrap", textAlign: "left" }}>
        {props.label}
      </label>
      <input
        type="color"
        value={color}
        style={{ fontSize: "12px", width: "100%" }}
        onChange={handleChange}
      />
    </div>
  );
}

export function SliderInput(props: SliderInputProps) {
  const [value, setValue] = React.useState(props.initial);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  return (
    <div
      onMouseEnter={() => props.disableDrag(true)}
      onMouseLeave={() => props.disableDrag(false)}
      style={{ display: "flex", gap: "5px", alignItems: "center" }}
    >
      <label style={{ textWrap: "nowrap", textAlign: "left" }}>
        {props.label}
      </label>
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={value}
        onChange={handleChange}
        style={{ width: "100%" }}
      />
      <label
        style={{
          background: "white",
          borderRadius: "2px",
          color: "black",
          minWidth: "2rem",
          maxWidth: "2rem",
          overflow: "hidden",
          textOverflow: "clip",
          height: "2.05rem",
          padding: "0 0.1rem",
          marginTop: "0.25rem",
        }}
      >
        {value}
      </label>
    </div>
  );
}

export function DropdownInput(props: DropdownInputProps) {
  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
      <label style={{ textWrap: "nowrap", textAlign: "left" }}>
        {props.label}
      </label>
      <select style={{ fontSize: "12px", width: "100%" }}>
        {props.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CheckboxInput(props: CheckboxInputProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
        alignItems: "center",
        marginBottom: props.options.length > 1 ? "0.5rem" : "0",
      }}
    >
      <label style={{ textWrap: "nowrap", textAlign: "left" }}>
        {props.label}
      </label>
      <fieldset
        style={{
          border: "none",
          width: "100%",
          display: "flex",
          justifyContent: props.options.length > 1 ? "space-around" : "left",
          padding: "0",
        }}
        id="group"
      >
        {props.options.map((label, index) => (
          <div style={{ textAlign: "center" }} key={index}>
            <input
              type="checkbox"
              value={label}
              name="group"
              style={{ fontSize: "12px" }}
            />
            {props.options.length > 1 && (
              <p
                style={{
                  lineHeight: 0,
                  fontSize: "10px",
                  color: "white",
                  margin: "10px 0 0 0",
                }}
              >
                {label}
              </p>
            )}
          </div>
        ))}
      </fieldset>
    </div>
  );
}

export function DatetimeInput(props: DatetimeInputProps) {
  const [value, setValue] = React.useState(props.startingDate);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
      <label style={{ textWrap: "nowrap", textAlign: "left" }}>
        {props.label}
      </label>
      <input
        type="datetime-local"
        value={value}
        style={{ fontSize: "12px", width: "100%" }}
        onChange={handleChange}
      />
    </div>
  );
}

export function NumberInput(props: NumberInputProps) {
  const [value, setValue] = React.useState(
    props.initial !== undefined ? props.initial : 0
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  return (
    <div
      onMouseEnter={() => props.disableDrag(true)}
      onMouseLeave={() => props.disableDrag(false)}
      style={{ display: "flex", gap: "5px", alignItems: "center" }}
    >
      <label style={{ textWrap: "nowrap", textAlign: "left" }}>
        {props.label}
      </label>
      <input
        type="number"
        value={value}
        style={{ fontSize: "12px", width: "100%" }}
        onChange={handleChange}
        min={props.min}
        max={props.max}
        step={props.step}
      />
    </div>
  );
}

export function BezierCurveInput(props: BezierCurveInputProps) {
  const [handles, setHandles] = React.useState(props.initialHandles);
  const [draggingIndex, setDraggingIndex] = React.useState(null);
  const svgRef = React.useRef(null);

  const handleDragStart = (index) => {
    setDraggingIndex(index);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  const handleDragMove = (event) => {
    if (draggingIndex === null) return;

    const svg = svgRef.current!;
    const svgRect = svg.getBoundingClientRect();

    // Calculate the new coordinates within the SVG's bounding box
    let newX = handles[draggingIndex].x;
    if (draggingIndex === 1 || draggingIndex === 2) {
      newX = event.clientX - svgRect.left;
      newX = Math.max(0, Math.min(newX, props.maxX)); // Ensure newX is within bounds
    }

    let newY = event.clientY - svgRect.top;
    newY = Math.max(0, Math.min(newY, props.maxY)); // Ensure newY is within bounds

    setHandles((prevHandles) => {
      const newHandles = [...prevHandles];
      newHandles[draggingIndex] = { x: newX, y: newY };
      return newHandles;
    });
  };

  // Attach global mouse event listeners for dragging
  React.useEffect(() => {
    const handleMouseMove = (event) => handleDragMove(event);
    const handleMouseUp = () => handleDragEnd();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingIndex]);

  return (
    <div
      onMouseEnter={() => props.disableDrag(true)}
      onMouseLeave={() => props.disableDrag(false)}
      style={{ cursor: "default" }}
    >
      <label>{props.label}</label>
      <svg
        ref={svgRef}
        width="300"
        height="200"
        style={{
          background: "#38383b",
          border: "1px solid gray",
          borderRadius: "0.25rem",
        }}
      >
        {/* Connecting lines */}
        <line
          x1={handles[0].x}
          y1={handles[0].y}
          x2={handles[1].x}
          y2={handles[1].y}
          stroke="#00aeff"
          strokeDasharray="4"
        />
        <line
          x1={handles[3].x}
          y1={handles[3].y}
          x2={handles[2].x}
          y2={handles[2].y}
          stroke="#00aeff"
          strokeDasharray="4"
        />

        {/* Bezier Curve */}
        <path
          d={`M${handles[0].x},${handles[0].y} C${handles[1].x},${handles[1].y} ${handles[2].x},${handles[2].y} ${handles[3].x},${handles[3].y}`}
          fill="none"
          stroke="white"
        />

        {/* Control Points */}
        {handles.map((handle, index) => (
          <circle
            key={index}
            cx={handle.x}
            cy={handle.y}
            r={5}
            fill="blue"
            stroke="#00aeff"
            onMouseDown={() => handleDragStart(index)}
            style={{ cursor: "grab" }}
          />
        ))}
      </svg>
    </div>
  );
}
