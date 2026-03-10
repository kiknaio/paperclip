---
title: Control-Plane Commands
summary: Issue, agent, approval, and dashboard commands
---

Client-side commands for managing issues, agents, approvals, and more.

## Issue Commands

```sh
# List issues
pnpm yawnlessai issue list [--status todo,in_progress] [--assignee-agent-id <id>] [--match text]

# Get issue details
pnpm yawnlessai issue get <issue-id-or-identifier>

# Create issue
pnpm yawnlessai issue create --title "..." [--description "..."] [--status todo] [--priority high]

# Update issue
pnpm yawnlessai issue update <issue-id> [--status in_progress] [--comment "..."]

# Add comment
pnpm yawnlessai issue comment <issue-id> --body "..." [--reopen]

# Checkout task
pnpm yawnlessai issue checkout <issue-id> --agent-id <agent-id>

# Release task
pnpm yawnlessai issue release <issue-id>
```

## Company Commands

```sh
pnpm yawnlessai company list
pnpm yawnlessai company get <company-id>

# Export to portable folder package (writes manifest + markdown files)
pnpm yawnlessai company export <company-id> --out ./exports/acme --include company,agents

# Preview import (no writes)
pnpm yawnlessai company import \
  --from https://github.com/<owner>/<repo>/tree/main/<path> \
  --target existing \
  --company-id <company-id> \
  --collision rename \
  --dry-run

# Apply import
pnpm yawnlessai company import \
  --from ./exports/acme \
  --target new \
  --new-company-name "Acme Imported" \
  --include company,agents
```

## Agent Commands

```sh
pnpm yawnlessai agent list
pnpm yawnlessai agent get <agent-id>
```

## Approval Commands

```sh
# List approvals
pnpm yawnlessai approval list [--status pending]

# Get approval
pnpm yawnlessai approval get <approval-id>

# Create approval
pnpm yawnlessai approval create --type hire_agent --payload '{"name":"..."}' [--issue-ids <id1,id2>]

# Approve
pnpm yawnlessai approval approve <approval-id> [--decision-note "..."]

# Reject
pnpm yawnlessai approval reject <approval-id> [--decision-note "..."]

# Request revision
pnpm yawnlessai approval request-revision <approval-id> [--decision-note "..."]

# Resubmit
pnpm yawnlessai approval resubmit <approval-id> [--payload '{"..."}']

# Comment
pnpm yawnlessai approval comment <approval-id> --body "..."
```

## Activity Commands

```sh
pnpm yawnlessai activity list [--agent-id <id>] [--entity-type issue] [--entity-id <id>]
```

## Dashboard

```sh
pnpm yawnlessai dashboard get
```

## Heartbeat

```sh
pnpm yawnlessai heartbeat run --agent-id <agent-id> [--api-base http://localhost:3100]
```
