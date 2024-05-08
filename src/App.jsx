import React, { useCallback, useRef } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  useStoreApi,
} from "reactflow";

import "reactflow/dist/style.css";

import styles from "./App.css";

import TemplateNode from "./TemplateNode.jsx";
import "./template-node.css";

const rfStyle = {
  backgroundColor: "#404047",
};

let id = 1;
const getId = () => `${id++}`;

const MIN_DISTANCE = 100;

const initialNodes = [
  {
    id: "1",
    type: "templateNode",
    position: {
      x: window.innerWidth / 2.5,
      y: window.innerHeight / 2.85,
    },
    data: { name: "Test Node " + getId(),
            items: [<div style={{display: "flex", gap: "5px", alignItems: "center"}}>
                      <label>Text</label>
                      <input key={0} type="text" style={{fontSize: "12px", width: "100%"}}/>
                    </div>,

                    <div style={{display: "flex", gap: "5px", alignItems: "center"}}>
                      <label>File</label>
                      <input key={1} type="file" style={{fontSize: "12px", width: "100%", color: "white"}}/>
                    </div>,

                    <div style={{display: "flex", gap: "5px", alignItems: "center"}}>
                      <label>Radio</label>
                      <fieldset style={{border: "none", width: "100%", display: "flex", justifyContent: "space-around"}} key={2} id="group">
                        <div style={{ textAlign: "center" }}>
                          <input type="radio" value="A" name="group" style={{ fontSize: "12px" }} />
                          <p style={{lineHeight: 0, fontSize: "10px", color: "white", margin: "10px 0 0 0"}}>A</p>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <input type="radio" value="B" name="group" style={{ fontSize: "12px" }} />
                          <p style={{lineHeight: 0, fontSize: "10px", color: "white", margin: "10px 0 0 0"}}>B</p>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <input type="radio" value="C" name="group" style={{ fontSize: "12px" }} />
                          <p style={{lineHeight: 0, fontSize: "10px", color: "white", margin: "10px 0 0 0"}}>C</p>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <input type="radio" value="D" name="group" style={{ fontSize: "12px" }} />
                          <p style={{lineHeight: 0, fontSize: "10px", color: "white", margin: "10px 0 0 0"}}>D</p>
                        </div>
                      </fieldset>
                    </div>,

                    <div style={{display: "flex", gap: "5px", alignItems: "center"}}>
                      <label>Color</label>
                      <input key={3} type="color" style={{fontSize: "12px", width: "100%", color: "white"}}/>
                    </div>,
                  ]
     },
  },
];
const initialEdges = [
  { id: "e1-2", type: "smoothstep", source: "1", target: "2" },
];

const nodeTypes = { templateNode: TemplateNode };

export default function App() {
  const store = useStoreApi();
  const connectingNodeId = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
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

  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
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
