import { useMemo } from "react";
import { Link } from "@/lib/router";
import { useQuery } from "@tanstack/react-query";
import { heartbeatsApi, type LiveRunForIssue } from "../api/heartbeats";
import { queryKeys } from "../lib/queryKeys";
import { cn, relativeTime } from "../lib/utils";

const MIN_DASHBOARD_RUNS = 8;

interface ActiveAgentsPanelProps {
  companyId: string;
}

function timeLabel(run: LiveRunForIssue): string | null {
  if (run.status === "running") {
    return null;
  }
  if (run.status === "queued") {
    return "queued";
  }
  return relativeTime(run.finishedAt ?? run.createdAt);
}

function runRank(run: LiveRunForIssue): number {
  if (run.status === "running") return 0;
  if (run.status === "queued") return 1;
  if (run.status === "failed" || run.status === "timed_out") return 2;
  if (run.status === "cancelled") return 3;
  return 4;
}

function pickMostRelevantRuns(runs: LiveRunForIssue[]): LiveRunForIssue[] {
  const byAgent = new Map<string, LiveRunForIssue>();

  for (const run of runs) {
    const existing = byAgent.get(run.agentId);
    if (!existing) {
      byAgent.set(run.agentId, run);
      continue;
    }

    const rankDelta = runRank(run) - runRank(existing);
    if (rankDelta < 0) {
      byAgent.set(run.agentId, run);
      continue;
    }
    if (rankDelta > 0) {
      continue;
    }

    const runCreatedAt = new Date(run.createdAt).getTime();
    const existingCreatedAt = new Date(existing.createdAt).getTime();
    if (runCreatedAt > existingCreatedAt) {
      byAgent.set(run.agentId, run);
    }
  }

  return Array.from(byAgent.values()).sort((a, b) => {
    const rankDelta = runRank(a) - runRank(b);
    if (rankDelta !== 0) return rankDelta;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

function StatusDot({ status }: { status: string }) {
  if (status === "running") {
    return (
      <span className="relative inline-flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/80" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
      </span>
    );
  }

  if (status === "failed" || status === "timed_out" || status === "cancelled") {
    return (
      <span className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-red-500" />
    );
  }

  if (status === "queued") {
    return <span className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-orange-500" />;
  }

  return <span className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-neutral-500/70" />;
}

export function ActiveAgentsPanel({ companyId }: ActiveAgentsPanelProps) {
  const { data: liveRuns } = useQuery({
    queryKey: [...queryKeys.liveRuns(companyId), "dashboard"],
    queryFn: () => heartbeatsApi.liveRunsForCompany(companyId, MIN_DASHBOARD_RUNS),
  });

  const runs = useMemo(() => pickMostRelevantRuns(liveRuns ?? []), [liveRuns]);

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Agents
      </h3>

      {runs.length === 0 ? (
        <div className="rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">No recent agent runs.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {runs.map((run) => {
            const label = timeLabel(run);
            return (
            <Link
              key={run.id}
              to={`/agents/${run.agentId}/runs/${run.id}`}
              className={cn(
                "inline-flex w-full items-center gap-2 rounded-lg border px-3 py-2 transition-colors sm:w-auto sm:min-w-[220px] sm:max-w-[320px]",
                run.status === "running"
                  ? "border-green-200 bg-green-50/30 hover:bg-green-50/50 dark:border-green-800/50 dark:bg-green-950/20 dark:hover:bg-green-950/30"
                  : "border-border bg-card hover:bg-accent/30",
              )}
              title={`Open run ${run.id.slice(0, 8)} for ${run.agentName}`}
            >
              <div className="flex min-w-0 items-center gap-2">
                <StatusDot status={run.status} />
                <span className="truncate text-sm font-medium text-foreground">{run.agentName}</span>
              </div>
              {label ? (
                <span className="ml-auto shrink-0 text-sm font-medium text-muted-foreground">
                  {label}
                </span>
              ) : null}
            </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
