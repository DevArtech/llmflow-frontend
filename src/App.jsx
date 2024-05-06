import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";

import TemplateNode from "./TemplateNode.jsx";

import "./template-node.css";

const rfStyle = {
  backgroundColor: "#404047",
};

const initialNodes = [
  {
    id: "1",
    type: "templateNode",
    position: {
      x: window.innerWidth / 2.15,
      y: window.innerHeight / 2.65,
    },
    data: { label: "Test Node 1" },
  },
  {
    id: "2",
    type: "templateNode",
    position: {
      x: window.innerWidth / 2.15,
      y: window.innerHeight / 2.65 + 100,
    },
    data: { label: "Test Node 2" },
  },
  {
    id: "3",
    type: "templateNode",
    position: {
      x: window.innerWidth / 2.15,
      y: window.innerHeight / 2.65 + 200,
    },
    data: { label: "Test Node 3" },
  },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const nodeTypes = { templateNode: TemplateNode };

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        style={rfStyle}
      >
        <Controls />
        <MiniMap style={rfStyle} />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
