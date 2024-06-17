import React, { useCallback, useRef, useState } from "react";
import { SmartElement } from "./node-elements.tsx";
import { NodeBuilder } from "./node-builder.tsx";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  useStoreApi,
  applyNodeChanges,
} from "reactflow";
import { useEffect } from "react";

import "reactflow/dist/style.css";

import TemplateNode from "./TemplateNode.jsx";
import "./template-node.css";

import styles from "./App.module.css";
import { Rtt } from "@mui/icons-material";

const rfStyle = {
  backgroundColor: "#404047",
};

let id = 0;
const getId = () => `${id++}`;

const MIN_DISTANCE = 100;

const nodeTypes = { templateNode: TemplateNode };

export default function App() {
  const store = useStoreApi();
  const connectingNodeId = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const [dragDisabled, setDragDisabled] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [integrations, setIntegrations] = useState([]);
  const [selectedIntegration, setSelectedIntegration] = useState("");
  const [integrationButtons, setIntegrationButtons] = useState([]);
  const [integrationOptionHovered, setIntegrationOptionHovered] =
    useState(false);
  const initialNodes = [];

  useEffect(() => {
    getId();
  }, []);

  const initialEdges = [];

  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => {
      // reset the start node on connections
      connectingNodeId.current = null;
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenToFlowPosition]
  );

  const getClosestEdge = useCallback(
    (node) => {
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
    },
    [store]
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
    [setEdges, getClosestEdge]
  );

  const onNodesChange = (changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  function addAPINode(integration, endpoint) {
    fetch(`http://127.0.0.1:8000/api/v1/${integration}/${endpoint}`)
      .then((response) => response.json())
      .then((result) => {
        const node = {
          id: getId(),
          type: "templateNode",
          position: {
            x: 10,
            y: 10,
          },
          data: {
            icon: result["icon"],
            name: result["name"],
            items: NodeBuilder({
              items: result["items"],
              disableDrag: setDragDisabled,
            }),
          },
        };
        setNodes((nds) => nds.concat(node));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    const gradioContainer = document.querySelectorAll(".gradio-container");
    if (gradioContainer) {
      gradioContainer.forEach((container) => {
        container.style.margin = "0";
        container.style.border = "0";
        container.style.borderRadius = "0";
        container.style.height = "100%";
      });
    }
  }, [selectedTab]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/integrations")
      .then((response) => response.json())
      .then((result) => {
        setIntegrations(result["integrations"]);
        const newIntegrationButtons = [];
        result["integrations"].forEach((integration) => {
          fetch(`http://127.0.0.1:8000/api/v1/${integration.toLowerCase()}`)
            .then((response) => response.json())
            .then((result) => {
              result["options"].forEach((option) => {
                newIntegrationButtons.push(
                  <button
                    id={integration}
                    key={option}
                    className={styles["button"]}
                    onClick={() =>
                      addAPINode(
                        integration.toLowerCase(),
                        option.toLowerCase()
                      )
                    }
                    onMouseEnter={() => setIntegrationOptionHovered(true)}
                    onMouseLeave={() => setIntegrationOptionHovered(false)}
                  >
                    <SmartElement
                      name={option.toLowerCase()}
                      width="24px"
                      height="24px"
                      color="white"
                    />
                  </button>
                );
              });
            });
        });
        setIntegrationButtons(newIntegrationButtons);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function enableDisableIntegration(integration) {
    if (!integrationOptionHovered && selectedIntegration === integration) {
      setSelectedIntegration("");
    } else {
      setSelectedIntegration(integration);
    }
  }

  return (
    <div style={{ overflow: "hidden" }}>
      {/* Top Navbar */}
      <div className={styles["top-navbar"]}>
        <h1 className={styles["header"]}>LLMFlow</h1>
        <div className={styles["tab-bar"]}>
          <button
            className={selectedTab === 0 ? styles["active"] : ""}
            onClick={() => setSelectedTab(0)}
          >
            Node Manager
          </button>
          <button
            className={selectedTab === 1 ? styles["active"] : ""}
            onClick={() => setSelectedTab(1)}
          >
            Live Preview
          </button>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        {/* Left Navbar */}
        <div
          style={{ display: selectedTab === 0 ? "block" : "none" }}
          className={`${styles["left-navbar"]} ${
            collapsed ? styles["collapsed"] : ""
          }`}
        >
          <button
            className={styles["collapse-button"]}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? ">" : "<"}
          </button>
          <div
            style={{
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              padding: "0.25rem",
            }}
          >
            {integrations.map((integration, index) => (
              <button
                className={styles["integration"]}
                key={index}
                onClick={() => enableDisableIntegration(integration)}
              >
                {integration}
                <div
                  className={styles["integration-buttons"]}
                  style={{
                    display:
                      selectedIntegration === integration ? "flex" : "none",
                  }}
                >
                  {integrationButtons.map((button, index) => {
                    if (button.props.id === integration) {
                      return button;
                    }
                    return null;
                  })}
                </div>
              </button>
            ))}
          </div>
          {/*
          <button
            className={styles["button"]}
            onClick={() => addAPINode("llms/openai")}
          >
            <OpenAIElement width="24px" height="24px" color="white" />
          </button>

          <button
            className={styles["button"]}
            onClick={() => addAPINode("llms/gemini")}
          >
            <GeminiElement width="24px" height="24px" color="white" />
          </button>

          <button
            className={styles["button"]}
            onClick={() => addAPINode("llms/ollama")}
          >
            <OllamaElement width="24px" height="24px" color="white" />
          </button>

          <button
            className={styles["button"]}
            onClick={() => addAPINode("inputs/text")}
          >
            <Rtt width="24px" height="24px" color="white" />
          </button>

          <button
            className={styles["button"]}
            onClick={() => addAPINode("outputs/text")}
          >
            <Rtt width="24px" height="24px" color="white" />
          </button> */}
        </div>
        {/* Main Viewport */}
        <div
          style={{ display: selectedTab === 0 ? "block" : "none" }}
          className={styles["main-viewport"]}
        >
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
            onNodeDragStop={onNodeDragStop}
            defaultEdgeOptions={{ type: "smooth" }}
            nodeTypes={nodeTypes}
            style={rfStyle}
          >
            <Controls />
            <MiniMap style={rfStyle} />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
        <div
          style={{ display: selectedTab === 1 ? "block" : "none" }}
          className={styles["main-viewport"]}
        >
          <gradio-app
            src="http://127.0.0.1:8000/gradio"
            className={styles["gradio-app"]}
          ></gradio-app>
        </div>
      </div>
    </div>
  );
}
