import path from "node:path";
import {
  expandHomePrefix,
  resolveDefaultConfigPath,
  resolveDefaultContextPath,
  resolvePaperclipInstanceId,
} from "./home.js";

export interface DataDirOptionLike {
  dataDir?: string;
  config?: string;
  context?: string;
  instance?: string;
}

export interface DataDirCommandSupport {
  hasConfigOption?: boolean;
  hasContextOption?: boolean;
}

export function applyDataDirOverride(
  options: DataDirOptionLike,
  support: DataDirCommandSupport = {},
): string | null {
  const rawDataDir = options.dataDir?.trim();
  if (!rawDataDir) return null;

  const resolvedDataDir = path.resolve(expandHomePrefix(rawDataDir));
  process.env.YAWNLESS_HOME = resolvedDataDir;
  process.env.PAPERCLIP_HOME = resolvedDataDir;

  if (support.hasConfigOption) {
    const hasConfigOverride =
      Boolean(options.config?.trim()) ||
      Boolean(process.env.YAWNLESS_CONFIG?.trim()) ||
      Boolean(process.env.PAPERCLIP_CONFIG?.trim());
    if (!hasConfigOverride) {
      const instanceId = resolvePaperclipInstanceId(options.instance);
      process.env.YAWNLESS_INSTANCE_ID = instanceId;
      process.env.YAWNLESS_CONFIG = resolveDefaultConfigPath(instanceId);
      process.env.PAPERCLIP_INSTANCE_ID = instanceId;
      process.env.PAPERCLIP_CONFIG = process.env.YAWNLESS_CONFIG;
    }
  }

  if (support.hasContextOption) {
    const hasContextOverride =
      Boolean(options.context?.trim()) ||
      Boolean(process.env.YAWNLESS_CONTEXT?.trim()) ||
      Boolean(process.env.PAPERCLIP_CONTEXT?.trim());
    if (!hasContextOverride) {
      process.env.YAWNLESS_CONTEXT = resolveDefaultContextPath();
      process.env.PAPERCLIP_CONTEXT = process.env.YAWNLESS_CONTEXT;
    }
  }

  return resolvedDataDir;
}
