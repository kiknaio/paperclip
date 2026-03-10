---
title: Environment Variables
summary: Full environment variable reference
---

All environment variables that Yawnless.ai uses for server configuration.

## Server Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3100` | Server port |
| `HOST` | `127.0.0.1` | Server host binding |
| `DATABASE_URL` | (embedded) | PostgreSQL connection string |
| `YAWNLESS_HOME` | `~/.yawnless` | Base directory for all Yawnless.ai data |
| `YAWNLESS_INSTANCE_ID` | `default` | Instance identifier (for multiple local instances) |
| `YAWNLESS_DEPLOYMENT_MODE` | `local_trusted` | Runtime mode override |

## Secrets

| Variable | Default | Description |
|----------|---------|-------------|
| `YAWNLESS_SECRETS_MASTER_KEY` | (from file) | 32-byte encryption key (base64/hex/raw) |
| `YAWNLESS_SECRETS_MASTER_KEY_FILE` | `~/.yawnless/.../secrets/master.key` | Path to key file |
| `YAWNLESS_SECRETS_STRICT_MODE` | `false` | Require secret refs for sensitive env vars |

## Agent Runtime (Injected into agent processes)

These are set automatically by the server when invoking agents:

| Variable | Description |
|----------|-------------|
| `YAWNLESS_AGENT_ID` | Agent's unique ID |
| `YAWNLESS_COMPANY_ID` | Company ID |
| `YAWNLESS_API_URL` | Yawnless.ai API base URL |
| `YAWNLESS_API_KEY` | Short-lived JWT for API auth |
| `YAWNLESS_RUN_ID` | Current heartbeat run ID |
| `YAWNLESS_TASK_ID` | Issue that triggered this wake |
| `YAWNLESS_WAKE_REASON` | Wake trigger reason |
| `YAWNLESS_WAKE_COMMENT_ID` | Comment that triggered this wake |
| `YAWNLESS_APPROVAL_ID` | Resolved approval ID |
| `YAWNLESS_APPROVAL_STATUS` | Approval decision |
| `YAWNLESS_LINKED_ISSUE_IDS` | Comma-separated linked issue IDs |

## LLM Provider Keys (for adapters)

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Anthropic API key (for Claude Local adapter) |
| `OPENAI_API_KEY` | OpenAI API key (for Codex Local adapter) |
