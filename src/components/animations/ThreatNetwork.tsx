'use client';

import * as React from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  state: "neutral" | "red" | "amber";
  flashUntil: number;
};

export function ThreatNetwork() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const isMobile = rect.width < 768;
    const nodeCount = isMobile ? 28 : 56;
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 3 + Math.random(),
        state: "neutral",
        flashUntil: 0,
      });
    }

    let animationFrame: number;
    const startTime = performance.now();
    let scanStarted = false;
    let scanFinished = false;
    let threatsCount = 0;
    const maxThreats = 12;

    const centerX = rect.width * 0.35;
    const centerY = rect.height * 0.5;

    function drawRadarScan(now: number) {
      if (!ctx) return;
      const elapsed = (now - startTime - 1500) / 1000;
      if (elapsed < 0) return;
      const speed = 200; // px per second
      const radius = elapsed * speed;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 212, 255, 0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();

      nodes.forEach((node) => {
        if (node.state !== "neutral") return;
        const dx = node.x - centerX;
        const dy = node.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < radius && dist > radius - 4 && threatsCount < maxThreats) {
          const r = Math.random();
          if (r < 0.6) {
            node.state = "red";
            threatsCount += 1;
          } else if (r < 0.85) {
            node.state = "amber";
            threatsCount += 1;
          }
          node.flashUntil = now + 200;
        }
      });

      if (elapsed > 5) {
        scanFinished = true;
      }
    }

    function draw(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, rect.width, rect.height);

      // drift
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > rect.width) node.vx *= -1;
        if (node.y < 0 || node.y > rect.height) node.vy *= -1;
      });

      // lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const opacity = 0.06;
            if (a.state === "red" || b.state === "red") {
              ctx.strokeStyle = "rgba(255,59,59,0.25)";
            } else if (a.state === "amber" || b.state === "amber") {
              ctx.strokeStyle = "rgba(255,184,0,0.18)";
            } else {
              ctx.strokeStyle = `rgba(122,139,168,${opacity})`;
            }
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      nodes.forEach((node) => {
        let color = "rgba(122,139,168,0.3)";
        if (node.state === "red") color = "#ff3b3b";
        if (node.state === "amber") color = "#ffb800";

        let radius = node.radius;
        if (node.flashUntil && now < node.flashUntil) {
          radius *= 1.5;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      // Threat count
      ctx.font = "11px var(--font-mono, monospace)";
      ctx.fillStyle = "rgba(0,212,255,0.9)";
      ctx.fillText(`THREATS: ${threatsCount}`, rect.width - 110, 20);

      if (!prefersReduced && !isMobile && !scanFinished) {
        if (!scanStarted && performance.now() - startTime > 1500) {
          scanStarted = true;
        }
        if (scanStarted) {
          drawRadarScan(now);
        }
      } else if (prefersReduced || isMobile) {
        // show some pre-flagged nodes only, no scan
        nodes.slice(0, 10).forEach((node, idx) => {
          node.state = idx % 2 === 0 ? "red" : "amber";
        });
        scanFinished = true;
      }

      animationFrame = window.requestAnimationFrame(draw);
    }

    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}

