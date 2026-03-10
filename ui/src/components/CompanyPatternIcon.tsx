import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import * as initials from "@dicebear/initials";
import { cn } from "../lib/utils";

interface CompanyPatternIconProps {
  companyName: string;
  brandColor?: string | null;
  className?: string;
}

function normalizeHexColor(value?: string | null): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!/^#[0-9a-fA-F]{6}$/.test(trimmed)) return undefined;
  return trimmed.slice(1).toLowerCase();
}

function makeCompanyPatternDataUrl(seed: string, brandColor?: string | null): string {
  const normalizedBrandColor = normalizeHexColor(brandColor);
  const avatar = createAvatar(initials, {
    seed,
    chars: 2,
    fontWeight: 600,
    ...(normalizedBrandColor
      ? {
          backgroundColor: [normalizedBrandColor],
        }
      : {}),
  });

  const svg = avatar.toString();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function CompanyPatternIcon({ companyName, brandColor, className }: CompanyPatternIconProps) {
  const normalizedName = companyName.trim().toLowerCase() || "company";
  const patternDataUrl = useMemo(
    () => makeCompanyPatternDataUrl(normalizedName, brandColor),
    [normalizedName, brandColor],
  );

  return (
    <div
      className={cn(
        "relative flex h-11 w-11 items-center justify-center overflow-hidden",
        className,
      )}
    >
      {patternDataUrl ? (
        <img
          src={patternDataUrl}
          alt={`${companyName} icon`}
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <div className="absolute inset-0 bg-muted" />
      )}
    </div>
  );
}
