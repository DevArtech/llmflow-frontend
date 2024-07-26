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
      <ROSIEElement {...props}/>
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

export function ROSIEElement(props: CustomIconElementProps) {
  return (
    <svg style={{fill: "#FFFFFF", strokeWidth: "1px"}} width={props.width} height={props.height} id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="125 125 800 1000" preserveAspectRatio="xMidYMid meet">
      <path className="cls-1" d="M310.23,741.25c-3.1-.49-6.26-.99-9.41-.9s-6.26.54-9.31,1.18c-4.92,1.04-9.74,3.12-14.15,5.49-4.5,2.42-8.58,5.55-12.54,8.75-3.12,2.52-6.01,5.3-8.78,8.2-11.53,12.05-21.21,25.98-29.04,40.68-7.98,14.98-14.34,30.86-19.85,46.9s-10.12,31.68-14.48,47.7c-5.12,18.85-9.23,38.3-9.56,57.9-.04,2.32-.02,4.64.06,6.96.13,3.93,1.58,7.8,4.39,10.61,2.6,2.6,6.87,4.56,10.61,4.39s7.9-1.45,10.61-4.39,4.53-6.59,4.39-10.61c-.29-8.47.26-16.94,1.38-25.33l-.54,3.99c2.12-15.62,6.17-30.88,10.52-46,3.79-13.15,7.71-26.28,12.22-39.21,2.49-7.15,5.17-14.23,8.11-21.2l-1.51,3.58c5.35-12.65,11.58-24.95,19.2-36.39,2.17-3.26,4.45-6.45,6.85-9.55l-2.35,3.04c6.01-7.75,12.68-15.22,20.46-21.24l-3.04,2.35c3.63-2.77,7.51-5.2,11.71-7.01l-3.58,1.51c2.96-1.25,6.04-2.16,9.23-2.6l-3.99.54c2.53-.32,5.05-.33,7.58,0l-3.99-.54c.27.04.54.08.81.12,1.99.63,3.99.71,5.98.27,2-.09,3.86-.68,5.58-1.78,3.11-1.82,6.08-5.39,6.89-8.96.87-3.84.69-8.15-1.51-11.56-1.98-3.07-5.19-6.29-8.96-6.89h0Z"/>
      <path className="cls-1" d="M199.08,977.43c2.69,1.27,5.49,2.54,8.44,3.09s6.07.97,9.11.96c5.01-.03,10.03-.94,14.96-1.74,8.4-1.36,16.77-2.83,25.13-4.42,16.72-3.17,33.35-6.78,49.96-10.44,8.28-1.83,16.61-3.53,24.85-5.54,8.85-2.17,17.36-5.53,25.5-9.61,6.93-3.48,13.55-7.56,20.06-11.76,6.85-4.42,13.62-8.98,20.28-13.67,14.18-9.99,27.96-20.57,41.29-31.68,1.57-1.3,3.13-2.62,4.68-3.94,2.79-2.37,4.39-7.07,4.39-10.61s-1.63-8.07-4.39-10.61-6.61-4.57-10.61-4.39l-3.99.54c-2.54.71-4.75,2-6.62,3.86-7.17,6.09-14.48,12.02-21.92,17.77l3.04-2.35c-8.57,6.61-17.31,12.99-26.22,19.13-8.62,5.94-17.36,11.78-26.41,17.06-5.06,2.95-10.26,5.67-15.66,7.96l3.58-1.51c-7.13,2.98-14.52,4.84-22.05,6.5-7.85,1.73-15.7,3.47-23.55,5.19-15.74,3.45-31.5,6.82-47.35,9.76-8.77,1.63-17.56,3.28-26.39,4.5l3.99-.54c-3.45.46-6.93.72-10.41.3l3.99.54c-1.84-.26-3.61-.7-5.33-1.42l3.58,1.51c-.26-.11-.53-.23-.78-.36-1.72-1.1-3.58-1.69-5.58-1.78-1.99-.45-3.99-.36-5.98.27-3.48.96-7.25,3.65-8.96,6.89-1.84,3.48-2.76,7.7-1.51,11.56,1.14,3.53,3.41,7.32,6.89,8.96h0Z"/>
      <path className="cls-1" d="M300.99,758.32c1.35,12.45,2.65,25.03,5.84,37.17,1.72,6.55,4.13,12.89,7.01,19.02s6.54,11.26,10.62,16.46c7.24,9.24,16.54,16.75,26.2,23.31,9.35,6.35,19.39,11.74,29.67,16.41,13.22,6.01,26.84,11.05,40.91,14.66,3.81.98,8.14.49,11.56-1.51,3.11-1.82,6.08-5.39,6.89-8.96.87-3.84.69-8.15-1.51-11.56s-5.13-5.91-8.96-6.89c-10.8-2.77-21.38-6.34-31.66-10.66l3.58,1.51c-14.76-6.25-29.26-13.89-41.98-23.71l3.04,2.35c-6.21-4.83-11.94-10.26-16.77-16.48l2.35,3.04c-3.75-4.89-6.84-10.19-9.26-15.86l1.51,3.58c-4.34-10.32-6.49-21.35-7.98-32.4l.54,3.99c-.6-4.48-1.1-8.97-1.58-13.46.08-2.07-.35-3.99-1.29-5.78-.6-1.86-1.64-3.47-3.1-4.83-2.6-2.6-6.87-4.56-10.61-4.39s-7.9,1.45-10.61,4.39c-2.52,2.75-4.81,6.73-4.39,10.61h0Z"/>
      <path className="cls-1" d="M202.19,591.54c.05,3.81-.18,7.61-.68,11.39l.54-3.99c-.97,7.04-2.88,13.9-5.64,20.44l1.51-3.58c-2.69,6.29-6.14,12.22-10.29,17.65l2.35-3.04c-3.46,4.47-7.37,8.56-11.71,12.19l-2.35,3.04-1.51,3.58-.54,3.99c-.08,2.07.35,3.99,1.29,5.78.36,1.27,1,2.37,1.93,3.31.67,1.13,1.56,2.02,2.69,2.69.94.93,2.04,1.57,3.31,1.93,1.79.94,3.71,1.37,5.78,1.29.27.02.54.05.8.08l-3.99-.54c2.12.29,4.14.87,6.11,1.7l-3.58-1.51c2.6,1.14,4.98,2.65,7.23,4.36l-3.04-2.35c5.36,4.15,10.02,9.23,14.56,14.24,4.77,5.27,9.29,10.74,13.64,16.36l-2.35-3.04c10.77,13.96,20.39,28.76,29.71,43.71,2.66,4.27,5.29,8.55,7.93,12.83,2.01,3.26,5.24,5.87,8.96,6.89s8.37.54,11.56-1.51,6.02-5.14,6.89-8.96.63-8.08-1.51-11.56c-8.89-14.44-17.8-28.89-27.53-42.78-10.26-14.64-21.35-28.92-34.06-41.53-3.84-3.81-8.05-7.42-12.62-10.31-2.78-1.76-5.85-3.06-8.92-4.22s-6.5-1.56-9.79-1.87c3.54,8.54,7.07,17.07,10.61,25.61,7.93-6.63,14.68-14.96,19.86-23.89,2.92-5.04,5.28-10.42,7.31-15.86,1.61-4.3,2.85-8.75,3.7-13.26,1.18-6.33,1.93-12.81,1.85-19.26-.05-3.88-1.64-7.85-4.39-10.61-2.6-2.6-6.87-4.56-10.61-4.39s-7.9,1.45-10.61,4.39-4.45,6.56-4.39,10.61h0Z"/>
      <path className="cls-1" d="M197.33,592.06c-14.76,3.1-28.99,8.47-42.53,15.08-12.57,6.14-24.44,13.64-35.61,22.04-12.68,9.54-24.64,19.91-35.93,31.06-10.56,10.43-20.58,21.38-30.41,32.49-5.97,6.75-11.86,13.55-17.21,20.81s-9.63,15.22-12.53,23.82c-1.2,3.56-.35,8.38,1.51,11.56s5.39,6.08,8.96,6.89c3.84.87,8.15.69,11.56-1.51s5.59-5.12,6.89-8.96c.46-1.35.96-2.69,1.51-4.01l-1.51,3.58c2.8-6.6,6.72-12.62,11.07-18.29l-2.35,3.04c4.06-5.25,8.46-10.22,12.85-15.19,4.61-5.22,9.26-10.4,13.99-15.51,9.34-10.1,18.99-19.93,29.19-29.15,5.76-5.21,11.69-10.21,17.83-14.96l-3.04,2.35c14.6-11.26,30.39-21.03,47.38-28.25l-3.58,1.51c9.66-4.08,19.66-7.3,29.92-9.45,3.55-.74,7.18-3.84,8.96-6.89,1.88-3.22,2.68-7.95,1.51-11.56s-3.42-7.13-6.89-8.96c-3.69-1.95-7.45-2.37-11.56-1.51h0Z"/>
      <path className="cls-1" d="M31.56,755.19c3.37,3.14,7.22,5.86,11.4,7.81s8.41,3.54,12.73,5.02c7.06,2.4,14.18,4.63,21.35,6.68,14.49,4.14,29.18,7.55,44.01,10.22,30.67,5.52,61.87,8.24,93.03,7.66,16.93-.32,33.84-1.59,50.62-3.81,2.07.08,3.99-.35,5.78-1.29,1.86-.6,3.47-1.64,4.83-3.1,2.6-2.6,4.56-6.87,4.39-10.61s-1.45-7.9-4.39-10.61l-3.04-2.35c-2.34-1.36-4.86-2.04-7.57-2.05-15.48,2.05-31.06,3.29-46.66,3.72-15.61.43-31.23.05-46.8-1.13-8.83-.67-17.64-1.6-26.41-2.78l3.99.54c-24.78-3.36-49.29-8.73-73.18-16.12-6.57-2.03-13.23-4.03-19.57-6.71l3.58,1.51c-2.83-1.22-5.54-2.65-8-4.52l3.04,2.35c-.66-.52-1.29-1.06-1.91-1.63-2.87-2.68-6.62-4.39-10.61-4.39-3.68,0-8.07,1.63-10.61,4.39s-4.57,6.61-4.39,10.61,1.46,7.87,4.39,10.61h0Z"/>
      <path className="cls-1" d="M243.15,514.31c-4.65,3.56-8.94,7.2-12.59,11.8s-6.95,9.23-9.65,14.41c-5.33,10.22-8.89,21.25-11.88,32.34-1.53,5.66-2.78,11.45-5.04,16.88l1.51-3.58c-.59,1.38-1.25,2.73-2,4.03-1.95,3.4-2.56,7.77-1.51,11.56.96,3.48,3.65,7.25,6.89,8.96,3.48,1.84,7.7,2.76,11.56,1.51s6.99-3.45,8.96-6.89c4.35-7.6,6.3-16.13,8.56-24.5,2.02-7.5,4.25-14.95,7.25-22.12l-1.51,3.58c2.62-6.16,5.83-12.05,9.91-17.37l-2.35,3.04c2.85-3.66,6.07-6.99,9.73-9.85l-3.04,2.35.33-.25c1.75-.94,3.15-2.23,4.21-3.86,1.33-1.45,2.22-3.15,2.68-5.1.99-3.59.54-8.37-1.51-11.56s-5.14-6.02-8.96-6.89l-3.99-.54c-2.71,0-5.23.69-7.57,2.05h0Z"/>
      <path className="cls-1" d="M43.51,235.62c3.03,1.3,5.83,2.98,8.44,4.98l-3.04-2.35c3.74,2.92,6.97,6.38,9.86,10.13l-2.35-3.04c7.73,10.13,13.43,21.89,18.37,33.59l-1.51-3.58c7.77,18.51,13.23,37.86,18.59,57.17s10.66,38.78,18.14,57.45c4.24,10.59,8.95,20.97,14.66,30.86,5.22,9.05,11.07,17.75,17.26,26.16,12.39,16.83,26.07,32.64,41.28,46.98s31.72,27.27,49.21,38.61c2.05,1.33,4.11,2.63,6.18,3.91,3.26,2.02,7.9,2.52,11.56,1.51s7.25-3.65,8.96-6.89c3.88-7.34,1.75-16.11-5.38-20.52-9.59-5.92-18.87-12.34-27.8-19.22l3.04,2.35c-17.24-13.32-33.16-28.34-47.43-44.81-4.02-4.64-7.91-9.4-11.66-14.26l2.35,3.04c-13.12-17.03-24.67-35.2-33.07-55.03l1.51,3.58c-9.73-23.13-15.84-47.52-22.65-71.61s-15.07-49.96-27.96-72.57c-3.79-6.65-8.16-13.04-13.27-18.75s-11.23-10.64-18.15-13.61c-1.72-1.1-3.58-1.69-5.58-1.78-1.99-.45-3.99-.36-5.98.27-3.48.96-7.25,3.65-8.96,6.89-1.84,3.48-2.76,7.7-1.51,11.56,1.12,3.45,3.4,7.47,6.89,8.96h0Z"/>
      <path className="cls-1" d="M62.85,232.62c10.14-.63,20.3-.16,30.36,1.18l-3.99-.54c19.33,2.62,38.09,8.33,56.26,15.29,5.26,2.02,10.49,4.14,15.68,6.33l-3.58-1.51c21.25,8.98,42.22,18.74,62.77,29.24s39.89,21.48,58.85,33.86c10.61,6.93,20.96,14.25,30.98,22l-3.04-2.35c14.99,11.61,29.25,24.19,42.4,37.86,3.79,3.94,7.68,7.89,11.03,12.2l-2.35-3.04c1.29,1.71,2.42,3.49,3.27,5.46l-1.51-3.58.2.49c.46,1.95,1.36,3.65,2.68,5.1,1.06,1.63,2.46,2.92,4.21,3.86,3.22,1.88,7.95,2.68,11.56,1.51s7.13-3.42,8.96-6.89,2.97-7.88,1.51-11.56c-.93-2.34-1.85-4.74-3.16-6.91s-3.04-4.27-4.66-6.3c-1.83-2.29-3.84-4.43-5.83-6.57-3.82-4.13-7.75-8.17-11.76-12.12-8.2-8.06-16.78-15.73-25.67-23.02-18.61-15.28-38.36-29.14-58.93-41.65s-40.04-22.76-60.76-32.79c-22.72-10.99-45.83-21.57-69.53-30.31-24.52-9.04-50.48-15.52-76.76-15.55-3.07,0-6.15.1-9.22.29-3.99.25-7.72,1.51-10.61,4.39-2.6,2.6-4.56,6.87-4.39,10.61s1.45,7.9,4.39,10.61,6.64,4.64,10.61,4.39h0Z"/>
      <path className="cls-1" d="M369.72,371.65c-2.53,1.02-5.11,2.02-7.45,3.44s-4.44,3.11-6.5,4.85c-3.27,2.76-5.92,6.24-8.39,9.69-4.4,6.13-7.32,13.27-10.05,20.25-1.41,3.61-2.76,7.24-4.26,10.82l1.51-3.58c-2.12,5.01-4.56,9.92-7.89,14.24l2.35-3.04c-1.76,2.24-3.74,4.26-5.98,6.02l3.04-2.35c-2.17,1.66-4.51,3.05-6.86,4.44-3.34,1.98-6.42,4.12-9.47,6.55-4.58,3.64-8.39,8.43-11.37,13.44-6.56,11.01-9.08,23.79-9.63,36.45-.29,6.65.04,13.32.37,19.96.2,3.96,1.54,7.75,4.39,10.61,2.6,2.6,6.87,4.56,10.61,4.39s7.9-1.45,10.61-4.39,4.59-6.62,4.39-10.61c-.46-9.28-.9-18.6.3-27.84l-.54,3.99c.71-5.22,1.96-10.33,3.99-15.21l-1.51,3.58c1.49-3.5,3.35-6.81,5.65-9.84l-2.35,3.04c1.84-2.37,3.93-4.5,6.29-6.36l-3.04,2.35c3.21-2.47,6.81-4.32,10.21-6.5,4.11-2.63,8.11-5.71,11.26-9.47s5.75-7.4,7.93-11.56,4.02-8.67,5.79-13.09c1.51-3.77,2.89-7.59,4.46-11.33l-1.51,3.58c2.17-5.13,4.7-10.14,8.09-14.58l-2.35,3.04c1.84-2.37,3.91-4.54,6.29-6.38l-3.04,2.35c1.72-1.3,3.57-2.39,5.54-3.26l-3.58,1.51c.22-.1.45-.19.67-.28,1.95-.46,3.65-1.36,5.1-2.68,1.63-1.06,2.92-2.46,3.86-4.21,1.88-3.22,2.68-7.95,1.51-11.56s-3.42-7.13-6.89-8.96-7.9-2.99-11.56-1.51h0Z"/>
      <path className="cls-1" d="M261.64,542.72c3.35-2.07,6.84-3.88,10.46-5.42l-3.58,1.51c6.48-2.73,13.29-4.57,20.26-5.52l-3.99.54c6.83-.89,13.74-.91,20.57,0l-3.99-.54c5.08.7,9.99,2.05,14.94,3.35,6.32,1.66,12.85,2.76,19.4,2.71,5.29-.03,10.58-.57,15.84-1.05,6.28-.57,12.57-1.29,18.77-2.46,6.78-1.28,13.12-3.5,19.42-6.32,1.75-.94,3.15-2.23,4.21-3.86,1.33-1.45,2.22-3.15,2.68-5.1.99-3.59.54-8.37-1.51-11.56s-5.14-6.02-8.96-6.89l-3.99-.54c-2.71,0-5.23.69-7.57,2.05-.41.18-.82.37-1.23.54l3.58-1.51c-6.65,2.79-13.71,4.3-20.83,5.26l3.99-.54c-5.02.66-10.07,1.07-15.12,1.48-5.43.43-10.88.79-16.3.09l3.99.54c-5.6-.79-10.96-2.6-16.46-3.87-6.01-1.39-12.24-2.21-18.4-2.42s-12.34.45-18.47,1.39c-4.93.75-9.78,1.96-14.48,3.63-6.36,2.26-12.61,5.06-18.35,8.62-3.26,2.02-5.87,5.23-6.89,8.96s-.54,8.37,1.51,11.56,5.14,6.02,8.96,6.89,8.09.64,11.56-1.51h0Z"/>
      <path className="cls-1" d="M391.06,389c.23-.14.47-.26.72-.36l-3.58,1.51c.39-.13.75-.21,1.17-.26l-3.99.54c.55-.04,1.08-.02,1.64.04l-3.99-.54c1.76.26,3.45.84,5.09,1.51l-3.58-1.51c6.51,2.75,12.79,6.18,19.14,9.3,5.54,2.72,11.47,5.16,16.43,8.91l-3.04-2.35c1.42,1.11,2.71,2.33,3.85,3.73l-2.35-3.04c.47.61.91,1.24,1.31,1.9,1.97,3.26,5.27,5.88,8.96,6.89s8.37.54,11.56-1.51,6.02-5.14,6.89-8.96.61-8.05-1.51-11.56c-4.88-8.07-12.68-12.9-20.91-16.95-7.76-3.82-15.47-7.78-23.31-11.44-2.99-1.4-6.09-2.89-9.33-3.63-5.62-1.3-11.18-1-16.29,1.87-3.25,1.83-5.91,5.39-6.89,8.96s-.54,8.37,1.51,11.56,5.14,6.02,8.96,6.89,7.95.52,11.56-1.51h0Z"/>
      <path className="cls-1" d="M419.21,402.81c.23,10.47,1,20.92,2.28,31.32-.08,2.07.35,3.99,1.29,5.78.6,1.86,1.64,3.47,3.1,4.83,2.6,2.6,6.87,4.56,10.61,4.39s7.9-1.45,10.61-4.39c2.5-2.72,4.87-6.76,4.39-10.61-1.29-10.39-2.05-20.85-2.28-31.32-.09-3.9-1.61-7.83-4.39-10.61-2.6-2.6-6.87-4.56-10.61-4.39s-7.9,1.45-10.61,4.39-4.48,6.58-4.39,10.61h0Z"/>
      <path className="cls-1" d="M423.7,432.18l-.23.32,2.35-3.04c-.49.62-1.04,1.15-1.67,1.64l3.04-2.35c-1.78,1.32-3.79,2.33-5.7,3.43-2.02,1.15-4.03,2.31-6.05,3.46-4.1,2.35-8.21,4.69-12.31,7.04-7.89,4.51-15.78,8.91-24.17,12.46l3.58-1.51c-3.94,1.65-8.02,3.42-12.15,4.52l3.99-.54-.3.03,3.99.54-.27-.06,6.62,3.86-.2-.18,3.86,6.62-.03-.16-1.51,11.56.08-.13-5.38,5.38.15-.09-3.58,1.51.16-.03h-7.98l.11.04-11.01-14.46.02.14c-.08,2.07.35,3.99,1.29,5.78.6,1.86,1.64,3.47,3.1,4.83,2.6,2.6,6.87,4.56,10.61,4.39s7.9-1.45,10.61-4.39c2.5-2.72,4.87-6.76,4.39-10.61l-.02-.14-.54-3.99c-.46-1.95-1.36-3.65-2.68-5.1-.67-1.13-1.56-2.02-2.69-2.69-1.45-1.33-3.15-2.22-5.1-2.68-.49-.18-3.54-.55-4.1-.58,2.79.13-2.94.23-4.14.57-3.82,1.07-7.14,3.62-9.15,7.05s-2.59,7.87-1.54,11.71,3.74,7.05,7.11,9.22c3.96,2.56,9.22,2.55,13.54,1.09,1.26-.43,2.51-.87,3.76-1.32,6.06-2.22,12.03-4.74,17.84-7.53,9.95-4.79,19.42-10.62,29-16.1,2.74-1.56,5.47-3.13,8.21-4.69,1.16-.67,2.34-1.31,3.44-2.08,3.49-2.45,5.14-4.1,7.59-7.58,1.1-1.72,1.69-3.58,1.78-5.58.45-1.99.36-3.99-.27-5.98-.96-3.48-3.65-7.25-6.89-8.96-3.48-1.84-7.7-2.76-11.56-1.51l-3.58,1.51c-2.25,1.33-4.05,3.13-5.38,5.38h0Z"/>
      <path className="cls-1" d="M360.79,484.58c2.84,3.76,5.19,7.84,7.03,12.17l-1.51-3.58c1.92,4.61,3.23,9.43,3.91,14.38l-.54-3.99c.24,1.84.39,3.68.46,5.53.14,3.93,1.58,7.79,4.39,10.61,2.6,2.6,6.87,4.56,10.61,4.39s7.9-1.45,10.61-4.39,4.54-6.6,4.39-10.61c-.25-7.04-1.38-14.25-3.75-20.91s-5.42-13.09-9.69-18.74c-.94-1.75-2.23-3.15-3.86-4.21-1.45-1.33-3.15-2.22-5.1-2.68-3.59-.99-8.37-.54-11.56,1.51s-6.02,5.14-6.89,8.96-.86,8.41,1.51,11.56h0Z"/>
      <path className="cls-1" d="M379.16,527.13c.77.76,1.49,1.56,2.16,2.41l-2.35-3.04c1.32,1.72,2.4,3.58,3.25,5.57l-1.51-3.58c.82,2.01,1.38,4.08,1.68,6.23l-.54-3.99c.26,2.19.23,4.37-.06,6.55l.54-3.99c-.39,2.6-1.13,5.11-2.14,7.54l1.51-3.58c-1.5,3.48-3.49,6.7-5.79,9.7l2.35-3.04c-6.85,8.79-15.94,15.48-23.01,24.08-3.76,4.57-7.3,9.34-10.33,14.43s-5.36,10.3-7.6,15.69c-4.14,9.94-6.34,20.24-7.66,30.9s-.72,21.22.91,31.81c.8,5.19,2.02,10.32,3.66,15.31,1.21,3.68,2.7,7.23,4.23,10.79,1.12,2.61,2.47,5.11,3.63,7.7l-1.51-3.58c.4.94.71,1.87.89,2.88l-.54-3.99c.07.57.09,1.11.05,1.69l.54-3.99c-.1.7-.29,1.34-.56,2l1.51-3.58c-1.36,2.83-3.61,5.34-5.52,7.81l2.35-3.04c-9.75,12.62-20.66,24.67-28.17,38.84-2.49,4.71-4.63,9.66-6.36,14.69-1.22,3.54-.33,8.4,1.51,11.56s5.39,6.08,8.96,6.89c3.84.87,8.15.69,11.56-1.51s5.57-5.12,6.89-8.96c.54-1.56,1.13-3.1,1.76-4.63l-1.51,3.58c4.1-9.65,10.12-18.28,16.5-26.55l-2.35,3.04c5.59-7.23,11.41-14.27,16.9-21.58,1.21-1.61,2.48-3.19,3.37-5,1.61-3.25,2.43-5.9,2.61-9.57.11-2.17-.23-4.41-.75-6.51-1.18-4.76-4.09-9.16-6-13.67l1.51,3.58c-3.22-7.68-5.36-15.75-6.49-23.99l.54,3.99c-1.19-8.99-1.17-18.11.03-27.1l-.54,3.99c1.22-8.99,3.61-17.79,7.13-26.16l-1.51,3.58c3.21-7.54,7.32-14.67,12.33-21.16l-2.35,3.04c6.58-8.46,15.04-15.05,22.1-23.06,4.19-4.76,8.11-9.93,10.65-15.77,1.52-3.5,2.98-6.93,3.59-10.71.39-2.39.77-4.84.84-7.27.07-2.58-.35-5.12-.72-7.66-1.13-7.78-5.39-15.34-10.95-20.83-2.75-2.71-6.74-4.39-10.61-4.39s-8.07,1.63-10.61,4.39-4.57,6.61-4.39,10.61,1.51,7.76,4.39,10.61h0Z"/>
      <path className="cls-1" d="M352.77,714.35c7.83,8.88,16.15,17.37,25.25,24.96,9.94,8.29,20.58,15.88,32.28,21.47,6.42,3.07,13.07,5.78,19.9,7.79s13.95,3.21,21.08,3.99c13.24,1.45,26.98-.1,39.59-4.36,7.01-2.37,13.86-5.26,20.74-7.98s14.41-5.69,21.61-8.54c1.95-.46,3.65-1.36,5.1-2.68,1.63-1.06,2.92-2.46,3.86-4.21,1.88-3.22,2.68-7.95,1.51-11.56s-3.42-7.13-6.89-8.96-7.88-2.97-11.56-1.51c-9.81,3.88-19.62,7.75-29.43,11.63-9.2,3.63-18.35,7.2-28.21,8.54l3.99-.54c-7.47.98-15.02.89-22.48-.09l3.99.54c-9.11-1.23-17.99-3.76-26.47-7.32l3.58,1.51c-10.41-4.42-20.08-10.38-29.04-17.27l3.04,2.35c-11.07-8.56-21-18.48-30.25-28.97-2.45-2.78-7.01-4.39-10.61-4.39s-8.07,1.63-10.61,4.39-4.57,6.61-4.39,10.61l.54,3.99c.71,2.54,2,4.75,3.86,6.62h0Z"/>
      <path className="cls-1" d="M529.75,745.93c4.92,3.3,10.25,5.72,15.75,7.9,4.39,1.73,8.96,3,13.6,3.82,5.79,1.02,11.68,1.7,17.56,1.69,6.04-.01,12.1-.74,18.04-1.78,10.4-1.82,20.48-5.72,29.76-10.7,9.22-4.95,17.76-11.39,25.42-18.49,8.66-8.03,16.19-17.34,22.79-27.11,2.09-3.1,2.48-8.05,1.51-11.56s-3.65-7.25-6.89-8.96c-3.48-1.84-7.7-2.76-11.56-1.51l-3.58,1.51c-2.25,1.33-4.05,3.13-5.38,5.38-1.79,2.65-3.66,5.25-5.62,7.79l2.35-3.04c-6.62,8.55-14.19,16.36-22.73,23l3.04-2.35c-6.94,5.35-14.47,9.88-22.55,13.29l3.58-1.51c-6.83,2.85-13.96,4.82-21.29,5.83l3.99-.54c-7.06.94-14.2,1-21.27.08l3.99.54c-6.2-.84-12.27-2.42-18.05-4.83l3.58,1.51c-3.81-1.61-7.44-3.56-10.88-5.86-3.12-2.09-8.03-2.48-11.56-1.51-3.48.96-7.25,3.65-8.96,6.89-1.84,3.48-2.76,7.7-1.51,11.56s3.52,6.7,6.89,8.96h0Z"/>
      <path className="cls-1" d="M654.87,706.42c6.89,3.45,13.58,7.44,19.71,12.13l-3.04-2.35c2.3,1.79,4.45,3.73,6.25,6.03l-2.35-3.04c1.12,1.47,2.08,3.05,3.05,4.61,1.54,2.49,3.25,4.77,5.09,7.06,2.19,2.73,5.27,4.56,7.42,7.33l-2.35-3.04c.66.92,1.19,1.88,1.64,2.92l-1.51-3.58c1.13,2.75,1.64,5.69,2.57,8.5.8,2.43,1.72,4.9,3.05,7.09.95,1.56,2.15,3.05,3.35,4.42s2.95,2.5,4.44,3.64c1.72,1.1,3.58,1.69,5.58,1.78,1.99.45,3.99.36,5.98-.27,3.48-.96,7.25-3.65,8.96-6.89,1.84-3.48,2.76-7.7,1.51-11.56l-1.51-3.58c-1.33-2.25-3.13-4.05-5.38-5.38l-.26-.2,3.04,2.35c-.57-.48-1.07-1-1.54-1.58l2.35,3.04c-.63-.85-1.12-1.76-1.54-2.73l1.51,3.58c-.74-1.79-1.21-3.67-1.7-5.54-.82-3.1-1.93-6.06-3.33-8.97-.92-1.92-2.33-3.55-3.65-5.21-.76-.96-1.6-1.82-2.51-2.64-1.86-1.67-3.76-3.2-5.3-5.19l2.35,3.04c-1.02-1.36-1.91-2.81-2.81-4.25-1.51-2.44-3.15-4.67-4.95-6.92-2.85-3.58-6.5-6.32-10.16-9.03-5.9-4.39-12.27-8.18-18.83-11.47-3.62-1.81-7.56-2.61-11.56-1.51-3.48.96-7.25,3.65-8.96,6.89-1.84,3.48-2.76,7.7-1.51,11.56,1.16,3.58,3.41,7.22,6.89,8.96h0Z"/>
      <path className="cls-1" d="M437.84,890.03c11.09,3.63,22.48,5.78,34.06,7.08,10.3,1.15,20.71,1.24,31.03.26,11.61-1.11,23.07-3.21,34.24-6.6,11.06-3.36,21.78-7.78,32.32-12.49,9.54-4.27,18.91-8.91,28.26-13.57s17.84-8.95,26.66-13.63c17.66-9.36,35-19.41,51.37-30.9,9.1-6.39,17.95-13.18,26.38-20.43,3.58-3.08,7.18-6.2,10.42-9.63,2.38-2.51,4.54-5.25,6.53-8.07,1.63-2.31,2.78-4.75,3.88-7.35.64-1.52,1.28-3,1.7-4.59.58-2.24.81-4.65,1.07-6.92.41-3.56-1.97-8.18-4.39-10.61-2.6-2.6-6.87-4.56-10.61-4.39s-7.9,1.45-10.61,4.39l-2.35,3.04c-1.36,2.34-2.04,4.86-2.05,7.57l-.05.43.54-3.99c-.25,1.83-.74,3.59-1.42,5.3l1.51-3.58c-1.06,2.51-2.5,4.8-4.16,6.95l2.35-3.04c-3.38,4.3-7.49,7.96-11.6,11.55-4.36,3.82-8.85,7.5-13.43,11.05l3.04-2.35c-14.55,11.23-30.08,21.12-46.04,30.21-16.03,9.13-32.5,17.46-49.04,25.63-9.74,4.82-19.53,9.57-29.54,13.81l3.58-1.51c-15.05,6.34-30.63,11.39-46.86,13.59l3.99-.54c-13.33,1.76-26.84,1.74-40.16-.03l3.99.54c-9.04-1.24-17.95-3.27-26.62-6.11-3.59-1.18-8.35-.36-11.56,1.51s-6.08,5.39-6.89,8.96c-.87,3.84-.69,8.15,1.51,11.56s5.11,5.63,8.96,6.89h0Z"/>
      <path className="cls-1" d="M559.88,879.98c7.29,15.68,16.01,30.68,26.05,44.75,10.4,14.58,21.95,28.34,34.76,40.85,12.3,12,25.7,22.89,39.75,32.78,13.09,9.22,26.89,17.43,41.2,24.62,15.4,7.74,31.4,14.43,47.72,19.99,1.89.64,3.78,1.27,5.68,1.88,3.61,1.16,8.34.37,11.56-1.51s6.08-5.39,6.89-8.96c.87-3.84.69-8.15-1.51-11.56s-5.11-5.65-8.96-6.89c-9.82-3.17-19.5-6.75-29.01-10.76l3.58,1.51c-20.27-8.56-39.75-19.02-57.94-31.41-5.11-3.48-10.11-7.1-15-10.88l3.04,2.35c-14.86-11.49-28.66-24.33-41.02-38.47-3.74-4.28-7.35-8.68-10.83-13.18l2.35,3.04c-9.92-12.87-18.74-26.59-26.3-40.98-2.13-4.05-4.16-8.16-6.09-12.32-1.5-3.22-5.67-5.98-8.96-6.89-3.59-.99-8.37-.54-11.56,1.51s-6.02,5.14-6.89,8.96l-.54,3.99c0,2.71.69,5.23,2.05,7.57h0Z"/>
      <path className="cls-1" d="M645.49,849.89c6.9-.88,13.88-.83,20.77.06l-3.99-.54c7.42,1,14.66,2.97,21.57,5.85l-3.58-1.51c6.65,2.81,12.92,6.43,18.64,10.83l-3.04-2.35c5.55,4.31,10.45,9.32,14.76,14.86l-2.35-3.04c8.28,10.73,14.35,22.99,19.61,35.43l-1.51-3.58c6.92,16.44,12.14,33.58,15.54,51.08.97,4.99,1.79,10.01,2.47,15.05l-.54-3.99c2.21,16.55,2.83,33.29,1.81,49.96-.23,3.7,1.83,8.05,4.39,10.61s6.87,4.56,10.61,4.39,7.9-1.45,10.61-4.39l2.35-3.04c1.36-2.34,2.04-4.86,2.05-7.57,1.11-18.23.06-36.33-2.41-54.4-2.31-16.92-6.27-33.6-11.84-49.74-3.15-9.11-6.81-18.06-10.83-26.81-3.42-7.44-7.2-14.73-11.71-21.57-5-7.59-10.76-14.9-17.57-20.96-6.32-5.62-13.33-10.62-20.91-14.39s-15.65-6.86-23.96-8.6-16.97-2.66-25.48-2.17c-1.83.11-3.66.28-5.48.51-2.07-.08-3.99.35-5.78,1.29-1.86.6-3.47,1.64-4.83,3.1-2.6,2.6-4.56,6.87-4.39,10.61s1.45,7.9,4.39,10.61l3.04,2.35c2.34,1.36,4.86,2.04,7.57,2.05h0Z"/>
      <path className="cls-1" d="M683.66,815.01c16.08,13.35,33.21,25.54,51.76,35.23,18.92,9.88,39.22,17.57,60.26,21.4,22.92,4.17,46.15,4.45,68.99-.41,10.44-2.22,20.58-5.65,30.49-9.59,10.6-4.22,21.14-8.76,31.34-13.9,9.12-4.59,17.98-9.77,26.14-15.94s16.03-13.42,24.03-20.21c1.78-1.51,3.58-2.98,5.42-4.42l-3.04,2.35c5.19-4.01,10.68-7.59,16.71-10.19,3.21-1.39,6.01-5.76,6.89-8.96.99-3.59.54-8.37-1.51-11.56-2.06-3.2-5.14-6.02-8.96-6.89l-3.99-.54c-2.71,0-5.23.69-7.57,2.05-17.42,7.52-30.18,22.4-44.9,33.85l3.04-2.35c-14.75,11.37-31.68,19.45-48.76,26.66l3.58-1.51c-15.39,6.47-31.2,11.86-47.8,14.09l3.99-.54c-13.96,1.83-28.11,1.65-42.06-.2l3.99.54c-16.61-2.26-32.79-6.89-48.24-13.38l3.58,1.51c-20.22-8.56-39.01-20.17-56.37-33.57l3.04,2.35c-2.98-2.31-5.92-4.67-8.83-7.08-3.14-2.6-6.39-4.39-10.61-4.39-3.68,0-8.07,1.63-10.61,4.39s-4.57,6.61-4.39,10.61c.17,3.76,1.38,8.1,4.39,10.61h0Z"/>
      <path className="cls-1" d="M713.62,762.13c3.83,1.23,7.88,1.01,11.76.18,2.66-.57,5.25-1.87,7.7-2.92,2.63-1.14,5.23-2.36,7.77-3.69,5.2-2.72,10.2-5.84,14.93-9.32,5.65-4.16,11.11-8.58,16.09-13.53s9.56-10.47,13.7-16.21c2.75-3.81,4.79-7.95,6.35-12.4,1.1-3.14,1.69-6.43,2.93-9.53l-1.51,3.58c.57-1.33,1.24-2.58,2.13-3.73,1.1-1.72,1.69-3.58,1.78-5.58.45-1.99.36-3.99-.27-5.98-.96-3.48-3.65-7.25-6.89-8.96-3.48-1.84-7.7-2.76-11.56-1.51l-3.58,1.51c-2.25,1.33-4.05,3.13-5.38,5.38-.8,1.05-1.44,2.17-1.97,3.37-1.04,2.33-2.04,4.67-2.75,7.12-.78,2.65-1.39,5.35-2.44,7.91l1.51-3.58c-1.47,3.41-3.57,6.45-5.83,9.38l2.35-3.04c-5.96,7.66-12.86,14.54-20.53,20.5l3.04-2.35c-7.79,6.01-16.31,11.03-25.36,14.9l3.58-1.51c-1.36.57-2.72,1.07-4.17,1.33l3.99-.54c-.72.09-1.4.12-2.12.05l3.99.54c-.43-.07-.82-.17-1.24-.3-3.61-1.16-8.34-.37-11.56,1.51s-6.08,5.39-6.89,8.96c-.87,3.84-.69,8.15,1.51,11.56s5.11,5.66,8.96,6.89h0Z"/>
      <path className="cls-1" d="M786.54,698.58c6.26.26,12.5.84,18.71,1.67l-3.99-.54c20.41,2.78,40.59,8,60.28,13.98,5.56,1.69,11.06,3.57,16.42,5.82l-3.58-1.51c9.69,4.12,18.79,9.44,27.82,14.82s18.66,11.11,27.98,16.67c4.77,2.85,9.52,5.76,13.93,9.15l-3.04-2.35c5.27,4.1,9.53,9,13.59,14.26l-2.35-3.04c6.62,8.58,12.99,17.28,22.62,22.76,3.41,1.94,7.76,2.56,11.56,1.51,3.48-.96,7.25-3.65,8.96-6.89,1.84-3.48,2.76-7.7,1.51-11.56s-3.44-7-6.89-8.96c-1.31-.75-2.57-1.58-3.77-2.49l3.04,2.35c-4.52-3.5-8.11-7.95-11.59-12.44l2.35,3.04c-4.08-5.28-8-10.83-12.84-15.47-5.23-5.01-11.28-9.23-17.43-13.03-11.66-7.21-23.53-14.11-35.33-21.09-12.55-7.43-25.42-14.03-39.29-18.66-12.9-4.3-26.18-7.75-39.42-10.82-16.15-3.74-32.67-6.49-49.25-7.18-3.74-.16-8,1.78-10.61,4.39s-4.56,6.87-4.39,10.61,1.45,7.9,4.39,10.61,6.49,4.22,10.61,4.39h0Z"/>
      <path className="cls-1" d="M628.25,544.81c1.86,1.8,3.57,3.73,5.15,5.77l-2.35-3.04c3.65,4.78,6.51,10.07,8.85,15.59l-1.51-3.58c5.74,13.72,8.88,28.67,10.87,43.36l-.54-3.99c2.59,19.42,2.59,39.14.02,58.56l.54-3.99c-1.84,13.65-4.93,27.11-9.29,40.17-1.19,3.57-.35,8.37,1.51,11.56s5.39,6.08,8.96,6.89c3.84.87,8.15.69,11.56-1.51s5.61-5.12,6.89-8.96c3.68-11.03,6.48-22.34,8.35-33.82,2.04-12.5,3.31-25.12,3.41-37.79s-1.03-25.44-2.91-38.06c-1.64-11.04-4.02-22.07-7.55-32.67-4.38-13.16-10.69-25.94-20.75-35.72-2.79-2.7-6.7-4.39-10.61-4.39-3.68,0-8.07,1.63-10.61,4.39s-4.57,6.61-4.39,10.61,1.5,7.79,4.39,10.61h0Z"/>
      <path className="cls-1" d="M391.85,543.74c3.66,7.78,8.58,14.84,14.14,21.38,5.73,6.74,12.6,12.35,19.82,17.41,6.59,4.62,13.6,8.58,20.56,12.59s14.59,8.37,22.08,12.2c9.23,4.72,18.83,8.51,28.38,12.53l-3.58-1.51c5.88,2.48,11.65,5.27,16.73,9.17l-3.04-2.35c3.47,2.71,6.54,5.85,9.24,9.32l-2.35-3.04c3.32,4.34,6.01,9.11,8.15,14.14l-1.51-3.58c2.84,6.79,4.63,13.92,5.62,21.2l-.54-3.99c1.17,9.02,1.18,18.13.65,27.2-.52,9.06-1.34,18.15-2.53,27.14l.54-3.99c-.62,4.59-1.45,9.15-2.72,13.61-1.06,3.72-.44,8.23,1.51,11.56,1.82,3.11,5.39,6.08,8.96,6.89,3.84.87,8.15.69,11.56-1.51s5.8-5.12,6.89-8.96c1.81-6.37,2.7-12.94,3.5-19.51.66-5.42,1.16-10.86,1.63-16.3.94-10.89,1.48-21.88.39-32.78-.61-6.08-1.46-12.2-3.02-18.12-1.43-5.44-3.5-10.68-5.83-15.79-1.8-3.96-3.98-7.75-6.55-11.26-3.28-4.48-6.76-8.78-11.03-12.34-5.1-4.25-10.48-7.77-16.49-10.57s-12.56-5.27-18.84-7.92l3.58,1.51c-8.53-3.62-16.77-7.88-24.87-12.38s-15.86-8.89-23.6-13.63c-4.24-2.6-8.4-5.34-12.35-8.37l3.04,2.35c-5.67-4.39-10.76-9.41-15.16-15.07l2.35,3.04c-3.68-4.79-6.83-9.94-9.41-15.41-1.52-3.23-5.65-5.98-8.96-6.89-3.59-.99-8.37-.54-11.56,1.51s-6.02,5.14-6.89,8.96l-.54,3.99c0,2.71.69,5.23,2.05,7.57h0Z"/>
      <path className="cls-1" d="M617.74,530.63c-1.62,3.06-3.5,5.96-5.61,8.69l2.35-3.04c-3.16,4.04-6.8,7.66-10.84,10.82l3.04-2.35c-4.17,3.21-8.7,5.87-13.54,7.92l3.58-1.51c-6.55,2.72-13.51,4.02-20.33,5.86s-13.65,4.53-19.87,8.03c-12.02,6.75-22.16,16.63-29.69,28.14-4.19,6.4-7.4,13.6-9.63,20.91-1.11,3.67-.4,8.28,1.51,11.56s5.39,6.08,8.96,6.89c3.84.87,8.15.69,11.56-1.51s5.72-5.12,6.89-8.96c.68-2.24,1.48-4.44,2.38-6.6l-1.51,3.58c2.32-5.45,5.34-10.55,8.95-15.24l-2.35,3.04c3.71-4.77,8.01-9.05,12.79-12.75l-3.04,2.35c4.6-3.52,9.6-6.47,14.93-8.75l-3.58,1.51c9.62-4.05,20.17-5.07,29.81-9.04,5.32-2.2,10.43-4.58,15.14-7.91s9.11-6.89,12.95-11.09c4.24-4.65,8.09-9.83,11.05-15.4,1.87-3.53,2.59-7.65,1.51-11.56-.96-3.48-3.65-7.25-6.89-8.96-3.48-1.84-7.7-2.76-11.56-1.51-3.63,1.18-7.12,3.42-8.96,6.89h0Z"/>
      <path className="cls-1" d="M791.33,687.93c2.83-8.44,5.97-16.78,9.43-24.98l-1.51,3.58c3.8-8.99,7.97-17.83,12.51-26.47,2.21-4.2,4.6-8.3,6.78-12.5,2.65-5.09,5.19-10.57,6.03-16.29.63-1.99.71-3.99.27-5.98-.09-2-.68-3.86-1.78-5.58-1.82-3.11-5.39-6.08-8.96-6.89-3.84-.87-8.15-.69-11.56,1.51l-3.04,2.35c-1.86,1.87-3.14,4.08-3.86,6.62-.41,2.79-1.24,5.46-2.32,8.07l1.51-3.58c-1.88,4.44-4.37,8.58-6.67,12.81s-4.61,8.69-6.77,13.11c-4.86,9.93-9.26,20.1-13.27,30.4-2.04,5.24-3.95,10.53-5.73,15.86-1.2,3.57-.35,8.38,1.51,11.56s5.39,6.08,8.96,6.89c3.84.87,8.15.69,11.56-1.51s5.6-5.12,6.89-8.96h0Z"/>
      <path className="cls-1" d="M735.36,523.27l.4.05-3.99-.54c3.7.51,7.29,1.54,10.73,2.99l-3.58-1.51c4.07,1.75,7.86,4.05,11.38,6.74l-3.04-2.35c4.87,3.77,9.09,8.22,12.86,13.08l-2.35-3.04c5.67,7.39,10.24,15.52,14.69,23.67,4.89,8.97,9.77,17.94,14.66,26.91,2.82,5.18,5.64,10.35,8.46,15.53,1.77,3.25,5.44,5.92,8.96,6.89s8.37.54,11.56-1.51,6.02-5.14,6.89-8.96.48-7.91-1.51-11.56c-8.27-15.19-16.47-30.43-24.83-45.57-3.77-6.83-7.71-13.6-12.43-19.83-2.94-3.89-5.94-7.74-9.38-11.21s-7.04-6.3-10.86-9.05c-4.21-3.04-8.73-5.17-13.51-7.17s-9.84-2.9-15.12-3.58c-2.07-.08-3.99.35-5.78,1.29-1.86.6-3.47,1.64-4.83,3.1-2.6,2.6-4.56,6.87-4.39,10.61s1.45,7.9,4.39,10.61l3.04,2.35c2.34,1.36,4.86,2.04,7.57,2.05h0Z"/>
      <path className="cls-1" d="M628.37,518.73c-1.19,4.44-.69,9.4,1.78,13.35,1.95,3.11,5.28,6.05,8.96,6.89s8.23.74,11.56-1.51c1.83-1.24,3.77-2.26,5.8-3.14l-3.58,1.51c6.31-2.64,13.15-4,19.9-4.92l-3.99.54c19.42-2.59,39.15-1.35,58.37-5.68,3.57-.81,7.15-3.79,8.96-6.89s2.68-7.95,1.51-11.56-3.42-7.13-6.89-8.96c-3.67-1.94-7.48-2.43-11.56-1.51-3.19.72-6.4,1.27-9.64,1.71l3.99-.54c-20.15,2.66-40.77,1.11-60.6,6.25-6.04,1.56-12.23,3.78-17.41,7.29l20.52,5.38-.2-.32,1.51,3.58c-.11-.23-.17-.47-.19-.73l.54,3.99.02-.38-.54,3.99.1-.36c1.01-3.77.47-8.18-1.51-11.56-1.82-3.11-5.39-6.08-8.96-6.89-3.84-.87-8.15-.69-11.56,1.51s-5.86,5.12-6.89,8.96h0Z"/>
      <path className="cls-1" d="M762.68,518.67c22.91,2.42,45.82,4.76,68.72,7.28,6.29.69,12.58,1.43,18.85,2.27l-3.99-.54c19.29,2.59,38.47,6.24,56.91,12.58,4.86,1.67,9.66,3.51,14.4,5.5l-3.58-1.51c14.14,5.97,27.68,13.33,40.35,22,3.58,2.45,7.1,5.01,10.54,7.66l-3.04-2.35c.92.71,1.83,1.42,2.73,2.14,1.36,1.46,2.97,2.5,4.83,3.1,1.79.94,3.71,1.37,5.78,1.29,3.68,0,8.07-1.63,10.61-4.39s4.57-6.61,4.39-10.61c-.17-3.71-1.35-8.19-4.39-10.61-11.67-9.29-23.92-17.71-37.07-24.79s-26.92-12.94-41.07-17.54c-29.68-9.65-61.02-12.62-91.9-15.88-17.69-1.87-35.38-3.74-53.07-5.6-2.07-.08-3.99.35-5.78,1.29-1.86.6-3.47,1.64-4.83,3.1-2.6,2.6-4.56,6.87-4.39,10.61s1.45,7.9,4.39,10.61l3.04,2.35c2.34,1.36,4.86,2.04,7.57,2.05h0Z"/>
      <path className="cls-1" d="M966.2,564.5c-1.28,5.19-2.99,10.26-5.06,15.18l1.51-3.58c-3.93,9.23-9.12,17.86-15.23,25.81l2.35-3.04c-7.69,9.95-16.76,18.7-26.68,26.41l3.04-2.35c-13.26,10.24-27.89,18.57-43,25.75-4.51,2.14-9.07,4.19-13.68,6.13l3.58-1.51c-15.41,6.49-31.34,11.8-47.7,15.34-4.69,1.01-9.41,1.88-14.16,2.59-1.95.46-3.65,1.36-5.1,2.68-1.63,1.06-2.92,2.46-3.86,4.21-1.88,3.22-2.68,7.95-1.51,11.56s3.42,7.13,6.89,8.96l3.58,1.51c2.66.71,5.32.71,7.98,0,14.7-2.21,29.14-5.92,43.19-10.76,14.92-5.15,29.54-11.42,43.61-18.58,13.58-6.91,26.33-14.98,38.36-24.32,5.34-4.15,10.46-8.59,15.24-13.39,5.48-5.5,10.4-11.48,15.04-17.7s8.35-12.27,11.6-18.93c3.74-7.67,6.9-15.7,8.95-23.99.95-3.84.5-8.11-1.51-11.56-1.82-3.11-5.39-6.08-8.96-6.89-3.84-.87-8.15-.69-11.56,1.51s-5.95,5.13-6.89,8.96h0Z"/>
      <path className="cls-1" d="M504.53,599.33c7.06-12.1,5.61-26.82-.71-38.86-1.59-3.03-3.74-5.72-5.86-8.38-1.47-1.84-3.07-3.55-4.78-5.16-4.22-3.97-8.95-7.43-13.7-10.73-4.41-3.07-8.93-5.99-13.2-9.27l3.04,2.35c-3.84-2.97-7.45-6.24-10.45-10.07l2.35,3.04c-2.02-2.64-3.68-5.48-4.98-8.54l1.51,3.58c-1.57-3.81-2.56-7.81-3.12-11.89l.54,3.99c-.91-7.09-.55-14.25.39-21.31l-.54,3.99c.96-7.07,2.57-14.07,5.33-20.66l-1.51,3.58c1.61-3.78,3.59-7.39,6.1-10.65l-2.35,3.04c1.77-2.26,3.77-4.3,6.03-6.06l-3.04,2.35c2.02-1.54,4.19-2.83,6.53-3.83l-3.58,1.51c1.39-.56,2.79-.98,4.28-1.19l-3.99.54c1.04-.11,2.03-.1,3.07.04l-3.99-.54c3.84.62,7.29,2.62,11.12,3.3,2.78.49,5.68.93,8.52.91s5.84-.49,8.7-.93c6.94-1.09,13.43-3.97,20.03-6.23,3.74-1.28,7.54-2.39,11.47-2.92l-3.99.54c2.72-.34,5.43-.37,8.15-.01l-3.99-.54c4.6.67,8.96,2.27,13.32,3.81,5.61,1.98,11.04,3.3,17,3.87s12.44-.39,18.5-1.4c4.95-.82,9.85-1.94,14.83-2.61l-3.99.54c4.33-.56,8.71-.73,13.05-.19l-3.99-.54c2.6.35,5.15.97,7.58,1.96l-3.58-1.51c1.82.77,3.52,1.74,5.1,2.94l-3.04-2.35c1.34,1.06,2.54,2.25,3.59,3.6l-2.35-3.04c1.15,1.51,2.08,3.15,2.82,4.89l-1.51-3.58c.86,2.11,1.42,4.31,1.72,6.57l-.54-3.99c.33,2.67.3,5.35-.03,8.02l.54-3.99c-.42,3.02-1.24,5.91-2.4,8.72l1.51-3.58c-1.84,4.32-4.36,8.27-7.22,11.98l2.35-3.04c-6.17,7.91-13.53,14.95-20.69,21.96s-15.12,14.32-22.9,21.26c-7.29,6.5-14.58,13.06-21,20.45-3.92,4.51-7.65,9.28-10.85,14.33s-5.55,10.25-7.67,15.7c-2.34,6.02-3.52,12.23-4.19,18.65s0,13.06,1.54,19.3c.89,3.6,3.72,7.11,6.89,8.96s7.95,2.68,11.56,1.51,7.13-3.42,8.96-6.89,2.51-7.52,1.51-11.56c-.37-1.49-.66-3-.87-4.52l.54,3.99c-.54-4.14-.48-8.31.07-12.45l-.54,3.99c.72-5.03,2.14-9.9,4.09-14.58l-1.51,3.58c2.63-6.2,6.14-11.93,10.26-17.25l-2.35,3.04c8.16-10.46,18.21-19.17,28.06-27.97,10.65-9.52,20.97-19.4,30.89-29.68,5.25-5.44,10.29-11.14,14.5-17.43,1.74-2.59,3.23-5.32,4.47-8.18,1.58-3.67,3.09-7.26,3.75-11.21s1.22-8,.85-12.02-.85-7.71-2.25-11.31c-1.94-5-4.11-8.9-7.72-12.94-2.52-2.83-5.77-5.29-9.15-7.02-7.79-3.98-16.56-5.53-25.27-5.03s-17.49,2.79-26.27,4.02l3.99-.54c-4.27.57-8.56.82-12.84.29l3.99.54c-4.87-.66-9.47-2.38-14.09-4-5.72-2.02-11.47-3.48-17.57-3.78-5.31-.26-10.81.7-15.92,2.1-4.11,1.13-8.1,2.66-12.11,4.11-4.5,1.62-9.05,3.17-13.8,3.84l3.99-.54c-2.53.33-5.07.39-7.61.06l3.99.54c-2.59-.38-4.97-1.25-7.42-2.15-1.3-.48-2.61-.93-3.97-1.19-3.58-.68-6.21-.88-9.69-.41-2.05.28-3.92.55-5.86,1.29-2.23.85-4.52,1.8-6.63,2.95-2.97,1.63-5.71,3.79-8.26,5.99-4.15,3.58-7.61,8.2-10.33,12.93s-5,10.34-6.65,15.77c-1.33,4.37-2.25,8.86-2.89,13.39-.92,6.53-1.73,13.07-1.54,19.68.11,3.85.61,7.66,1.18,11.46.4,2.64.99,5.26,1.83,7.8,1.17,3.55,2.63,7.07,4.44,10.35s4.18,6.3,6.58,9.16c4.56,5.44,10.41,9.78,16.16,13.87,4.89,3.48,9.97,6.69,14.74,10.34l-3.04-2.35c3.84,2.97,7.45,6.22,10.45,10.05l-2.35-3.04c1.79,2.33,3.29,4.82,4.44,7.52l-1.51-3.58c1,2.43,1.71,4.95,2.06,7.55l-.54-3.99c.25,2.05.28,4.09.03,6.13l.54-3.99c-.24,1.77-.68,3.47-1.35,5.13l1.51-3.58c-.35.83-.75,1.62-1.21,2.4-1.96,3.36-2.55,7.8-1.51,11.56.96,3.48,3.65,7.25,6.89,8.96,3.48,1.84,7.7,2.76,11.56,1.51s6.96-3.45,8.96-6.89h0Z"/>
      <path className="cls-1" d="M480.02,457.3c.03,2.46-.12,4.9-.43,7.34l.54-3.99c-.71,5.27-2.18,10.39-4.24,15.29l1.51-3.58c-2.65,6.23-6.19,12.02-10.31,17.38l2.35-3.04c-5.37,6.91-11.69,13.07-18.6,18.43l3.04-2.35c-.95.73-1.91,1.44-2.88,2.15-1.75.94-3.15,2.23-4.21,3.86-1.33,1.45-2.22,3.15-2.68,5.1-.99,3.59-.54,8.37,1.51,11.56s5.14,6.02,8.96,6.89,8.34.82,11.56-1.51c18.64-13.47,34.88-31.7,41.27-54.24.7-2.48,1.23-5.01,1.6-7.56.56-3.91,1.06-7.78,1.02-11.73s-1.65-7.86-4.39-10.61c-2.6-2.6-6.87-4.56-10.61-4.39s-7.9,1.45-10.61,4.39-4.44,6.56-4.39,10.61h0Z"/>
      <path className="cls-1" d="M503.84,483.34l-.17-.12,6.89,8.96-.06-.2v7.98l.05-.23-1.51,3.58.13-.2-5.38,5.38.21-.11-7.57,2.05.39.02-7.57-2.05c1.47.69,2.76,1.95,4.15,2.81s2.75,1.59,4.18,2.27c4.03,1.9,8.22,3.61,12.58,4.58,8.86,1.98,17.65,2.01,26.53.17,4.8-.99,9.45-2.88,13.81-5.08,3.24-1.63,5.95-5.56,6.89-8.96.99-3.59.54-8.37-1.51-11.56s-5.14-6.02-8.96-6.89l-3.99-.54c-2.71,0-5.23.69-7.57,2.05-.8.4-1.6.78-2.42,1.13l3.58-1.51c-3.41,1.43-6.96,2.4-10.62,2.92l3.99-.54c-3.92.52-7.87.53-11.79.04l3.99.54c-3.92-.53-7.73-1.55-11.38-3.07l3.58,1.51c-2.81-1.2-5.48-2.67-7.96-4.45-.64-.46-1.24-.95-1.93-1.33-2.36-1.29-5.26-2.2-7.96-2.07s-5.51.69-7.78,2.16-4.3,3.27-5.52,5.58c-1.02,1.94-1.54,3.68-1.83,5.81-.45,1.99-.36,3.99.27,5.98.18.7.45,1.36.81,1.99.6,1.86,1.64,3.47,3.1,4.83,1.02.89,2.09,1.71,3.21,2.46,3.1,2.09,8.05,2.48,11.56,1.51s7.25-3.65,8.96-6.89c1.84-3.48,2.76-7.7,1.51-11.56l-1.51-3.58c-1.33-2.25-3.13-4.05-5.38-5.38h0Z"/>
      <path className="cls-1" d="M523.55,487.73c1.11.39,2.2.81,3.28,1.26l-3.58-1.51c4.44,1.89,8.61,4.33,12.45,7.26l-3.04-2.35c3.82,2.96,7.24,6.37,10.21,10.18l-2.35-3.04c2.85,3.71,5.2,7.74,7.04,12.03l-1.51-3.58c1.95,4.63,3.27,9.48,3.97,14.46l-.54-3.99c.66,4.98.67,10.01.02,14.99l.54-3.99c-.04.28-.08.57-.12.85-.63,1.99-.71,3.99-.27,5.98.09,2,.68,3.86,1.78,5.58,1.82,3.11,5.39,6.08,8.96,6.89,3.84.87,8.15.69,11.56-1.51,3.05-1.97,6.33-5.2,6.89-8.96.99-6.67,1.51-13.12.64-19.83-.5-3.91-1.04-7.76-2.1-11.56s-2.54-7.31-4.09-10.87c-2.56-5.85-6.16-10.97-10.19-15.9-3.89-4.75-8.57-8.64-13.52-12.23-5.47-3.98-11.69-6.86-18.06-9.09-3.53-1.23-8.42-.33-11.56,1.51s-6.08,5.39-6.89,8.96c-.87,3.84-.69,8.15,1.51,11.56l2.35,3.04c1.87,1.86,4.08,3.14,6.62,3.86h0Z"/>
      <path className="cls-1" d="M555.55,462.19c3.92,6.32,7.54,13.07,12.51,18.64,1.63,1.83,3.67,3.32,5.65,4.72s4.42,2.37,6.74,3.08c3.86,1.19,8.02,1.1,12,1.6l-3.99-.54c1.24.17,2.44.44,3.59.92l-3.58-1.51c.57.26,1.09.57,1.61.93l-3.04-2.35c.55.43,1.03.91,1.47,1.46l-2.35-3.04c.49.66.87,1.34,1.19,2.09l-1.51-3.58c.39,1,.65,2.02.8,3.08l-.54-3.99c.14,1.19.16,2.38.07,3.58-.28,3.66,1.87,8.08,4.39,10.61s6.87,4.56,10.61,4.39,7.9-1.45,10.61-4.39l2.35-3.04c1.36-2.34,2.04-4.86,2.05-7.57.08-1.01.09-2.03-.01-3.04-.21-2.13-.4-4.37-1-6.44-.47-1.63-1.23-3.2-1.91-4.74-.19-.42-.38-.84-.62-1.24-.82-1.38-1.91-2.65-2.92-3.89-.33-.4-.67-.78-1.07-1.13-3.29-2.84-7.12-5.18-11.48-5.92-3.38-.57-6.75-.74-10.13-1.16l3.99.54c-1.27-.18-2.49-.45-3.68-.94l3.58,1.51c-.91-.41-1.74-.91-2.54-1.51l3.04,2.35c-1.18-.94-2.2-2.03-3.13-3.21l2.35,3.04c-3.46-4.5-6.21-9.62-9.2-14.44-2.02-3.26-5.23-5.87-8.96-6.89s-8.37-.54-11.56,1.51-6.02,5.14-6.89,8.96-.64,8.09,1.51,11.56h0Z"/>
      <path className="cls-1" d="M592.71,432.21c-.04-.26-.08-.53-.12-.8l.54,3.99c-.46-3.6-.44-7.22.03-10.81l-.54,3.99c.51-3.59,1.46-7.09,2.85-10.44l-1.51,3.58c1.36-3.22,3.09-6.24,5.2-9.02l-2.35,3.04c2.17-2.81,4.68-5.3,7.47-7.48l-3.04,2.35c3.34-2.57,7.01-4.64,10.89-6.29l-3.58,1.51c5.13-2.14,10.53-3.5,16.03-4.26l-3.99.54c7.59-1.01,15.26-.85,22.84.14l-3.99-.54c9.49,1.28,18.75,3.9,27.57,7.62l-3.58-1.51c9.94,4.23,19.25,9.8,27.8,16.4l-3.04-2.35c9.41,7.31,17.84,15.81,25.13,25.23l-2.35-3.04c4.73,6.14,9.22,12.65,12.27,19.81l-1.51-3.58c1.39,3.34,2.41,6.8,2.9,10.38l-.54-3.99c.44,3.55.38,7.11-.09,10.66l.54-3.99c-.83,5.84-2.69,11.45-4.97,16.87l1.51-3.58c-1.91,4.51-4.1,8.88-6.33,13.24-1.83,3.59-2.61,7.59-1.51,11.56.96,3.48,3.65,7.25,6.89,8.96,3.48,1.84,7.7,2.76,11.56,1.51,3.6-1.17,7.19-3.42,8.96-6.89,2.89-5.66,5.58-11.37,8.02-17.25,1.94-4.67,3.58-9.48,4.48-14.47.64-3.56,1.16-7.21,1.25-10.83s-.42-7.45-1.04-11.1c-1.01-5.92-3.48-11.66-6.25-16.95-2.19-4.18-4.81-8.12-7.57-11.94-3.2-4.43-6.58-8.77-10.16-12.9-5.72-6.6-12.05-12.68-18.9-18.1-7.74-6.12-15.78-11.72-24.6-16.19s-17.78-8.03-27.19-10.37c-5.4-1.34-10.88-2.16-16.4-2.84-4.23-.52-8.5-.77-12.76-.68-5.46.11-10.95.77-16.31,1.77-4.21.78-8.34,1.95-12.3,3.58-4.96,2.03-9.76,4.18-14.08,7.38-2.56,1.9-5.13,3.84-7.41,6.07s-4.43,4.99-6.42,7.68c-3.4,4.57-5.82,9.92-7.6,15.3-1.77,5.35-2.62,11.2-2.64,16.82-.01,3.42.49,6.81,1,10.19.46,1.95,1.36,3.65,2.68,5.1,1.06,1.63,2.46,2.92,4.21,3.86,3.22,1.88,7.95,2.68,11.56,1.51s7.13-3.42,8.96-6.89l1.51-3.58c.71-2.66.71-5.32,0-7.98h0Z"/>
      <path className="cls-1" d="M613.67,454.04c4.87.73,9.61,2.07,14.15,3.98l-3.58-1.51c4.53,1.94,8.78,4.41,12.7,7.4l-3.04-2.35c3.46,2.68,6.6,5.73,9.31,9.17l-2.35-3.04c2.24,2.9,4.13,6.03,5.57,9.41l-1.51-3.58c1.16,2.8,1.98,5.7,2.41,8.7l-.54-3.99c.38,2.89.4,5.78.04,8.67l.54-3.99c-.36,2.59-1.03,5.11-2.05,7.52l1.51-3.58c-.96,2.19-2.19,4.19-3.63,6.09l2.35-3.04c-1.78,2.3-3.79,4.41-5.78,6.53-2.76,2.95-5.37,6.03-7.7,9.34-.81,1.16-1.55,2.37-2.18,3.63-1.13,2.27-2.19,4.64-2.9,7.07s-1.08,5.21-1.2,7.8.31,5.29.91,7.83c.85,3.59,3.76,7.13,6.89,8.96s7.95,2.68,11.56,1.51,7.13-3.42,8.96-6.89c1.93-3.65,2.47-7.5,1.51-11.56-.13-.54-.23-1.07-.3-1.62l.54,3.99c-.13-1.22-.1-2.43.06-3.64l-.54,3.99c.24-1.51.66-2.94,1.22-4.36l-1.51,3.58c.99-2.35,2.32-4.5,3.87-6.52l-2.35,3.04c5.02-6.38,11.54-11.61,15.31-18.94,2.07-4.02,3.7-8.3,4.35-12.78.41-2.83.84-5.66.81-8.53s-.49-6.01-.97-8.94c-1.47-8.97-6.17-16.89-11.71-23.91-4.86-6.15-11.21-11.3-17.92-15.3-4.24-2.53-8.83-4.52-13.45-6.21-3.7-1.35-7.52-2.31-11.41-2.9-1.99-.63-3.99-.71-5.98-.27-2,.09-3.86.68-5.58,1.78-3.11,1.82-6.08,5.39-6.89,8.96-.87,3.84-.69,8.15,1.51,11.56,1.97,3.06,5.2,6.33,8.96,6.89h0Z"/>
      <path className="cls-1" d="M451.36,408.86c6.05-3.69,12.37-6.92,18.9-9.69l-3.58,1.51c12.18-5.13,25.01-8.61,38.1-10.4l-3.99.54c13.24-1.78,26.67-1.82,39.91-.07l-3.99-.54c4.75.64,9.47,1.5,14.13,2.61,4.42,1.05,8.89,2.19,13.09,3.94l-3.58-1.51c1.91.82,3.74,1.79,5.41,3.03l-3.04-2.35c1.03.8,1.96,1.69,2.79,2.7l-2.35-3.04c.58.76,1.08,1.56,1.5,2.42,1.58,3.23,5.59,5.97,8.96,6.89,3.59.99,8.37.54,11.56-1.51s6.02-5.14,6.89-8.96l.54-3.99c0-2.71-.69-5.23-2.05-7.57-.71-1.45-1.68-2.65-2.67-3.94s-1.98-2.58-3.26-3.66c-2.47-2.09-5.03-4.03-7.95-5.4-5.18-2.43-10.51-4.15-16.04-5.54-10.43-2.62-21.24-4.15-31.98-4.69s-21.41.27-32.07,1.74c-9.5,1.31-18.88,3.51-27.96,6.59-11.26,3.83-22.25,8.79-32.41,14.98-3.26,1.99-5.87,5.26-6.89,8.96s-.54,8.37,1.51,11.56,5.14,6.02,8.96,6.89,8.06.62,11.56-1.51h0Z"/>
      <path className="cls-1" d="M645.34,381.64c.47-2.81,1.28-5.53,2.37-8.16l-1.51,3.58c1.49-3.47,3.44-6.68,5.74-9.67l-2.35,3.04c2.91-3.72,6.3-7.01,10.03-9.9l-3.04,2.35c8.51-6.53,18.35-10.92,28.18-15.07l-3.58,1.51c18.59-7.84,37.2-15.63,55.8-23.44s35.25-15.14,53.54-20.88c10.09-3.17,20.39-5.69,30.88-7.11l-3.99.54c3.28-.43,6.58-.76,9.88-.96,3.01-.18,6.16-.47,9.16-.11l-3.99-.54c.76.11,1.48.29,2.2.58l-3.58-1.51c.28.14.53.28.79.45l-3.04-2.35c.24.19.44.37.65.6l-2.35-3.04c.19.25.33.48.46.76l-1.51-3.58.11.29c1.36,3.73,3.37,6.9,6.89,8.96,3.22,1.88,7.95,2.68,11.56,1.51s7.13-3.42,8.96-6.89,2.88-7.8,1.51-11.56c-1.07-2.94-2.26-5.54-4.52-7.78-1.28-1.26-2.78-2.46-4.38-3.28-3.58-1.86-7.21-2.63-11.26-2.75s-8.06.19-12.05.56c-9.23.86-18.41,2.38-27.41,4.61-15.95,3.95-31.32,9.89-46.49,16.15-15.98,6.6-31.89,13.37-47.83,20.07-8.12,3.41-16.25,6.82-24.37,10.24s-16.83,6.89-24.79,11.26c-15.49,8.51-29.01,21.44-34.45,38.64-.51,1.6-.89,3.24-1.17,4.9-.63,1.99-.71,3.99-.27,5.98.09,2,.68,3.86,1.78,5.58,1.82,3.11,5.39,6.08,8.96,6.89,3.84.87,8.15.69,11.56-1.51,3.09-1.99,6.26-5.18,6.89-8.96h0Z"/>
      <path className="cls-1" d="M829.69,284.98c.21,8.11-.23,16.22-1.31,24.26l.54-3.99c-1.81,13.17-5.34,26.03-10.48,38.29l1.51-3.58c-4.22,9.98-9.32,19.54-14.48,29.06-5.15,9.51-10.42,18.96-15.81,28.34-10.81,18.83-22.09,37.39-33.83,55.66-6.62,10.31-13.39,20.52-20.29,30.64-1.1,1.72-1.69,3.58-1.78,5.58-.45,1.99-.36,3.99.27,5.98.96,3.48,3.65,7.25,6.89,8.96,3.48,1.84,7.7,2.76,11.56,1.51l3.58-1.51c2.25-1.33,4.05-3.13,5.38-5.38,17.13-25.1,33.39-50.78,48.74-77.01,7.63-13.04,15.04-26.22,22.22-39.52,7.71-14.29,15.12-28.87,19.98-44.42,2.46-7.89,4.26-15.98,5.41-24.16,1.34-9.54,2.16-19.07,1.91-28.71-.1-3.91-1.6-7.82-4.39-10.61-2.6-2.6-6.87-4.56-10.61-4.39s-7.9,1.45-10.61,4.39-4.5,6.58-4.39,10.61h0Z"/>
    </svg>
  )
}