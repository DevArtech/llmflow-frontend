import { Handle, Position } from "reactflow";

function TemplateNode({ data, isConnectable, selected }) {
  const nodeClassName = selected ? "template-node selected" : "template-node";

  return (
    <div className={nodeClassName}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text">{data["name"]}</label>
        {data["items"] &&
          data["items"].map((item, index) => (
            <div
              key={index}
              style={{
                marginBottom:
                  index === data["items"].length - 1 ? "8px" : "0px",
              }}
            >
              {item}
            </div>
          ))}
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
