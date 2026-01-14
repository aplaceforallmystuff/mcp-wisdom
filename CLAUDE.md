# CLAUDE.md - mcp-wisdom

Philosophy-grounded thinking frameworks for Claude - Stoic, Cognitive, Mindfulness, and Strategic wisdom tools.

## Tech Stack
- **Language:** TypeScript
- **Runtime:** Node.js (ES modules)
- **Protocol:** Model Context Protocol (MCP)

## Architecture
```
src/
├── index.ts          # Server entry, tool registration
└── tools/
    ├── stoic.ts      # Stoic philosophy tools
    ├── cognitive.ts  # Cognitive bias detection
    ├── mindful.ts    # Mindfulness frameworks
    └── strategic.ts  # Strategic thinking (Musashi, etc.)
```

## Development
```bash
npm run build    # Compile TypeScript
npm run watch    # Watch mode
```

## Constraints
```yaml
rules:
  - id: no-api-keys
    description: Pure reasoning tools - no external APIs
  - id: framework-fidelity
    description: Stay true to original philosophical frameworks
  - id: practical-application
    description: Focus on actionable insights, not academic theory
```
