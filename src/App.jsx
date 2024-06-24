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
  const { getNodes, getEdges, getViewport } = useReactFlow();

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
        const nodeBuilder = NodeBuilder({
          items: result["items"],
          disableDrag: setDragDisabled,
        });
        const id = getId();
        const node = {
          id: id,
          type: "templateNode",
          position: {
            x: 10,
            y: 10,
          },
          data: {
            icon: result["icon"],
            name: result["name"],
            items: nodeBuilder,
          },
        };
        setNodes((nds) => nds.concat(node));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    const gradioApp = document.querySelector(".gradio-app");
    if (gradioApp) {
      gradioApp.remove();
    }

    const newGradioApp = document.createElement("gradio-app");
    newGradioApp.src = "http://127.0.0.1:8000/gradio";
    newGradioApp.className = "gradio-app";
    document.querySelector(".gradio-element").appendChild(newGradioApp);
  }, [selectedTab]);

  useEffect(() => {
    async function updateGradioCss() {
      setTimeout(() => {
        const gradioContainer = document.querySelector(".gradio-container");
        if (gradioContainer) {
          gradioContainer.style.margin = "0";
          gradioContainer.style.border = "0";
          gradioContainer.style.borderRadius = "0";
          gradioContainer.style.height = "95vh";
          gradioContainer.style.display = "block";
          gradioContainer.style.overflowY = "auto";
        }

        setTimeout(() => {
          const chatbotConversation = document.querySelector(
            ".placeholder-container"
          );
          if (chatbotConversation) {
            chatbotConversation.parentElement.parentElement.style.height = "55vh";
          }

          const chatbotText = document.getElementById("chattext_2");
          if (chatbotText) {
            chatbotText.style.minWidth = "min(75vw, 100%)";
          }
        }, 100);
      }, 10);
    }

    updateGradioCss();
  })

  useEffect(() => {
    const resetArchitecture = async () => {
			await fetch("http://127.0.0.1:8000/api/v1/reset-architecture");
		};
		window.addEventListener('beforeunload', resetArchitecture);
		return () => {
			window.removeEventListener('beforeunload', resetArchitecture);
		};
  }, [])

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

  function updateTab() {
    const nodes = document.querySelectorAll("#node");
    let nodeArchitecture = { Nodes: [], Edges: [] };
    nodes.forEach((node) => {
      let currentNode = {
        Id: node.parentNode.getAttribute("data-id"),
        Name: "",
        Items: [],
        Handles: [],
      };
      const firstChild = node.firstChild;
      const children = Array.from(firstChild.children);
      children.forEach((child) => {
        Array.from(child.children).forEach((grandchild) => {
          const id = grandchild.getAttribute("id");
          if (id !== null) {
            if (id === "name") {
              currentNode["Name"] = grandchild.innerText;
            }
            if (id === "data-item") {
              const elements = Array.from(grandchild.children);
              const itemType = elements[0].innerText;
              let itemValue = undefined;
              if (elements[1].tagName.toLowerCase() === "fieldset") {
                const value = elements[1].firstChild.firstChild.value;
                if (value.toLowerCase() === "true") {
                  itemValue = true;
                } else {
                  itemValue = false;
                }
              } else {
                itemValue = elements[1].value;
              }
              const item = { Type: itemType, Value: itemValue };
              currentNode["Items"].push(item);
            }
            if (id === "handle") {
              const handle = grandchild.firstChild;
              if (
                handle.getAttribute("data-id") &&
                handle.getAttribute("data-id").includes("source")
              ) {
                const handleElement = {
                  name: handle.getAttribute("data-handleid"),
                  type: "source",
                };
                currentNode["Handles"].push(handleElement);
              } else if (
                handle.getAttribute("data-id") &&
                handle.getAttribute("data-id").includes("target")
              ) {
                const handleElement = {
                  name: handle.getAttribute("data-handleid"),
                  type: "target",
                };
                currentNode["Handles"].push(handleElement);
              }
            }
          }
        });
      });
      nodeArchitecture["Nodes"].push(currentNode);
    });

    const edges = getEdges();
    edges.forEach((edge) => {
      const edgeItem = {
        Source: edge.source,
        Target: edge.target,
        "Source Handle": edge.sourceHandle,
        "Target Handle": edge.targetHandle,
      };
      nodeArchitecture["Edges"].push(edgeItem);
    });

    const requestObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: nodeArchitecture }),
    };
    fetch("http://127.0.0.1:8000/api/v1/update-architecture", requestObj);

    setSelectedTab(1);
  }

  return (
    <div
      style={{
        overflowX: "hidden",
        overflowY: selectedTab === 1 ? "auto" : "hidden",
      }}
    >
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
            onClick={() => updateTab()}
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
          className={`${styles["main-viewport"]} gradio-element`}
        ></div>
      </div>
    </div>
  );
}
