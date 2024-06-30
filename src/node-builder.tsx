import React from "react";
import {
  HandleElement,
  TextElement,
  TextInput,
  FileInput,
  RadioInput,
  ColorInput,
  SliderInput,
  DropdownInput,
  CheckboxInput,
  DatetimeInput,
  BezierCurveInput,
  NumberInput,
  TextAreaInput,
} from "./node-elements.tsx";

interface NodeBuilderProps {
  items: [
    {
      text?: {
        label: string;
        disableDrag(disable: boolean): void;
        placeholder?: string;
        type?: string;
      };
    },
    { file?: { disableDrag?: any; label: string } },
    { radio?: { label: string; options: string[]; initial?: number } },
    { color?: { label: string; initialColor?: string } },
    {
      slider?: {
        label: string;
        min: number;
        max: number;
        step: number;
        initial?: number;
        disableDrag(disable: boolean): void;
      };
    },
    { dropdown?: { label: string; options: string[]; initial?: string } },
    {
      checkbox?: {
        label: string;
        options: { labels: string[]; states: boolean[] };
        isToggle?: boolean;
      };
    },
    { datetime?: { label: string; startingDate: string } },
    {
      bezierCurve?: {
        label: string;
        initialHandles: { x: number; y: number }[];
        disableDrag(disable: boolean): void;
        maxX: number;
        maxY: number;
      };
    },
    {
      number?: {
        label: string;
        min?: number;
        max?: number;
        step?: number;
        initial?: number;
        disableDrag(disable: boolean): void;
      };
    }
  ];
  disableDrag(disable: boolean): void;
}

export function NodeBuilder(props: NodeBuilderProps) {
  let nodeObj: any[] = [];
  if (props === undefined || props.items === undefined) {
    return [];
  }

  let i = 0;
  for (let item in props.items) {
    let key = Object.keys(props.items[item])[0];
    let value = Object.values(props.items[item])[0];

    if (key === "text-display" && value.text) {
      nodeObj.push(<TextElement text={value.text} />);
    }
    if (key === "handle" && value.label) {
      nodeObj.push(<HandleElement {...value} />);
    }
    if (key === "text" && value.label) {
      if (!value.disableDrag) {
        value.disableDrag = props.disableDrag;
      }
      nodeObj.push(<TextInput {...value} handleId={i} />);
    }
    if (key === "text-area" && value.label) {
      if (!value.disableDrag) {
        value.disableDrag = props.disableDrag;
      }
      nodeObj.push(<TextAreaInput {...value} handleId={i} />);
    }
    if (key === "file" && value.label) {
      nodeObj.push(<FileInput {...value} handleId={i} />);
    }
    if (key === "radio" && value.label) {
      nodeObj.push(<RadioInput {...value} handleId={i} />);
    }
    if (key === "color" && value.label) {
      nodeObj.push(<ColorInput {...value} handleId={i} />);
    }
    if (key === "slider" && value.label) {
      if (!value.disableDrag) {
        value.disableDrag = props.disableDrag;
      }
      nodeObj.push(<SliderInput {...value} handleId={i} />);
    }
    if (key === "dropdown" && value.label) {
      nodeObj.push(<DropdownInput {...value} handleId={i} />);
    }
    if (key === "checkbox" && value.label) {
      nodeObj.push(<CheckboxInput {...value} handleId={i} />);
    }
    if (key === "datetime" && value.label) {
      nodeObj.push(<DatetimeInput {...value} handleId={i} />);
    }
    if (key === "bezierCurve" && value.label) {
      if (!value.disableDrag) {
        value.disableDrag = props.disableDrag;
      }
      nodeObj.push(<BezierCurveInput {...value} handleId={i} />);
    }
    if (key === "number" && value.label) {
      if (!value.disableDrag) {
        value.disableDrag = props.disableDrag;
      }
      nodeObj.push(<NumberInput {...value} handleId={i} />);
    }

    i++;
  }

  return nodeObj;
}
