# mcp-wisdom

[![npm version](https://img.shields.io/npm/v/mcp-wisdom.svg)](https://www.npmjs.com/package/mcp-wisdom)
[![CI](https://github.com/aplaceforallmystuff/mcp-wisdom/actions/workflows/ci.yml/badge.svg)](https://github.com/aplaceforallmystuff/mcp-wisdom/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MCP](https://img.shields.io/badge/MCP-Compatible-blue)](https://modelcontextprotocol.io)

Philosophy-grounded thinking frameworks for Claude - an MCP server providing Stoic, Cognitive, Mindfulness, and Strategic wisdom tools.

> *"Think better with 2,500 years of tested frameworks"*

## Overview

mcp-wisdom provides 9 philosophical thinking tools that Claude can use to help with decisions, anxiety, biases, timing, and perspective. Each tool draws from specific philosophical traditions with embedded wisdom quotes.

## Installation

```bash
npm install -g mcp-wisdom
```

Or run directly with npx:
```bash
npx mcp-wisdom
```

## Configuration

### Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "wisdom": {
      "command": "npx",
      "args": ["-y", "mcp-wisdom"]
    }
  }
}
```

### Claude Code

```bash
claude mcp add wisdom -- npx -y mcp-wisdom
```

## Available Tools

### Stoic Framework

| Tool | Purpose | Use When |
|------|---------|----------|
| `wisdom_stoic_dichotomy` | Separate controllable from uncontrollable | Anxious about outcomes |
| `wisdom_stoic_premeditation` | Visualize worst case scenarios | Worried about failure |
| `wisdom_stoic_memento_mori` | Mortality perspective | Need clarity on priorities |

### Cognitive Framework

| Tool | Purpose | Use When |
|------|---------|----------|
| `wisdom_cognitive_bias_scan` | Detect thinking errors | Making important decisions |

### Mindfulness Framework

| Tool | Purpose | Use When |
|------|---------|----------|
| `wisdom_mindful_pause` | Create space before reacting | Feeling rushed or reactive |

### Strategic Framework

| Tool | Purpose | Use When |
|------|---------|----------|
| `wisdom_strategic_timing` | Assess readiness for action | Deciding when to act |
| `wisdom_strategic_five_rings` | Analyze through five elements | Facing complex challenges |

### Meta Tools

| Tool | Purpose | Use When |
|------|---------|----------|
| `wisdom_clarify` | Socratic questioning | Thinking feels unclear |
| `wisdom_ground` | Recommend best framework | Unsure which tool to use |

## Quick Reference

| Situation | Tool |
|-----------|------|
| "I'm anxious about the outcome" | `wisdom_stoic_dichotomy` |
| "What if this fails?" | `wisdom_stoic_premeditation` |
| "Does this really matter?" | `wisdom_stoic_memento_mori` |
| "Am I thinking clearly?" | `wisdom_cognitive_bias_scan` |
| "I need to slow down" | `wisdom_mindful_pause` |
| "Is now the right time?" | `wisdom_strategic_timing` |
| "This is complex" | `wisdom_strategic_five_rings` |
| "What do I actually mean?" | `wisdom_clarify` |
| "Which framework should I use?" | `wisdom_ground` |

## Sources

Tools draw from these philosophical traditions:

- **Stoicism:** Epictetus, Marcus Aurelius, Seneca
- **Cognitive Science:** Daniel Kahneman, Amos Tversky
- **Mindfulness:** Thich Nhat Hanh, Viktor Frankl
- **Strategic:** Miyamoto Musashi (Book of Five Rings)
- **Socratic:** Socrates, Plato

## Example Usage

Ask Claude:
- "Use the dichotomy of control to help me with my job interview anxiety"
- "Scan my reasoning about this investment for cognitive biases"
- "Help me decide if now is the right time to launch this product"
- "I need perspective on whether to take this job offer"

Claude will use the appropriate wisdom tool to provide structured philosophical guidance.

## Related

- [wisdom-pack](https://github.com/aplaceforallmystuff/wisdom-pack) - Slash command version for Claude Code

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this project.

## Links

- [npm package](https://www.npmjs.com/package/mcp-wisdom)
- [GitHub repository](https://github.com/aplaceforallmystuff/mcp-wisdom)
- [Report issues](https://github.com/aplaceforallmystuff/mcp-wisdom/issues)

## License

MIT
