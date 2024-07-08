import * as Icons from "@mui/icons-material";
import { useState } from "react";
import {
  GeminiElement,
  OllamaElement,
  OpenAIElement,
} from "./node-elements.tsx";

const DynamicIcon = ({ iconName, color }) => {
  if (iconName === "OpenAI") {
    return <OpenAIElement width="24px" height="24px" />;
  }

  if (iconName === "Gemini") {
    return <GeminiElement width="24px" height="24px" />;
  }

  if (iconName === "Ollama") {
    return <OllamaElement width="24px" height="24px" />;
  }

  const IconComponent = Icons[iconName];

  if (!IconComponent) {
    return <Icons.Help style={{ color: "white" }} />;
  }

  return <IconComponent style={{ color: color ? color : "white" }} />;
};

function TemplateNode({ data, isConnectable, selected }) {
  const nodeClassName = selected ? "template-node selected" : "template-node";
  const [hidden, setHidden] = useState(false);
  const [items, setItems] = useState(data["items"]);

  function hideItems() {
    const newHideState = !hidden;
    let updatedItems = [];
    for (let item of data["items"]) {
      updatedItems.push({
        ...item,
        props: {
          ...item.props,
          hidden: newHideState,
        },
      });
    }

    setItems(updatedItems);
    setHidden(!hidden);
  }

  return (
    <div className={nodeClassName} id="node">
      <div>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignContent: "center",
            marginBottom: "0.5rem",
          }}
        >
          <DynamicIcon iconName={data["icon"]} />
          <label id="name" className="header-label" htmlFor="text">
            {data["name"]}
          </label>
          <button className="hide-button" onClick={() => hideItems()}>
            {hidden ? "Show Items" : "Hide Items"}
          </button>
        </div>
        {items &&
          items.map((item, index) => (
            <div
              key={index}
              style={{
                marginBottom: index === items.length - 1 ? "4px" : "0px",
              }}
            >
              {item}
            </div>
          ))}
      </div>
    </div>
  );
}

export default TemplateNode;
