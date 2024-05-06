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
        <label htmlFor="text">{data["label"]}</label>
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
