import React, { useCallback, useRef, useState } from "react";
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
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  useStoreApi,
  NodesChange,
  OnNodesChange,
  applyNodeChanges,
} from "reactflow";

import "reactflow/dist/style.css";

import TemplateNode from "./TemplateNode.jsx";
import "./template-node.css";

const rfStyle = {
  backgroundColor: "#404047",
};

let id = 1;
const getId = () => `${id++}`;

const MIN_DISTANCE = 100;

const nodeTypes = { templateNode: TemplateNode };

export default function App() {
  const store = useStoreApi();
  const connectingNodeId = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const [dragDisabled, setDragDisabled] = useState(false);

  React.useEffect(() => {
    getId();
  }, []);

  const initialNodes = [
    {
      id: "1",
      type: "templateNode",
      position: {
        x: window.innerWidth / 2.5,
        y: window.innerHeight / 2.85,
      },
      data: {
        name: "Test Node " + id,
        items: [
          <TextInput label="Text" disableDrag={setDragDisabled} />,
          <FileInput label="File" />,
          <RadioInput
            label="Radio"
            options={["A", "B", "C", "D", "E", "F", "G"]}
          />,
          <ColorInput label="Color" initialColor="red" />,
          <SliderInput
            min={0}
            max={1}
            step={0.01}
            initial={0.5}
            label="Slider"
            disableDrag={setDragDisabled}
          />,
          <DropdownInput
            label="Dropdown"
            options={["Option A", "Option B", "Option C"]}
          />,
          <CheckboxInput
            label="Check Single"
            options={{ labels: ["A"], states: [false] }}
          />,
          <CheckboxInput
            label="Check"
            options={{
              labels: ["A", "B", "C", "D", "E", "F", "G"],
              states: [true, false, true, false, true, false, true],
            }}
          />,
          <TextInput
            label="Link"
            placeholder="https://..."
            type="link"
            disableDrag={setDragDisabled}
          />,
          <TextInput
            label="Email"
            type="email"
            disableDrag={setDragDisabled}
          />,
          <TextInput
            label="Password"
            type="password"
            disableDrag={setDragDisabled}
          />,
          <TextInput label="Phone" type="tel" disableDrag={setDragDisabled} />,
          <DatetimeInput label="Datetime" startingDate="2024-05-09T21:35" />,
          <NumberInput
            label="Number"
            min={0}
            max={100}
            initial={50}
            disableDrag={setDragDisabled}
          />,
          <BezierCurveInput
            label="Bezier Curve"
            initialHandles={[
              { x: 0, y: 0 },
              { x: 75, y: 0 },
              { x: 225, y: 200 },
              { x: 300, y: 200 },
            ]}
            disableDrag={setDragDisabled}
            maxX={300}
            maxY={200}
          />,
        ],
      },
    },
  ];

  const initialEdges = [
    { id: "e1-2", type: "smoothstep", source: "1", target: "2" },
  ];

  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => {
    // reset the start node on connections
    connectingNodeId.current = null;
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        const id = getId();
        const newNode = {
          id,
          type: "templateNode",
          position: {
            x: event.clientX - 75,
            y: event.clientY - 17.5,
          },
          data: { name: "Test Node " + id },
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({
            id,
            source: connectingNodeId.current,
            target: id,
          })
        );
      }
    },
    [screenToFlowPosition]
  );

  const getClosestEdge = useCallback((node) => {
    const { nodeInternals } = store.getState();
    const storeNodes = Array.from(nodeInternals.values());

    const closestNode = storeNodes.reduce(
      (res, n) => {
        if (n.id !== node.id) {
          const dx = n.positionAbsolute.x - node.positionAbsolute.x;
          const dy = n.positionAbsolute.y - node.positionAbsolute.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < res.distance && d < MIN_DISTANCE) {
            res.distance = d;
            res.node = n;
          }
        }

        return res;
      },
      {
        distance: Number.MAX_VALUE,
        node: null,
      }
    );

    if (!closestNode.node) {
      return null;
    }

    const closeNodeIsSource =
      closestNode.node.positionAbsolute.x < node.positionAbsolute.x;

    return {
      id: closeNodeIsSource
        ? `${closestNode.node.id}-${node.id}`
        : `${node.id}-${closestNode.node.id}`,
      source: closeNodeIsSource ? closestNode.node.id : node.id,
      target: closeNodeIsSource ? node.id : closestNode.node.id,
    };
  }, []);

  const onNodeDrag = useCallback(
    (_, node) => {
      const closeEdge = getClosestEdge(node);

      setEdges((es) => {
        const nextEdges = es.filter((e) => e.className !== "temp");

        if (
          closeEdge &&
          !nextEdges.find(
            (ne) =>
              ne.source === closeEdge.source && ne.target === closeEdge.target
          )
        ) {
          closeEdge.className = "temp";
          nextEdges.push(closeEdge);
        }

        return nextEdges;
      });
    },
    [getClosestEdge, setEdges]
  );

  const onNodeDragStop = useCallback(
    (_, node) => {
      const closeEdge = getClosestEdge(node);

      setEdges((es) => {
        const nextEdges = es.filter((e) => e.className !== "temp");

        if (
          closeEdge &&
          !nextEdges.find(
            (ne) =>
              ne.source === closeEdge.source && ne.target === closeEdge.target
          )
        ) {
          nextEdges.push(closeEdge);
        }

        return nextEdges;
      });
    },
    [getClosestEdge]
  );

  const onNodesChange = (changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodesDraggable={!dragDisabled}
        panOnDrag={!dragDisabled}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        defaultEdgeOptions={{ type: "smoothstep" }}
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
