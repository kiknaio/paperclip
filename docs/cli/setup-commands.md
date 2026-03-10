---
title: Setup Commands
summary: Onboard, run, doctor, and configure
---

Instance setup and diagnostics commands.

## `yawnlessai run`

One-command bootstrap and start:

```sh
pnpm yawnlessai run
```

Does:

1. Auto-onboards if config is missing
2. Runs `yawnlessai doctor` with repair enabled
3. Starts the server when checks pass

Choose a specific instance:

```sh
pnpm yawnlessai run --instance dev
```

## `yawnlessai onboard`

Interactive first-time setup:

```sh
pnpm yawnlessai onboard
```

First prompt:

1. `Quickstart` (recommended): local defaults (embedded database, no LLM provider, local disk storage, default secrets)
2. `Advanced setup`: full interactive configuration

Start immediately after onboarding:

```sh
pnpm yawnlessai onboard --run
```

Non-interactive defaults + immediate start (opens browser on server listen):

```sh
pnpm yawnlessai onboard --yes
```

## `yawnlessai doctor`

Health checks with optional auto-repair:

```sh
pnpm yawnlessai doctor
pnpm yawnlessai doctor --repair
```

Validates:

- Server configuration
- Database connectivity
- Secrets adapter configuration
- Storage configuration
- Missing key files

## `yawnlessai configure`

Update configuration sections:

```sh
pnpm yawnlessai configure --section server
pnpm yawnlessai configure --section secrets
pnpm yawnlessai configure --section storage
```

## `yawnlessai env`

Show resolved environment configuration:

```sh
pnpm yawnlessai env
```

## `yawnlessai allowed-hostname`

Allow a private hostname for authenticated/private mode:

```sh
pnpm yawnlessai allowed-hostname my-tailscale-host
```

## Local Storage Paths

| Data | Default Path |
|------|-------------|
| Config | `~/.yawnless/instances/default/config.json` |
| Database | `~/.yawnless/instances/default/db` |
| Logs | `~/.yawnless/instances/default/logs` |
| Storage | `~/.yawnless/instances/default/data/storage` |
| Secrets key | `~/.yawnless/instances/default/secrets/master.key` |

Override with:

```sh
YAWNLESS_HOME=/custom/home YAWNLESS_INSTANCE_ID=dev pnpm yawnlessai run
```

Or pass `--data-dir` directly on any command:

```sh
pnpm yawnlessai run --data-dir ./tmp/yawnless-dev
pnpm yawnlessai doctor --data-dir ./tmp/yawnless-dev
```
