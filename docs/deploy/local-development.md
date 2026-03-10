---
title: Local Development
summary: Set up Yawnless.ai for local development
---

Run Yawnless.ai locally with zero external dependencies.

## Prerequisites

- Node.js 20+
- pnpm 9+

## Start Dev Server

```sh
pnpm install
pnpm dev
```

This starts:

- **API server** at `http://localhost:3100`
- **UI** served by the API server in dev middleware mode (same origin)

No Docker or external database required. Yawnless.ai uses embedded PostgreSQL automatically.

## One-Command Bootstrap

For a first-time install:

```sh
pnpm yawnlessai run
```

This does:

1. Auto-onboards if config is missing
2. Runs `yawnlessai doctor` with repair enabled
3. Starts the server when checks pass

## Tailscale/Private Auth Dev Mode

To run in `authenticated/private` mode for network access:

```sh
pnpm dev --tailscale-auth
```

This binds the server to `0.0.0.0` for private-network access.

Alias:

```sh
pnpm dev --authenticated-private
```

Allow additional private hostnames:

```sh
pnpm yawnlessai allowed-hostname dotta-macbook-pro
```

For full setup and troubleshooting, see [Tailscale Private Access](/deploy/tailscale-private-access).

## Health Checks

```sh
curl http://localhost:3100/api/health
# -> {"status":"ok"}

curl http://localhost:3100/api/companies
# -> []
```

## Reset Dev Data

To wipe local data and start fresh:

```sh
rm -rf ~/.yawnless/instances/default/db
pnpm dev
```

## Data Locations

| Data | Path |
|------|------|
| Config | `~/.yawnless/instances/default/config.json` |
| Database | `~/.yawnless/instances/default/db` |
| Storage | `~/.yawnless/instances/default/data/storage` |
| Secrets key | `~/.yawnless/instances/default/secrets/master.key` |
| Logs | `~/.yawnless/instances/default/logs` |

Override with environment variables:

```sh
YAWNLESS_HOME=/custom/path YAWNLESS_INSTANCE_ID=dev pnpm yawnlessai run
```
