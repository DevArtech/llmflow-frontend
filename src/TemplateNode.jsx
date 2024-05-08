import { useCallback } from "react";
import { Handle, Position } from "reactflow";

function TemplateNode({ data, isConnectable }) {
  return (
    <div className="template-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text">{data["name"]}</label>
        {
          data["items"] && data["items"].map((item, index) => (
            <div key={index} style={{marginBottom: index === data["items"].length - 1 ? "8px" : "0px"}}>
              {item}
            </div>
          ))
        }
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TemplateNode;
