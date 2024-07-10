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
import { Position } from "reactflow";

interface NodeBuilderProps {
  items: [
    {
      itemType: string;
      label: string;
      required?: boolean;
      disableDrag?(disable: boolean): void;
      placeholder?: string;
      type?: "target" | "source" | string;
      options?: string[] | { labels: string[]; states: boolean[] };
      initial?: number | string;
      initialColor?: string
      min?: number;
      max?: number;
      step?: number;
      startingDate?: string
      initialHandles?: { x: number; y: number }[];
      maxX?: number;
      maxY?: number;
      handleId?: string;
      position?: Position;
      isConnectable?: any;
      style?: any;
    },
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
    let key = props.items[item]["itemType"]
    let obj = props.items[item];

    console.log(key);
    console.log(obj);

    if (key === "text-display" && obj.label) {
      nodeObj.push(<TextElement text={obj.label} />);
    }
    if (key === "handle" && obj.label) {
      nodeObj.push(<HandleElement {...obj} />);
    }
    if (key === "text" && obj.label) {
      if (!obj.disableDrag) {
        obj.disableDrag = props.disableDrag;
      }
      nodeObj.push(<TextInput {...obj} handleId={i} />);
    }
    if (key === "text-area" && obj.label) {
      if (!obj.disableDrag) {
        obj.disableDrag = props.disableDrag;
      }
      nodeObj.push(<TextAreaInput {...obj} handleId={i} />);
    }
    if (key === "file" && obj.label) {
      nodeObj.push(<FileInput {...obj} handleId={i} />);
    }
    if (key === "radio" && obj.label) {
      nodeObj.push(<RadioInput {...obj} handleId={i} />);
    }
    if (key === "color" && obj.label) {
      nodeObj.push(<ColorInput {...obj} handleId={i} />);
    }
    if (key === "slider" && obj.label) {
      if (!obj.disableDrag) {
        obj.disableDrag = props.disableDrag;
      }
      nodeObj.push(<SliderInput {...obj} handleId={i} />);
    }
    if (key === "dropdown" && obj.label) {
      nodeObj.push(<DropdownInput {...obj} handleId={i} />);
    }
    if (key === "checkbox" && obj.label) {
      nodeObj.push(<CheckboxInput {...obj} handleId={i} />);
    }
    if (key === "datetime" && obj.label) {
      nodeObj.push(<DatetimeInput {...obj} handleId={i} />);
    }
    if (key === "bezierCurve" && obj.label) {
      if (!obj.disableDrag) {
        obj.disableDrag = props.disableDrag;
      }
      nodeObj.push(<BezierCurveInput {...obj} handleId={i} />);
    }
    if (key === "number" && obj.label) {
      if (!obj.disableDrag) {
        obj.disableDrag = props.disableDrag;
      }
      nodeObj.push(<NumberInput {...obj} handleId={i} />);
    }

    i++;
  }

  return nodeObj;
}
