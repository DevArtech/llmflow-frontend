import { useRef, useState, useEffect } from "react";
import styles from "../App.module.css";
import React from "react";

interface TooltipProps {
  content: string;
  targetId: string;
  position?: { x: number; y: number };
}

function Tooltip(props: TooltipProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const xPos = props.position?.x || "2%";
  const yPos = props.position?.y || "0%";

  useEffect(() => {
    const target = document.getElementById(props.targetId);
    if (!target) {
      console.error(`Tooltip target with id ${props.targetId} not found`);
      return;
    }

    const mouseMove = (event: MouseEvent) => {
      setPos({ x: event.clientX, y: event.clientY });
    };

    const mouseEnter = () => {
      timeoutRef.current = window.setTimeout(() => {
        setVisible(true);
      }, 100);
    };

    const mouseLeave = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setVisible(false);
    };

    target.addEventListener("mouseenter", mouseEnter);
    target.addEventListener("mouseleave", mouseLeave);
    target.addEventListener("mousemove", mouseMove);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      target.removeEventListener("mouseenter", mouseEnter);
      target.removeEventListener("mouseleave", mouseLeave);
      target.removeEventListener("mousemove", mouseMove);
    };
  }, [props.targetId]);

  return (
    <div
      className={`${styles["tooltip"]} ${
        styles[visible ? "visible" : "hidden"]
      }`}
      style={{
        top: pos.y + 10,
        left: pos.x + 10,
        transform: `translate(${xPos}, ${yPos})`,
      }}
    >
      {props.content}
    </div>
  );
}

export default Tooltip;
