import { Handle, Position } from "reactflow";
import * as Icons from "@mui/icons-material";
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
  required?: boolean;
  placeholder?: string;
  type?: string;
  disableDrag?(disable: boolean): void;
  hidden?: boolean;
  hasHandle?: boolean;
  handleId?: string | number;
  handleType?: "target" | "source";
  handlePosition?: Position;
  handleIsConnectable?: any;
  handleStyle?: any;
}

interface FileInputProps {
  label: string;
  required?: boolean;
  hidden?: boolean;
  hasHandle?: boolean;
  handleId?: string | number;
  handleType?: "target" | "source";
  handlePosition?: Position;
  handleIsConnectable?: any;
  handleStyle?: any;
}

interface RadioInputProps {
  label: string;
  required?: boolean;
  options?: string[] | { labels: string[]; states: boolean[] };
  initial?: number | string;
  hidden?: boolean;
  hasHandle?: boolean;
  handleId?: string | number;
  handleType?: "target" | "source";
  handlePosition?: Position;
  handleIsConnectable?: any;
  handleStyle?: any;
}

interface ColorInputProps {
  label: string;
  required?: boolean;
  initialColor?: string;
  hidden?: boolean;
  hasHandle?: boolean;
  handleId?: string | number;
  handleType?: "target" | "source";
  handlePosition?: Position;
  handleIsConnectable?: any;
  handleStyle?: any;
}

interface SliderInputProps {
  label: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  initial?: number | string;
  disableDrag?(disable: boolean): void;
  hidden?: boolean;
  hasHandle?: boolean;
  handleId?: string | number;
  handleType?: "target" | "source";
  handlePosition?: Position;
  handleIsConnectable?: any;
  handleStyle?: any;
}

interface DropdownInputProps {
  label: string;
  required?: boolean;
  options?: string[] | { labels: string[]; states: boolean[] };
  initial?: string | number;
  hidden?: boolean;
  hasHandle?: boolean;
  handleId?: string | number;
  handleType?: "target" | "source";
  handlePosition?: Position;
  handleIsConnectable?: any;
  handleStyle?: any;
}

interface CheckboxInputProps {
  label: string;
  required?: boolean;
  options?: string[] | { labels: string[]; states: boolean[] };
  isToggle?: boolean;
  hidden?: boolean;
  hasHandle?: boolean;
  handleId?: string | number;
  handleType?: "target" | "source";
  handlePosition?: Position;
  handleIsConnectable?: any;
  handleStyle?: any;
}

interface BezierCurveInputProps {
  label: string;
  required?: boolean;
  initialHandles?: { x: number; y: number }[];
  disableDrag?(disable: boolean): void;
  maxX?: number;
  maxY?: number;
  hidden?: boolean;
  hasHandle?: boolean;
  handleId?: string | number;
  handleType?: "target" | "source";
  handlePosition?: Position;
  handleIsConnectable?: any;
  handleStyle?: any;
}

interface DatetimeInputProps {
  label: string;
  required?: boolean;
  startingDate?: string;
  hidden?: boolean;
  hasHandle?: boolean;
  handleId?: string | number;
  handleType?: "target" | "source";
  handlePosition?: Position;
  handleIsConnectable?: any;
  handleStyle?: any;
}

interface NumberInputProps {
  label: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  initial?: number | string;
  disableDrag?(disable: boolean): void;
  hidden?: boolean;
  hasHandle?: boolean;
  handleId?: string | number;
  handleType?: "target" | "source";
  handlePosition?: Position;
  handleIsConnectable?: any;
  handleStyle?: any;
}

interface CustomIconElementProps {
  name?: string;
  color: string;
  width: string;
  height: string;
}

interface HandleElementProps {
  label: string;
  handleId?: string;
  type?: "target" | "source" | string;
  position?: Position;
  isConnectable?: any;
  style?: any;
}

export function HandleElement(props: HandleElementProps) {
  return (
    <div
      id="handle"
      style={{
        color: "white",
        fontSize: "10px",
        textAlign:
          props.position === "left" || props.position === "right"
            ? props.position
            : "left",
        padding: "0.25rem 0",
      }}
    >
      {(props.type === "target" || props.type === "source") &&
        props.position && (
          <Handle
            type={props.type}
            position={props.position}
            id={props.label}
            isConnectable={props.isConnectable}
            style={props.style}
          />
        )}
      {props.label}
    </div>
  );
}

export function TextElement(props: { text: string; hidden?: boolean }) {
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        color: "white",
        fontSize: "12px",
        borderBottom: "1px solid #505050",
        borderTop: "1px solid #505050",
        padding: "0.25rem 0",
        background: "#383838",
        display: props.hidden ? "none" : "block",
      }}
    >
      {props.text}
    </div>
  );
}

export function TextInput(props: TextInputProps) {
  const [value, setValue] = React.useState<string | undefined>("");

  React.useEffect(() => {
    Object.keys(process.env).forEach((key) => {
      if (key.startsWith("REACT_APP_")) {
        const keyWithoutPrefix = key.replace("REACT_APP_", "");
        const processedLabel = props.label.toUpperCase().replace(/\s+/g, "_");
        if (keyWithoutPrefix === processedLabel) {
          console.log("Found env variable match: ", keyWithoutPrefix);
          setValue(process.env[key]);
        }
      }
    });
  }, []);

  return (
    <div
      id="data-item"
      onMouseEnter={() => (props.disableDrag ? props.disableDrag(true) : {})}
      onMouseLeave={() => (props.disableDrag ? props.disableDrag(false) : {})}
      style={{
        gap: "5px",
        alignItems: "center",
        display: props.hidden ? "none" : "flex",
      }}
    >
      {props.hasHandle && (
        <Handle
          type={props.handleType ? props.handleType : "source"}
          position={props.handlePosition ? props.handlePosition : Position.Left}
          id={`element_${props.handleId}`}
          isConnectable={props.handleIsConnectable}
          style={props.handleStyle}
        />
      )}
      <label style={{ textWrap: "nowrap", textAlign: "left" }}>
        {props.label}
      </label>
      {props.required && <span style={{ color: "red" }}>*</span>}
      <input
        type={props.type ? props.type : "text"}
        placeholder={props.placeholder ? props.placeholder : ""}
        style={{ fontSize: "12px", width: "100%" }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export function TextAreaInput(props: TextInputProps) {
  const [value, setValue] = React.useState<string>("");

  return (
    <div
      id="data-item"
      onMouseEnter={() => (props.disableDrag ? props.disableDrag(true) : {})}
      onMouseLeave={() => (props.disableDrag ? props.disableDrag(false) : {})}
      style={{
        gap: "5px",
        display: props.hidden ? "none" : "flex",
        marginBottom: "0.5rem",
      }}
    >
      {props.hasHandle && (
        <Handle
          type={props.handleType ? props.handleType : "source"}
          position={props.handlePosition ? props.handlePosition : Position.Left}
          id={`element_${props.handleId}`}
          isConnectable={props.handleIsConnectable}
          style={props.handleStyle}
        />
      )}
      <label style={{ textWrap: "nowrap", textAlign: "left" }}>
        {props.label}
      </label>
      {props.required && <span style={{ color: "red" }}>*</span>}
      <textarea
        placeholder={props.placeholder ? props.placeholder : ""}
        style={{
          marginTop: "5px",
          fontSize: "12px",
          width: "100%",
          resize: "none",
          overflow: "auto",
          height: "auto",
          maxHeight: "15rem",
        }}
        rows={1}
        onInput={(e) => {
          e.currentTarget.style.height = "auto";
          e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export function FileInput(props: FileInputProps) {
  const [file, setFile] = React.useState<File | null>(null);

  return (
    <div
      id="data-item"
      style={{
        display: props.hidden ? "none" : "flex",
        gap: "5px",
        alignItems: "center",
      }}
    >
      {props.hasHandle && (
        <Handle
          type={props.handleType ? props.handleType : "source"}
          position={props.handlePosition ? props.handlePosition : Position.Left}
          id={`element_${props.handleId}`}
          isConnectable={props.handleIsConnectable}
          style={props.handleStyle}
        />
      )}
      <label style={{ textWrap: "nowrap", textAlign: "left" }}>
        {props.label}
      </label>
      {props.required && <span style={{ color: "red" }}>*</span>}
      <input
        type="file"
        style={{ fontSize: "12px", width: "100%", color: "white" }}
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />
    </div>
  );
}

export function RadioInput(props: RadioInputProps) {
  const [selected, setSelected] = React.useState(props.initial);

  return (
    <div
      id="data-item"
      style={{
        display: props.hidden ? "none" : "flex",
        gap: "5px",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      {props.hasHandle && (
        <Handle
          type={props.handleType ? props.handleType : "source"}
          position={props.handlePosition ? props.handlePosition : Position.Left}
          id={`element_${props.handleId}`}
          isConnectable={props.handleIsConnectable}
          style={props.handleStyle}
        />
      )}
      <label style={{ textWrap: "nowrap", textAlign: "left" }}>
        {props.label}
      </label>
      {props.required && <span style={{ color: "red" }}>*</span>}
      <fieldset
        style={{
          border: "none",
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          padding: "0",
        }}
        id={`group-${Math.random().toString(36).substring(7)}`}
      >
        {Array.isArray(props.options) &&
          props.options.map((label, index) => (
            <div style={{ textAlign: "center" }} key={index}>
              <input
                type="radio"
                value={label}
                name={`group-${Math.random().toString(36).substring(7)}`}
                style={{ fontSize: "12px", cursor: "pointer" }}
                checked={selected === index}
                onChange={() => setSelected(index)}
              />
              <p
                style={{
                  lineHeight: 0,
                  fontSize: "10px",
                  margin: "10px 0 0 0",
                  color: "white",
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
  const [color, setColor] = React.useState(props.initialColor);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  return (
    <div
      id="data-item"
      style={{
        display: props.hidden ? "none" : "flex",
        gap: "5px",
        alignItems: "center",
      }}
    >
      {props.hasHandle && (
        <Handle
          type={props.handleType ? props.handleType : "source"}
          position={props.handlePosition ? props.handlePosition : Position.Left}
          id={`element_${props.handleId}`}
          isConnectable={props.handleIsConnectable}
          style={props.handleStyle}
        />
      )}
      <label style={{ textWrap: "nowrap", textAlign: "left" }}>
        {props.label}
      </label>
      {props.required && <span style={{ color: "red" }}>*</span>}
      <input
        type="color"
        value={color}
        style={{ fontSize: "12px", width: "100%", cursor: "pointer" }}
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
      id="data-item"
      onMouseEnter={() => (props.disableDrag ? props.disableDrag(true) : {})}
      onMouseLeave={() => (props.disableDrag ? props.disableDrag(false) : {})}
      style={{
        display: props.hidden ? "none" : "flex",
        gap: "5px",
        alignItems: "center",
      }}
    >
      {props.hasHandle && (
        <Handle
          type={props.handleType ? props.handleType : "source"}
          position={props.handlePosition ? props.handlePosition : Position.Left}
          id={`element_${props.handleId}`}
          isConnectable={props.handleIsConnectable}
          style={props.handleStyle}
        />
      )}
      <label style={{ textWrap: "nowrap", textAlign: "left" }}>
        {props.label}
      </label>
      {props.required && <span style={{ color: "red" }}>*</span>}
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={value}
        onChange={handleChange}
        style={{ width: "100%", cursor: "pointer" }}
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
          height: "2rem",
          padding: "0 0.1rem",
          marginTop: "0.25rem",
          textAlign: "center",
          lineHeight: "2rem",
        }}
      >
        {value}
      </label>
    </div>
  );
}

export function DropdownInput(props: DropdownInputProps) {
  const [selection, setSelection] = React.useState(props.initial);

  return (
    <div
      id="data-item"
      style={{
        display: props.hidden ? "none" : "flex",
        gap: "5px",
        alignItems: "center",
      }}
    >
      {props.hasHandle && (
        <Handle
          type={props.handleType ? props.handleType : "source"}
          position={props.handlePosition ? props.handlePosition : Position.Left}
          id={`element_${props.handleId}`}
          isConnectable={props.handleIsConnectable}
          style={props.handleStyle}
        />
      )}
      <label style={{ textWrap: "nowrap", textAlign: "left" }}>
        {props.label}
      </label>
      {props.required && <span style={{ color: "red" }}>*</span>}
      <select
        style={{ fontSize: "12px", width: "100%", cursor: "pointer" }}
        value={selection}
        onChange={(event) => setSelection(event.target.value)}
      >
        {Array.isArray(props.options) &&
          props.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
}

export function CheckboxInput(props: CheckboxInputProps) {
  const [states, setStates] = React.useState(
    props.options && props.options["states"]
  );

  return (
    <div
      id="data-item"
      style={{
        display: props.hidden ? "none" : "flex",
        gap: "5px",
        alignItems: "center",
        marginBottom:
          props.options && props.options["labels"].length > 1 ? "0.5rem" : "0",
      }}
    >
      {props.hasHandle && (
        <Handle
          type={props.handleType ? props.handleType : "source"}
          position={props.handlePosition ? props.handlePosition : Position.Left}
          id={`element_${props.handleId}`}
          isConnectable={props.handleIsConnectable}
          style={props.handleStyle}
        />
      )}
      <label style={{ textWrap: "nowrap", textAlign: "left" }}>
        {props.label}
      </label>
      {props.required && <span style={{ color: "red" }}>*</span>}
      <fieldset
        style={{
          border: "none",
          width: "100%",
          display: "flex",
          justifyContent:
            props.options && props.options["labels"].length > 1
              ? "space-around"
              : "left",
          padding: "0",
        }}
        id="group"
      >
        {props.options &&
          props.options["labels"].map((label, index) => (
            <div style={{ textAlign: "center" }} key={index}>
              <input
                type="checkbox"
                value={states && states[index].toString()}
                name="group"
                style={{ fontSize: "12px", cursor: "pointer" }}
                checked={states && states[index]}
                onChange={() => {
                  setStates((prevStates) => {
                    if (!prevStates) return;
                    const newStates = [...prevStates];
                    newStates[index] = !newStates[index];
                    return newStates;
                  });
                }}
              />
              {props.options && props.options["labels"].length > 1 && (
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
    <div
      id="data-item"
      style={{
        display: props.hidden ? "none" : "flex",
        gap: "5px",
        alignItems: "center",
      }}
    >
      {props.hasHandle && (
        <Handle
          type={props.handleType ? props.handleType : "source"}
          position={props.handlePosition ? props.handlePosition : Position.Left}
          id={`element_${props.handleId}`}
          isConnectable={props.handleIsConnectable}
          style={props.handleStyle}
        />
      )}
      <label style={{ textWrap: "nowrap", textAlign: "left" }}>
        {props.label}
      </label>
      {props.required && <span style={{ color: "red" }}>*</span>}
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
  const [value, setValue] = React.useState(props.initial);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  return (
    <div
      id="data-item"
      onMouseEnter={() => (props.disableDrag ? props.disableDrag(true) : {})}
      onMouseLeave={() => (props.disableDrag ? props.disableDrag(false) : {})}
      style={{
        display: props.hidden ? "none" : "flex",
        gap: "5px",
        alignItems: "center",
      }}
    >
      {props.hasHandle && (
        <Handle
          type={props.handleType ? props.handleType : "source"}
          position={props.handlePosition ? props.handlePosition : Position.Left}
          id={`element_${props.handleId}`}
          isConnectable={props.handleIsConnectable}
          style={props.handleStyle}
        />
      )}
      <label style={{ textWrap: "nowrap", textAlign: "left" }}>
        {props.label}
      </label>
      {props.required && <span style={{ color: "red" }}>*</span>}
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
  const svgRef = React.useRef<SVGSVGElement | null>(null);

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
    let newX = handles ? handles[draggingIndex].x : 0;
    if (draggingIndex === 1 || draggingIndex === 2) {
      newX = event.clientX - svgRect.left;
      newX = Math.max(0, Math.min(newX, props.maxX ? props.maxX : 0)); // Ensure newX is within bounds
    }

    let newY = event.clientY - svgRect.top;
    newY = Math.max(0, Math.min(newY, props.maxY ? props.maxY : 0)); // Ensure newY is within bounds

    setHandles((prevHandles) => {
      if (!prevHandles) return;
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
      id="data-item"
      onMouseEnter={() => (props.disableDrag ? props.disableDrag(true) : {})}
      onMouseLeave={() => (props.disableDrag ? props.disableDrag(false) : {})}
      style={{ display: props.hidden ? "none" : "default", cursor: "default" }}
    >
      {props.hasHandle && (
        <Handle
          type={props.handleType ? props.handleType : "source"}
          position={props.handlePosition ? props.handlePosition : Position.Left}
          id={`element_${props.handleId}`}
          isConnectable={props.handleIsConnectable}
          style={props.handleStyle}
        />
      )}
      <label>{props.label}</label>
      {props.required && <span style={{ color: "red" }}>*</span>}
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
          x1={handles ? handles[0].x : 0}
          y1={handles ? handles[0].y : 0}
          x2={handles ? handles[1].x : 0}
          y2={handles ? handles[1].y : 0}
          stroke="#00aeff"
          strokeDasharray="4"
        />
        <line
          x1={handles ? handles[3].x : 0}
          y1={handles ? handles[3].y : 0}
          x2={handles ? handles[2].x : 0}
          y2={handles ? handles[2].y : 0}
          stroke="#00aeff"
          strokeDasharray="4"
        />

        {/* Bezier Curve */}
        <path
          d={`M${handles ? handles[0].x : 0},${handles ? handles[0].y : 0} C${
            handles ? handles[1].x : 0
          },${handles ? handles[1].y : 0} ${handles ? handles[2].x : 0},${
            handles ? handles[2].y : 0
          } ${handles ? handles[3].x : 0},${handles ? handles[3].y : 0}`}
          fill="none"
          stroke="white"
        />

        {/* Control Points */}
        {handles &&
          handles.map((handle, index) => (
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

export function SmartElement(props: CustomIconElementProps) {
  if (props.name === "openai") {
    return <OpenAIElement {...props} />;
  } else if (props.name === "gemini") {
    return <GeminiElement {...props} />;
  } else if (props.name === "ollama") {
    return <OllamaElement {...props} />;
  } else if (props.name === "text") {
    return <Icons.Rtt style={{ color: props.color ? props.color : "white" }} />;
  } else if (props.name === "image") {
    return (
      <Icons.Image style={{ color: props.color ? props.color : "white" }} />
    );
  } else if (props.name === "audio") {
    return <Icons.Mic style={{ color: props.color ? props.color : "white" }} />;
  } else if (props.name === "video") {
    return (
      <Icons.Movie style={{ color: props.color ? props.color : "white" }} />
    );
  } else if (props.name === "file") {
    return (
      <Icons.InsertDriveFile
        style={{ color: props.color ? props.color : "white" }}
      />
    );
  } else if (props.name === "text-chat") {
    return (
      <Icons.Chat style={{ color: props.color ? props.color : "white" }} />
    );
  } else if (props.name === "multimodal-chat") {
    return <Icons.Mms style={{ color: props.color ? props.color : "white" }} />;
  } else if (props.name === "system prompt") {
    return (
      <Icons.Terminal style={{ color: props.color ? props.color : "white" }} />
    );
  } else if (props.name === "chat constructor") {
    return (
      <Icons.Build style={{ color: props.color ? props.color : "white" }} />
    );
  } else if (props.name === "rosie llm" || props.name === "rosie sklearn") {
    return (
      <Icons.FilterVintage
        style={{ color: props.color ? props.color : "white" }}
      />
    );
  } else {
    if (!props.name) {
      return <Icons.Help style={{ color: "white" }} />;
    }
    const IconComponent = Icons[props.name];

    if (!IconComponent) {
      return <Icons.Help style={{ color: "white" }} />;
    }

    return (
      <IconComponent style={{ color: props.color ? props.color : "white" }} />
    );
  }
}

export function OpenAIElement(props: CustomIconElementProps) {
  return (
    <svg
      role="img"
      style={{
        width: props.width,
        height: props.height,
        fill: props.color ? props.color : "white",
      }}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  );
}

export function GeminiElement(props: CustomIconElementProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      style={{
        width: props.width,
        height: props.height,
        fill: props.color ? props.color : "white",
      }}
    >
      <path d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z" />
    </svg>
  );
}

export function OllamaElement(props: CustomIconElementProps) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 646 854"
      fill={props.color ? props.color : "white"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M140.629 0.239929C132.66 1.52725 123.097 5.69568 116.354 10.845C95.941 26.3541 80.1253 59.2728 73.4435 100.283C70.9302 115.792 69.2138 137.309 69.2138 153.738C69.2138 173.109 71.4819 197.874 74.7309 214.977C75.4665 218.778 75.8343 222.15 75.5278 222.395C75.2826 222.64 72.2788 225.092 68.9072 227.789C57.3827 236.984 44.2029 251.145 35.1304 264.08C17.7209 288.784 6.44151 316.86 1.72133 347.265C-0.117698 359.28 -0.608106 383.555 0.863118 395.57C4.11207 423.278 12.449 446.695 26.7321 468.151L31.391 475.078L30.0424 477.346C20.4794 493.407 12.3264 516.64 8.52575 538.953C5.522 556.608 5.15419 561.328 5.15419 584.99C5.15419 608.837 5.4607 613.557 8.28054 630.047C11.6521 649.786 18.5178 670.689 26.1804 684.605C28.6938 689.141 34.8239 698.581 35.5595 699.072C35.8047 699.194 35.0691 701.462 33.9044 704.098C25.077 723.408 17.537 749.093 14.4106 770.733C12.2038 785.567 11.8973 790.349 11.8973 805.981C11.8973 825.903 13.0007 835.589 17.1692 851.466L17.7822 853.795H44.019H70.3172L68.6007 850.546C57.9957 830.93 57.0149 794.517 66.1487 758.166C70.3172 741.369 75.0374 729.048 83.8647 712.067L89.1366 701.769V695.455C89.1366 689.57 89.014 688.896 87.1137 685.034C85.6424 682.091 83.6808 679.578 80.1866 676.145C74.2404 670.383 69.9494 664.314 66.5165 656.835C51.4365 624.1 48.494 575.489 59.0991 534.049C63.5128 516.762 70.8076 501.376 78.4702 492.978C83.6808 487.215 86.378 480.779 86.378 474.097C86.378 467.17 83.926 461.469 78.4089 455.523C62.5932 438.604 52.8464 418.006 49.3522 394.038C44.3868 359.893 53.3981 322.683 73.8726 293.198C93.9181 264.263 122.055 245.689 153.503 240.724C160.552 239.559 173.732 239.743 181.088 241.092C189.119 242.502 194.145 242.072 199.295 239.62C205.67 236.617 208.858 232.877 212.597 224.295C215.907 216.633 218.482 212.464 225.409 203.821C233.746 193.461 241.776 186.411 254.649 177.89C269.362 168.266 286.097 161.278 302.771 157.906C308.839 156.68 311.659 156.496 323 156.496C334.341 156.496 337.161 156.68 343.229 157.906C367.688 162.872 391.964 175.5 411.335 193.399C415.503 197.261 425.495 209.644 428.683 214.794C429.909 216.816 432.055 221.108 433.403 224.295C437.142 232.877 440.33 236.617 446.705 239.62C451.671 242.011 456.881 242.502 464.605 241.214C476.804 239.13 486.183 239.314 498.137 241.766C538.841 249.98 574.273 283.512 589.966 328.446C603.636 367.862 599.774 409.118 579.422 440.626C575.989 445.96 572.556 450.251 567.591 455.523C556.863 466.986 556.863 481.208 567.53 492.978C585.062 512.165 596.035 559.367 592.724 600.99C590.518 628.453 583.468 653.035 573.782 666.95C572.066 669.402 568.511 673.57 565.813 676.145C562.319 679.578 560.358 682.091 558.886 685.034C556.986 688.896 556.863 689.57 556.863 695.455V701.769L562.135 712.067C570.963 729.048 575.683 741.369 579.851 758.166C588.863 794.027 588.066 829.704 577.767 849.995C576.909 851.711 576.173 853.305 576.173 853.489C576.173 853.673 587.882 853.795 602.226 853.795H628.218L628.892 851.159C629.26 849.75 629.873 847.604 630.179 846.378C630.854 843.681 632.202 835.712 633.306 828.049C634.348 820.325 634.348 791.881 633.306 783.299C629.383 752.158 622.823 727.454 612.096 704.098C610.931 701.462 610.195 699.194 610.44 699.072C610.747 698.888 612.463 696.436 614.302 693.677C627.666 673.448 635.88 648.008 640.049 614.415C641.152 605.158 641.152 565.374 640.049 556.485C637.106 533.559 633.551 517.988 627.666 502.234C625.214 495.675 618.716 481.821 615.958 477.346L614.609 475.078L619.268 468.151C633.551 446.695 641.888 423.278 645.137 395.57C646.608 383.555 646.118 359.28 644.279 347.265C639.497 316.798 628.279 288.845 610.87 264.08C601.797 251.145 588.617 236.984 577.093 227.789C573.721 225.092 570.717 222.64 570.472 222.395C570.166 222.15 570.534 218.778 571.269 214.977C578.687 176.296 578.441 128.053 570.656 90.3524C563.913 57.4951 551.653 31.3808 535.837 16.3008C523.209 4.28578 510.336 -0.863507 494.888 0.11731C459.456 2.20154 430.89 42.9667 419.61 107.21C417.771 117.57 416.178 129.708 416.178 133.018C416.178 134.305 415.932 135.347 415.626 135.347C415.319 135.347 412.929 134.121 410.354 132.589C383.014 116.405 352.608 107.762 323 107.762C293.392 107.762 262.986 116.405 235.646 132.589C233.071 134.121 230.681 135.347 230.374 135.347C230.068 135.347 229.822 134.305 229.822 133.018C229.822 129.585 228.167 117.08 226.39 107.21C216.152 49.5259 192.674 11.3354 161.472 1.71112C157.181 0.423799 144.982 -0.434382 140.629 0.239929ZM151.051 50.139C159.878 57.1273 169.686 77.1114 175.326 99.4863C176.368 103.532 177.471 108.191 177.778 109.907C178.023 111.563 178.697 115.302 179.249 118.183C181.64 131.179 182.743 145.217 182.866 162.32L182.927 179.178L178.697 185.43L174.468 191.744H164.598C153.074 191.744 141.61 193.216 130.637 196.158C126.714 197.139 122.913 198.12 122.178 198.304C121.013 198.549 120.829 198.181 120.155 193.154C116.538 165.875 116.722 135.654 120.707 110.52C125.12 82.5059 135.419 57.1273 145.472 49.6486C147.863 47.8708 148.292 47.9321 151.051 50.139ZM500.589 49.7098C506.658 54.1848 513.34 66.0772 518.305 81.2798C528.297 111.685 531.117 153.431 525.845 193.154C525.171 198.181 524.987 198.549 523.822 198.304C523.087 198.12 519.286 197.139 515.363 196.158C504.39 193.216 492.926 191.744 481.402 191.744H471.532L467.303 185.43L463.073 179.178L463.134 162.32C463.257 138.535 465.464 119.961 470.735 99.3024C476.314 77.1114 486.183 57.1273 494.949 50.139C497.708 47.9321 498.137 47.8708 500.589 49.7098Z"
        fill={props.color ? props.color : "white"}
      />
      <path
        d="M313.498 358.237C300.195 359.525 296.579 360.015 290.203 361.303C279.843 363.448 265.989 368.23 256.365 372.95C222.895 389.317 199.846 416.596 192.796 448.166C191.386 454.419 191.202 456.503 191.202 467.047C191.202 477.468 191.386 479.736 192.735 485.682C202.114 526.938 240.12 557.405 289.284 562.983C299.95 564.148 346.049 564.148 356.715 562.983C396.193 558.508 430.154 537.114 445.418 507.076C449.463 499.046 451.425 493.835 453.264 485.682C454.613 479.736 454.797 477.468 454.797 467.047C454.797 456.503 454.613 454.419 453.203 448.166C442.965 402.313 398.461 366.207 343.903 359.341C336.792 358.483 318.157 357.747 313.498 358.237ZM336.424 391.585C354.631 393.547 372.96 400.045 387.672 409.853C395.58 415.125 406.737 426.159 411.518 433.393C417.403 442.342 420.774 451.476 422.307 462.572C422.981 467.66 422.614 471.522 420.774 479.736C417.893 491.996 408.943 504.808 396.867 513.758C391.227 517.865 379.519 523.812 372.347 526.141C358.738 530.493 349.849 531.29 318.095 531.045C297.376 530.861 293.697 530.677 287.751 529.574C267.461 525.773 251.4 517.681 239.753 505.36C230.312 495.429 226.021 486.357 223.692 471.706C222.65 464.901 224.611 453.622 228.596 444.12C233.439 432.534 245.944 418.129 258.327 409.853C272.671 400.29 291.552 393.486 308.9 391.647C315.582 390.911 329.742 390.911 336.424 391.585Z"
        fill={props.color ? props.color : "white"}
      />
      <path
        d="M299.584 436.336C294.925 438.849 291.676 445.224 292.657 449.944C293.76 455.032 298.235 460.182 305.223 464.412C308.963 466.68 309.208 466.986 309.392 469.254C309.514 470.603 309.024 474.465 308.35 477.898C307.614 481.269 307.062 484.825 307.062 485.806C307.124 488.442 309.576 492.733 312.15 494.817C314.419 496.656 314.848 496.717 321.223 496.901C327.047 497.085 328.273 496.962 330.602 495.859C336.61 492.916 338.142 487.522 335.935 477.162C334.096 468.519 334.464 467.17 339.062 464.534C343.904 461.714 349.054 456.749 350.586 453.377C353.529 446.941 350.831 439.646 344.333 436.274C342.74 435.477 340.778 435.11 337.897 435.11C333.422 435.11 330.541 436.152 325.269 439.523L322.265 441.424L320.365 440.259C312.58 435.661 311.17 435.11 306.449 435.171C303.078 435.171 301.239 435.477 299.584 436.336Z"
        fill={props.color ? props.color : "white"}
      />
      <path
        d="M150.744 365.165C139.894 368.598 131.802 376.567 127.634 387.908C125.611 393.303 124.63 401.824 125.488 406.421C127.511 417.394 136.522 427.386 146.76 430.145C159.633 433.516 169.257 431.309 177.778 422.85C182.743 418.007 185.441 413.777 188.138 406.911C190.099 402.069 190.222 401.211 190.222 394.345L190.283 386.989L187.709 381.717C183.601 373.38 176.184 367.188 167.602 364.92C162.759 363.694 154.974 363.756 150.744 365.165Z"
        fill={props.color ? props.color : "white"}
      />
      <path
        d="M478.153 364.982C469.755 367.25 462.276 373.502 458.291 381.717L455.717 386.989L455.778 394.345C455.778 401.211 455.901 402.069 457.862 406.911C460.56 413.777 463.257 418.007 468.222 422.85C476.743 431.309 486.367 433.516 499.241 430.145C506.658 428.183 514.075 421.93 517.631 414.635C520.696 408.444 521.431 403.969 520.451 396.919C518.183 380.797 508.742 369.089 494.704 364.982C490.597 363.756 482.628 363.756 478.153 364.982Z"
        fill={props.color ? props.color : "white"}
      />
    </svg>
  );
}
