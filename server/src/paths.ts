import fs from "node:fs";
import path from "node:path";
import { resolveDefaultConfigPath } from "./home-paths.js";

const YAWNLESS_CONFIG_BASENAME = "config.json";
const YAWNLESS_ENV_FILENAME = ".env";

function findConfigFileFromAncestors(startDir: string): string | null {
  const absoluteStartDir = path.resolve(startDir);
  let currentDir = absoluteStartDir;

  while (true) {
    const legacyCandidate = path.resolve(currentDir, ".paperclip", YAWNLESS_CONFIG_BASENAME);
    if (fs.existsSync(legacyCandidate)) return legacyCandidate;
    const brandedCandidate = path.resolve(currentDir, ".yawnless", YAWNLESS_CONFIG_BASENAME);
    if (fs.existsSync(brandedCandidate)) return brandedCandidate;

    const nextDir = path.resolve(currentDir, "..");
    if (nextDir === currentDir) break;
    currentDir = nextDir;
  }

  return null;
}

export function resolvePaperclipConfigPath(overridePath?: string): string {
  if (overridePath) return path.resolve(overridePath);
  if (process.env.YAWNLESS_CONFIG) return path.resolve(process.env.YAWNLESS_CONFIG);
  if (process.env.PAPERCLIP_CONFIG) return path.resolve(process.env.PAPERCLIP_CONFIG);
  return findConfigFileFromAncestors(process.cwd()) ?? resolveDefaultConfigPath();
}

export function resolvePaperclipEnvPath(overrideConfigPath?: string): string {
  return path.resolve(path.dirname(resolvePaperclipConfigPath(overrideConfigPath)), YAWNLESS_ENV_FILENAME);
}
