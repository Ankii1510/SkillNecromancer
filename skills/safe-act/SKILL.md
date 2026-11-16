---
name: SafeAct
description: Cite-before-act gate for agent tool calls — require human approval before mutate or destructive operations.
version: 1.0.0
category: safe-act
risk: destructive
triggers: approve, cite, tool-call, mutate, delete, shell
tools: queue_action, cite_source, approve_action, deny_action, audit_log
---

## Purpose

Wrap agent tool use so state-changing operations never run without an explicit human decision and a citation of why the tool was requested.

## Workflow

1. Intercept a proposed tool call.
2. Attach a citation (skill rule, user ask, or spec clause).
3. Queue the action as pending.
4. On approve, record audit and mark executable.
5. On deny, record reason and block execution.

## Guardrails

- Read-only tools may auto-pass when risk is `read`.
- Mutate and destructive tools always require approval.
- Never execute without an audit entry.
