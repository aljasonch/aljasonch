"use client";

import { useState } from "react";

type BlueprintNode = {
  id: string;
  code: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  detail: string;
  stack: string[];
};

type Blueprint = {
  id: string;
  index: string;
  tab: string;
  headline: string;
  context: string;
  nodes: BlueprintNode[];
};

const BLUEPRINTS: Blueprint[] = [
  {
    id: "enterprise",
    index: "01",
    tab: "Enterprise & ERP",
    headline: "Business-critical systems under real operational load.",
    context:
      "Production software at PT Solusi Kode Indonesia (FIFGROUP) and Kompas Gramedia.",
    nodes: [
      {
        id: "proctor",
        code: "SYS-01",
        label: "Proctoring Client",
        sub: "FIFGROUP · Real-Time",
        x: 95,
        y: 110,
        detail:
          "Developing an online psychological test proctoring system for FIFGROUP, monitoring sessions in real time to safeguard candidate test integrity.",
        stack: ["Real-Time Monitoring", "TypeScript", "Cross-Functional Delivery"],
      },
      {
        id: "odoo",
        code: "SYS-02",
        label: "Odoo ERP Core",
        sub: "Accounting · Inventory · Purchase",
        x: 315,
        y: 110,
        detail:
          "Customized enterprise Odoo modules in Python and XML/QWeb across Accounting, Inventory, and Purchase workflows at Kompas Gramedia.",
        stack: ["Python", "Odoo", "XML / QWeb"],
      },
      {
        id: "postgres",
        code: "SYS-03",
        label: "PostgreSQL Layer",
        sub: "Query Optimization",
        x: 535,
        y: 110,
        detail:
          "Diagnosed and optimized slow relational queries to keep reporting and transactional ERP operations responsive.",
        stack: ["PostgreSQL", "SQL", "Indexing"],
      },
      {
        id: "cicd",
        code: "SYS-04",
        label: "Azure CI/CD",
        sub: "Gitflow · Production",
        x: 745,
        y: 110,
        detail:
          "Shipped changes across Agile sprints from planning through Gitflow reviews and automated Azure DevOps pipelines.",
        stack: ["Azure DevOps", "Gitflow", "CI/CD"],
      },
    ],
  },
  {
    id: "fullstack",
    index: "02",
    tab: "Full-Stack Web",
    headline: "Fast, multilingual, community-scale web products.",
    context:
      "Chainew, Tjahyadi Consulting, KKI Santo Agustinus, KeGia Art, Bilbil, and Mentoring UMN 2024.",
    nodes: [
      {
        id: "nextjs",
        code: "WEB-01",
        label: "Next.js App Router",
        sub: "SSR · Static · TypeScript",
        x: 95,
        y: 110,
        detail:
          "Structured React & Next.js frontends engineered for speed, clear hierarchy, and trilingual/bilingual localization (Indonesian, English, Mandarin).",
        stack: ["Next.js", "React", "TypeScript"],
      },
      {
        id: "domain",
        code: "WEB-02",
        label: "Domain Utilities",
        sub: "Tax Calc · Newsroom · Roster",
        x: 315,
        y: 110,
        detail:
          "Built practical domain tools including PPh 21 & withholding tax calculators (Tjahyadi), receipt bill-splitting workflows (Bilbil), and RSS newsroom categorization (Chainew).",
        stack: ["PPh 21 Calculators", "RSS Feeds", "Local Storage"],
      },
      {
        id: "firebase",
        code: "WEB-03",
        label: "Firebase & Auth",
        sub: "Firestore · ~2,000 Users",
        x: 535,
        y: 110,
        detail:
          "Powered authenticated publishing and live community platforms—including Mentoring UMN 2024 supporting nearly 2,000 first-year students reliably.",
        stack: ["Firebase Auth", "Cloud Firestore", "Content Admin"],
      },
      {
        id: "media",
        code: "WEB-04",
        label: "Media & Commerce",
        sub: "Cloudinary · Midtrans",
        x: 745,
        y: 110,
        detail:
          "Managed responsive media galleries and export catalogs with Cloudinary (KKI, KeGia Art) and payment flows with Midtrans (WeShare).",
        stack: ["Cloudinary", "Midtrans", "REST APIs"],
      },
    ],
  },
  {
    id: "ai",
    index: "03",
    tab: "AI & Automation",
    headline: "Grounded assistants, content sync, and sequence modeling.",
    context:
      "Portfolio Assistant API, Chainew content synchronization, and Informatics GRU thesis.",
    nodes: [
      {
        id: "ingest",
        code: "AI-01",
        label: "Input & Validation",
        sub: "Bounds · Rate Limiting",
        x: 95,
        y: 110,
        detail:
          "Server-only API endpoints with strict payload bounds, character limits, timeouts, and per-instance rate limiting before touching any model.",
        stack: ["Next.js Route Handlers", "Stream Bounds", "Rate Limiting"],
      },
      {
        id: "grounding",
        code: "AI-02",
        label: "Grounded Context",
        sub: "Typed Knowledge Source",
        x: 315,
        y: 110,
        detail:
          "Portfolio assistant answers strictly from one typed content module—refusing unsupported claims and sanitizing every Markdown link via AST parsing.",
        stack: ["Unified / Remark AST", "Prompt Guardrails", "URL Allowlist"],
      },
      {
        id: "sync",
        code: "AI-03",
        label: "Workflow Sync",
        sub: "Neuraspheres Pipeline",
        x: 535,
        y: 110,
        detail:
          "Automated content synchronization for Chainew in collaboration with Neuraspheres, reducing manual editorial overhead.",
        stack: ["Automated Sync", "RSS", "AI Agents"],
      },
      {
        id: "gru",
        code: "AI-04",
        label: "GRU Forecasting",
        sub: "IDX30 · GPA 3.74 Thesis",
        x: 745,
        y: 110,
        detail:
          "Undergraduate Informatics thesis at UMN predicting IDX30 stock index prices using a Gated Recurrent Unit (GRU) model integrated with technical indicators.",
        stack: ["Python", "GRU Neural Net", "Technical Indicators"],
      },
    ],
  },
];

export default function SystemsExplorer() {
  const [blueprintIndex, setBlueprintIndex] = useState(0);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0);

  const blueprint = BLUEPRINTS[blueprintIndex];
  const activeNode = blueprint.nodes[selectedNodeIndex] ?? blueprint.nodes[0];

  function selectBlueprint(nextIndex: number) {
    setBlueprintIndex(nextIndex);
    setSelectedNodeIndex(0);
  }

  return (
    <div className="systems-panel">
      <div className="systems-tabs" role="tablist" aria-label="Engineering domains">
        {BLUEPRINTS.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={idx === blueprintIndex}
            className={`systems-tab ${idx === blueprintIndex ? "is-active" : ""}`}
            onClick={() => selectBlueprint(idx)}
          >
            <span className="systems-tab-num">{item.index}</span>
            <span>{item.tab}</span>
          </button>
        ))}
      </div>

      <div className="systems-header">
        <div>
          <h3>{blueprint.headline}</h3>
          <p className="muted">{blueprint.context}</p>
        </div>
        <span className="systems-hint mono">
          Select any node below to inspect
        </span>
      </div>

      <div className="systems-schematic" aria-label="Interactive architecture diagram">
        <svg
          viewBox="0 0 840 220"
          className="systems-svg"
          role="img"
          aria-label={`${blueprint.tab} signal flow diagram`}
        >
          {/* Main signal bus */}
          <line
            x1="95"
            y1="110"
            x2="745"
            y2="110"
            className="bus-track"
          />
          <line
            x1="95"
            y1="110"
            x2="745"
            y2="110"
            className="bus-signal"
          />

          {/* Interactive nodes */}
          {blueprint.nodes.map((node, idx) => {
            const isSelected = idx === selectedNodeIndex;
            return (
              <g
                key={node.id}
                className={`schematic-node ${isSelected ? "is-active" : ""}`}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => setSelectedNodeIndex(idx)}
                role="button"
                tabIndex={0}
                aria-label={`Inspect ${node.label}`}
                aria-pressed={isSelected}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedNodeIndex(idx);
                  }
                }}
              >
                <rect
                  x="-78"
                  y="-46"
                  width="156"
                  height="92"
                  rx="2"
                  className="node-box"
                />
                <text x="-64" y="-22" className="node-code">
                  {node.code}
                </text>
                <circle cx="62" cy="-26" r="3.5" className="node-led" />
                <text x="-64" y="6" className="node-label">
                  {node.label}
                </text>
                <text x="-64" y="28" className="node-sub">
                  {node.sub}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Mobile/narrow accessible node selector fallback */}
        <div className="systems-node-pills">
          {blueprint.nodes.map((node, idx) => (
            <button
              key={node.id}
              type="button"
              className={idx === selectedNodeIndex ? "is-active" : ""}
              onClick={() => setSelectedNodeIndex(idx)}
            >
              <span>{node.code}</span> {node.label}
            </button>
          ))}
        </div>
      </div>

      <div className="systems-inspector" aria-live="polite">
        <div className="systems-inspector-meta">
          <span className="mono accent">{activeNode.code}</span>
          <strong>{activeNode.label}</strong>
          <span className="muted mono">{activeNode.sub}</span>
        </div>
        <p>{activeNode.detail}</p>
        <ul className="tech-list" aria-label="Node technologies">
          {activeNode.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
