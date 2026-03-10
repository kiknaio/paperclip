# CLI Reference

Yawnless.ai CLI now supports both:

- instance setup/diagnostics (`onboard`, `doctor`, `configure`, `env`, `allowed-hostname`)
- control-plane client operations (issues, approvals, agents, activity, dashboard)

## Base Usage

Use repo script in development:

```sh
pnpm yawnlessai --help
```

First-time local bootstrap + run:

```sh
pnpm yawnlessai run
```

Choose local instance:

```sh
pnpm yawnlessai run --instance dev
```

## Deployment Modes

Mode taxonomy and design intent are documented in `doc/DEPLOYMENT-MODES.md`.

Current CLI behavior:

- `yawnlessai onboard` and `yawnlessai configure --section server` set deployment mode in config
- runtime can override mode with `YAWNLESS_DEPLOYMENT_MODE`
- `yawnlessai run` and `yawnlessai doctor` do not yet expose a direct `--mode` flag

Target behavior (planned) is documented in `doc/DEPLOYMENT-MODES.md` section 5.

Allow an authenticated/private hostname (for example custom Tailscale DNS):

```sh
pnpm yawnlessai allowed-hostname dotta-macbook-pro
```

All client commands support:

- `--data-dir <path>`
- `--api-base <url>`
- `--api-key <token>`
- `--context <path>`
- `--profile <name>`
- `--json`

Company-scoped commands also support `--company-id <id>`.

Use `--data-dir` on any CLI command to isolate all default local state (config/context/db/logs/storage/secrets) away from `~/.yawnless`:

```sh
pnpm yawnlessai run --data-dir ./tmp/yawnless-dev
pnpm yawnlessai issue list --data-dir ./tmp/yawnless-dev
```

## Context Profiles

Store local defaults in `~/.yawnless/context.json`:

```sh
pnpm yawnlessai context set --api-base http://localhost:3100 --company-id <company-id>
pnpm yawnlessai context show
pnpm yawnlessai context list
pnpm yawnlessai context use default
```

To avoid storing secrets in context, set `apiKeyEnvVarName` and keep the key in env:

```sh
pnpm yawnlessai context set --api-key-env-var-name YAWNLESS_API_KEY
export YAWNLESS_API_KEY=...
```

## Company Commands

```sh
pnpm yawnlessai company list
pnpm yawnlessai company get <company-id>
pnpm yawnlessai company delete <company-id-or-prefix> --yes --confirm <same-id-or-prefix>
```

Examples:

```sh
pnpm yawnlessai company delete PAP --yes --confirm PAP
pnpm yawnlessai company delete 5cbe79ee-acb3-4597-896e-7662742593cd --yes --confirm 5cbe79ee-acb3-4597-896e-7662742593cd
```

Notes:

- Deletion is server-gated by `YAWNLESS_ENABLE_COMPANY_DELETION`.
- With agent authentication, company deletion is company-scoped. Use the current company ID/prefix (for example via `--company-id` or `YAWNLESS_COMPANY_ID`), not another company.

## Issue Commands

```sh
pnpm yawnlessai issue list --company-id <company-id> [--status todo,in_progress] [--assignee-agent-id <agent-id>] [--match text]
pnpm yawnlessai issue get <issue-id-or-identifier>
pnpm yawnlessai issue create --company-id <company-id> --title "..." [--description "..."] [--status todo] [--priority high]
pnpm yawnlessai issue update <issue-id> [--status in_progress] [--comment "..."]
pnpm yawnlessai issue comment <issue-id> --body "..." [--reopen]
pnpm yawnlessai issue checkout <issue-id> --agent-id <agent-id> [--expected-statuses todo,backlog,blocked]
pnpm yawnlessai issue release <issue-id>
```

## Agent Commands

```sh
pnpm yawnlessai agent list --company-id <company-id>
pnpm yawnlessai agent get <agent-id>
pnpm yawnlessai agent local-cli <agent-id-or-shortname> --company-id <company-id>
```

`agent local-cli` is the quickest way to run local Claude/Codex manually as a Yawnless.ai agent:

- creates a new long-lived agent API key
- installs missing Yawnless.ai skills into `~/.codex/skills` and `~/.claude/skills`
- prints `export ...` lines for `YAWNLESS_API_URL`, `YAWNLESS_COMPANY_ID`, `YAWNLESS_AGENT_ID`, and `YAWNLESS_API_KEY`

Example for shortname-based local setup:

```sh
pnpm yawnlessai agent local-cli codexcoder --company-id <company-id>
pnpm yawnlessai agent local-cli claudecoder --company-id <company-id>
```

## Approval Commands

```sh
pnpm yawnlessai approval list --company-id <company-id> [--status pending]
pnpm yawnlessai approval get <approval-id>
pnpm yawnlessai approval create --company-id <company-id> --type hire_agent --payload '{"name":"..."}' [--issue-ids <id1,id2>]
pnpm yawnlessai approval approve <approval-id> [--decision-note "..."]
pnpm yawnlessai approval reject <approval-id> [--decision-note "..."]
pnpm yawnlessai approval request-revision <approval-id> [--decision-note "..."]
pnpm yawnlessai approval resubmit <approval-id> [--payload '{"...":"..."}']
pnpm yawnlessai approval comment <approval-id> --body "..."
```

## Activity Commands

```sh
pnpm yawnlessai activity list --company-id <company-id> [--agent-id <agent-id>] [--entity-type issue] [--entity-id <id>]
```

## Dashboard Commands

```sh
pnpm yawnlessai dashboard get --company-id <company-id>
```

## Heartbeat Command

`heartbeat run` now also supports context/api-key options and uses the shared client stack:

```sh
pnpm yawnlessai heartbeat run --agent-id <agent-id> [--api-base http://localhost:3100] [--api-key <token>]
```

## Local Storage Defaults

Default local instance root is `~/.yawnless/instances/default`:

- config: `~/.yawnless/instances/default/config.json`
- embedded db: `~/.yawnless/instances/default/db`
- logs: `~/.yawnless/instances/default/logs`
- storage: `~/.yawnless/instances/default/data/storage`
- secrets key: `~/.yawnless/instances/default/secrets/master.key`

Override base home or instance with env vars:

```sh
YAWNLESS_HOME=/custom/home YAWNLESS_INSTANCE_ID=dev pnpm yawnlessai run
```

## Storage Configuration

Configure storage provider and settings:

```sh
pnpm yawnlessai configure --section storage
```

Supported providers:

- `local_disk` (default; local single-user installs)
- `s3` (S3-compatible object storage)
