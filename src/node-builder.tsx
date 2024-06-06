import React from "react";
import {
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
} from "./node-elements.tsx";

interface NodeBuilderProps {
  node: {
    text?: {
      label: string;
      disableDrag(disable: boolean): void;
      placeholder?: string;
      type?: string;
    };
    file?: { label: string };
    radio?: { label: string; options: string[]; initial?: number };
    color?: { label: string; initialColor?: string };
    slider?: {
      label: string;
      min: number;
      max: number;
      step: number;
      initial?: number;
      disableDrag(disable: boolean): void;
    };
    dropdown?: { label: string; options: string[]; initial?: string };
    checkbox?: {
      label: string;
      options: { labels: string[]; states: boolean[] };
      isToggle?: boolean;
    };
    datetime?: { label: string; startingDate: string };
    bezierCurve?: {
      label: string;
      initialHandles: { x: number; y: number }[];
      disableDrag(disable: boolean): void;
      maxX: number;
      maxY: number;
    };
    number?: {
      label: string;
      min?: number;
      max?: number;
      step?: number;
      initial?: number;
      disableDrag(disable: boolean): void;
    };
  };
  disableDrag(disable: boolean): void;
}

export function NodeBuilder(props: NodeBuilderProps) {
  let nodeObj: any[] = [];
  if (props === undefined || props.node === undefined) {
    return [];
  }
  Object.keys(props.node).forEach((key) => {
    if (key === "text" && props.node.text?.label) {
      if (!props.node.text.disableDrag) {
        props.node.text.disableDrag = props.disableDrag;
      }
      nodeObj.push(<TextInput {...props.node.text} />);
    }
    if (key === "file" && props.node.file?.label) {
      nodeObj.push(<FileInput {...props.node.file} />);
    }
    if (key === "radio" && props.node.radio?.label) {
      nodeObj.push(<RadioInput {...props.node.radio} />);
    }
    if (key === "color" && props.node.color?.label) {
      nodeObj.push(<ColorInput {...props.node.color} />);
    }
    if (key === "slider" && props.node.slider?.label) {
      if (!props.node.slider.disableDrag) {
        props.node.slider.disableDrag = props.disableDrag;
      }
      nodeObj.push(<SliderInput {...props.node.slider} />);
    }
    if (key === "dropdown" && props.node.dropdown?.label) {
      nodeObj.push(<DropdownInput {...props.node.dropdown} />);
    }
    if (key === "checkbox" && props.node.checkbox?.label) {
      nodeObj.push(<CheckboxInput {...props.node.checkbox} />);
    }
    if (key === "datetime" && props.node.datetime?.label) {
      nodeObj.push(<DatetimeInput {...props.node.datetime} />);
    }
    if (key === "bezierCurve" && props.node.bezierCurve?.label) {
      if (!props.node.bezierCurve.disableDrag) {
        props.node.bezierCurve.disableDrag = props.disableDrag;
      }
      nodeObj.push(<BezierCurveInput {...props.node.bezierCurve} />);
    }
    if (key === "number" && props.node.number?.label) {
      if (!props.node.number.disableDrag) {
        props.node.number.disableDrag = props.disableDrag;
      }
      nodeObj.push(<NumberInput {...props.node.number} />);
    }
  });

  return nodeObj;
}
