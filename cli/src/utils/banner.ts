import pc from "picocolors";

const YAWNLESS_ART = [
  "██╗   ██╗ █████╗ ██╗    ██╗███╗   ██╗██╗     ███████╗███████╗███████╗",
  "╚██╗ ██╔╝██╔══██╗██║    ██║████╗  ██║██║     ██╔════╝██╔════╝██╔════╝",
  " ╚████╔╝ ███████║██║ █╗ ██║██╔██╗ ██║██║     █████╗  ███████╗███████╗",
  "  ╚██╔╝  ██╔══██║██║███╗██║██║╚██╗██║██║     ██╔══╝  ╚════██║╚════██║",
  "   ██║   ██║  ██║╚███╔███╔╝██║ ╚████║███████╗███████╗███████║███████║",
  "   ╚═╝   ╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═══╝╚══════╝╚══════╝╚══════╝╚══════╝",
] as const;

const TAGLINE = "Open-source orchestration for zero-human companies";

export function printPaperclipCliBanner(): void {
  const lines = [
    "",
    ...YAWNLESS_ART.map((line) => pc.cyan(line)),
    pc.blue("  ───────────────────────────────────────────────────────"),
    pc.bold(pc.white(`  ${TAGLINE}`)),
    "",
  ];

  console.log(lines.join("\n"));
}
