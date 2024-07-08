import React, { useCallback, useRef, useState } from "react";
import { SmartElement } from "./components/node-elements.tsx";
import { NodeBuilder } from "./node-builder.tsx";
import Tooltip from "./components/tooltip.tsx";
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
  applyEdgeChanges,
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
const decrementId = () => `${id--}`;

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
  const [edges, setEdges] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => {
      // reset the start node on connections
      connectingNodeId.current = null;
      if (params.targetHandle.includes("element")) {
        if (params.targetHandle.includes("element")) {
          const targetElement = document.querySelector(
            `[data-id="${params.target}"]`
          );
          if (targetElement) {
            const elements = targetElement.firstChild.firstChild.children;
            Array.from(elements).forEach((element) => {
              const item = element.firstChild;
              if (
                item.id === "data-item" &&
                item.firstChild.hasAttribute("data-handleid") &&
                item.firstChild.getAttribute("data-handleid") ===
                  params.targetHandle
              ) {
                const itemChildren = Array.from(item.children);
                itemChildren.forEach((child) => {
                  if (child.tagName.toLowerCase() === "input") {
                    child.disabled = true;
                  }
                  if (child.tagName.toLowerCase() === "select") {
                    child.disabled = true;
                  }
                  if (child.tagName.toLowerCase() === "textarea") {
                    child.disabled = true;
                  }
                });
              }
            });
          }
        }
      }
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const onDisconnect = useCallback(
    (params) => {
      // reset the start node on connections
      connectingNodeId.current = null;
      if (params.targetHandle.includes("element")) {
        if (params.targetHandle.includes("element")) {
          const targetElement = document.querySelector(
            `[data-id="${params.target}"]`
          );
          if (targetElement) {
            const elements = targetElement.firstChild.firstChild.children;
            Array.from(elements).forEach((element) => {
              const item = element.firstChild;
              if (
                item.id === "data-item" &&
                item.firstChild.hasAttribute("data-handleid") &&
                item.firstChild.getAttribute("data-handleid") ===
                  params.targetHandle
              ) {
                const itemChildren = Array.from(item.children);
                itemChildren.forEach((child) => {
                  if (child.tagName.toLowerCase() === "input") {
                    child.disabled = true;
                  }
                  if (child.tagName.toLowerCase() === "select") {
                    child.disabled = true;
                  }
                  if (child.tagName.toLowerCase() === "textarea") {
                    child.disabled = true;
                  }
                });
              }
            });
          }
        }
      }
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

  const onEdgesChange = (edges) => {
    edges.forEach((edge) => {
      if (edge.type === "remove") {
        const id = edge.id.replace("reactflow__edge-", "");
        const match = id.match(/(\d+)([A-Za-z]+)-(\d+)([A-Za-z0-9_]+)/);
        if (match) {
          const [_, source, sourceHandle, target, targetHandle] = match;
          if (targetHandle.includes("element")) {
            if (targetHandle.includes("element")) {
              const targetElement = document.querySelector(
                `[data-id="${target}"]`
              );
              if (targetElement) {
                const elements = targetElement.firstChild.firstChild.children;
                Array.from(elements).forEach((element) => {
                  const item = element.firstChild;
                  if (
                    item.id === "data-item" &&
                    item.firstChild.hasAttribute("data-handleid") &&
                    item.firstChild.getAttribute("data-handleid") ===
                      targetHandle
                  ) {
                    const itemChildren = Array.from(item.children);
                    itemChildren.forEach((child) => {
                      if (child.tagName.toLowerCase() === "input") {
                        child.removeAttribute("disabled");
                      }
                      if (child.tagName.toLowerCase() === "select") {
                        child.removeAttribute("disabled");
                      }
                      if (child.tagName.toLowerCase() === "textarea") {
                        child.removeAttribute("disabled");
                      }
                    });
                  }
                });
              }
            }
          }
        }
      }
    });
    setEdges((eds) => applyEdgeChanges(edges, eds));
  };

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

    const newGradioApp = document.createElement("iframe");
    newGradioApp.src = "http://127.0.0.1:8000/gradio";
    newGradioApp.style.width = "100%";
    newGradioApp.style.height = "95vh";
    newGradioApp.style.border = "0";
    newGradioApp.className = "gradio-app";
    newGradioApp.theme_mode = "dark";
    document.querySelector(".gradio-element").appendChild(newGradioApp);
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
                    id={`${integration}/${option["name"]
                      .toLowerCase()
                      .replace(" ", "-")}`}
                    key={option["name"]}
                    className={styles["button"]}
                    onClick={() =>
                      addAPINode(
                        integration.toLowerCase(),
                        option["name"].toLowerCase().replace(" ", "-")
                      )
                    }
                    onMouseEnter={() => setIntegrationOptionHovered(true)}
                    onMouseLeave={() => setIntegrationOptionHovered(false)}
                  >
                    <SmartElement
                      name={option["name"].toLowerCase()}
                      width="24px"
                      height="24px"
                      color="white"
                    />
                    <Tooltip
                      content={option["detail"]}
                      targetId={`${integration}/${option["name"]
                        .toLowerCase()
                        .replace(" ", "-")}`}
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
              let elements = Array.from(grandchild.children);
              if (elements[0] && elements[0].hasAttribute("data-handleid")) {
                if (elements[0].getAttribute("data-id").includes("source")) {
                  const handleElement = {
                    name: elements[0].getAttribute("data-handleid"),
                    type: "source",
                  };
                  currentNode["Handles"].push(handleElement);
                } else if (
                  elements[0].getAttribute("data-id").includes("target")
                ) {
                  const handleElement = {
                    name: elements[0].getAttribute("data-handleid"),
                    type: "target",
                  };
                  currentNode["Handles"].push(handleElement);
                }
                elements = elements.slice(1);
              }

              const itemType = elements[0].innerText;
              let itemValue = undefined;
              if (elements[1].tagName.toLowerCase() === "fieldset") {
                const value = elements[1].firstChild.firstChild.value;
                if (value.toLowerCase() === "true") {
                  itemValue = true;
                } else {
                  itemValue = false;
                }
              } else if (elements[1].tagName.toLowerCase() === "span") {
                itemValue = elements[2].value;
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
        Type: edge.targetHandle.includes("element") ? "Data" : "Normal",
      };
      nodeArchitecture["Edges"].push(edgeItem);
    });

    const requestObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: nodeArchitecture }),
    };
    fetch("http://127.0.0.1:8000/api/v1/update-architecture", requestObj)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .then((result) => {
        setSelectedTab(1);
      });
  }

  const onNodesDelete = (deletedNodes) => {
    const deletedNodeId = deletedNodes[0]?.id;

    let updatedEdges = edges.map((edge) => {
      if (edge.source > deletedNodeId) {
        edge.source -= 1;
      }
      if (edge.target > deletedNodeId) {
        edge.target -= 1;
      }
      return edge;
    });

    updatedEdges = updatedEdges.filter((edge) => {
      return edge.source !== deletedNodeId && edge.target !== deletedNodeId;
    });

    setEdges(updatedEdges);

    const updatedNodes = nodes.map((node) => {
      if (node.id > deletedNodeId) {
        return {
          ...node,
          id: node.id - 1,
        };
      }
      return node;
    });
    setNodes(updatedNodes);

    decrementId();
  };

  // const onDisconnect = useCallback(
  //   (connections: Connection[]) =>
  //     console.log("onDisconnect handler, node id:", nodeId, connections),
  //   [nodeId]
  // );

  return (
    <div
      style={{
        overflow: "hidden",
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
                    const buttonIntegration = button.props.id.split("/")[0];
                    if (buttonIntegration === integration) {
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
            onDisconnect={onDisconnect}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            onNodeDragStop={onNodeDragStop}
            onNodesDelete={onNodesDelete}
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
