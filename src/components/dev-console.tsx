"use client";

import { useState, type FormEvent } from "react";
import {
  certifications,
  education,
  experience,
  profile,
  projects,
  skills,
} from "@/lib/content";

type Entry = {
  id: number;
  cmd: string;
  lines: string[];
};

const QUICK_COMMANDS = [
  "whoami",
  "work",
  "experience",
  "skills",
  "thesis",
  "contact",
];

function evaluate(raw: string): { lines: string[]; action?: "clear" | "cv" | "chat" } {
  const trimmed = raw.trim();
  const [head, ...rest] = trimmed.toLowerCase().split(/\s+/);
  const arg = rest.join(" ");

  if (!head) return { lines: [] };
  if (head === "clear") return { lines: [], action: "clear" };
  if (head === "cv")
    return {
      lines: [`Opening ${profile.cv} ...`],
      action: "cv",
    };
  if (head === "ask")
    return {
      lines: ["Opening AI portfolio assistant drawer..."],
      action: "chat",
    };

  if (head === "help") {
    return {
      lines: [
        "AVAILABLE COMMANDS:",
        "  whoami          Profile & current focus",
        "  work            List all 07 projects (or: cat <slug>)",
        "  experience      Engineering & ERP career timeline",
        "  skills          Languages, frameworks & tools",
        "  thesis          UMN Informatics GRU research & certifications",
        "  contact         Direct email & verified links",
        "  cv              Download PDF resume",
        "  ask             Launch AI portfolio assistant",
        "  clear           Reset console output",
      ],
    };
  }

  if (head === "whoami") {
    return {
      lines: [
        `${profile.name} — ${profile.role}`,
        `Location : ${profile.location} (UTC+7)`,
        `Current  : ${experience[0].role} @ ${experience[0].company}`,
        `Focus    : Full-stack products, business/ERP systems, AI workflows.`,
      ],
    };
  }

  if (head === "work" || head === "ls") {
    return {
      lines: [
        "SHIPPED ARCHIVE (run `cat <slug>` for details):",
        ...projects.map(
          (p, i) =>
            `  [${String(i + 1).padStart(2, "0")}] ${p.slug.padEnd(11, " ")} ${p.title} (${p.year}) — ${p.tech.join(", ")}`,
        ),
      ],
    };
  }

  if (head === "cat") {
    const match = projects.find(
      (p) => p.slug === arg || p.title.toLowerCase() === arg,
    );
    if (!match) {
      return {
        lines: [
          `cat: '${arg || "?"}' not found. Try: ${projects.map((p) => p.slug).join(", ")}`,
        ],
      };
    }
    return {
      lines: [
        `${match.title.toUpperCase()} (${match.category} · ${match.year})`,
        `Role  : ${match.role}`,
        `Stack : ${match.tech.join(" / ")}`,
        `Notes : ${match.detail}`,
        ...(match.url ? [`URL   : ${match.url}`] : []),
      ],
    };
  }

  if (head === "experience" || head === "exp") {
    return {
      lines: experience.flatMap((job) => [
        `${job.company} — ${job.role} [${job.dates}]`,
        `  ${job.description}`,
      ]),
    };
  }

  if (head === "skills" || head === "stack") {
    return {
      lines: [
        `Languages  : ${skills.languages.join(", ")}`,
        `Frameworks : ${skills.frameworks.join(", ")}`,
        `Platforms  : ${skills.tools.join(", ")}`,
        `Spoken     : ${skills.spoken.join(" | ")}`,
      ],
    };
  }

  if (head === "thesis" || head === "edu" || head === "education") {
    return {
      lines: [
        `${education[0].school} (${education[0].dates})`,
        `  ${education[0].qualification} — ${education[0].detail}`,
        "CERTIFICATIONS:",
        ...certifications.map((c) => `  · ${c.title} (${c.detail}) — ${c.issuer}`),
      ],
    };
  }

  if (head === "contact") {
    return {
      lines: [
        `Email    : ${profile.email}`,
        `GitHub   : ${profile.github}`,
        `LinkedIn : ${profile.linkedin}`,
        `Website  : ${profile.website}`,
      ],
    };
  }

  return {
    lines: [`command not found: ${head}. Type 'help' or click a command above.`],
  };
}

export default function DevConsole() {
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<Entry[]>([
    {
      id: 0,
      cmd: "whoami",
      lines: evaluate("whoami").lines,
    },
  ]);

  function runCommand(command: string) {
    const clean = command.trim();
    if (!clean) return;
    const result = evaluate(clean);
    if (result.action === "clear") {
      setEntries([]);
      setInput("");
      return;
    }
    if (result.action === "cv") {
      window.open(profile.cv, "_blank", "noopener,noreferrer");
    }
    if (result.action === "chat") {
      window.dispatchEvent(new CustomEvent("open-portfolio-chat"));
    }
    setEntries((prev) =>
      [...prev, { id: Date.now() + Math.random(), cmd: clean, lines: result.lines }].slice(
        -6,
      ),
    );
    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runCommand(input);
  }

  return (
    <div className="dev-console" aria-label="Interactive engineering console">
      <div className="console-head mono">
        <span className="console-title">
          <i className="console-dot" aria-hidden="true" />
          jason@tangerang ~ %
        </span>
        <span className="muted">INTERACTIVE SPEC SHELL</span>
      </div>

      <div className="console-chips" aria-label="Quick commands">
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            className="console-chip mono"
            onClick={() => runCommand(cmd)}
          >
            $ {cmd}
          </button>
        ))}
        <button
          type="button"
          className="console-chip console-chip-accent mono"
          onClick={() => runCommand("ask")}
        >
          $ ask-ai ↗
        </button>
      </div>

      <div className="console-output mono" role="log" aria-live="polite">
        {entries.length === 0 && (
          <p className="muted">Console cleared. Type &apos;help&apos; to list commands.</p>
        )}
        {entries.map((entry) => (
          <div key={entry.id} className="console-entry">
            <div className="console-cmd">
              <span className="accent">❯</span> {entry.cmd}
            </div>
            {entry.lines.map((line, i) => (
              <pre key={i} className="console-line">
                {line}
              </pre>
            ))}
          </div>
        ))}
      </div>

      <form className="console-form mono" onSubmit={handleSubmit}>
        <label htmlFor="console-input" className="accent">
          ❯
        </label>
        <input
          id="console-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Try 'work', 'cat chainew', 'thesis', 'help'…"
          autoComplete="off"
          spellCheck={false}
        />
        <button type="submit" className="console-run">
          RUN
        </button>
      </form>
    </div>
  );
}
