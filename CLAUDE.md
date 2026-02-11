# CLAUDE.md - mcp-wisdom

MCP server providing philosophy-grounded thinking frameworks (Stoic, Cognitive, Mindfulness, Strategic).

## Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js (ES modules)
- **Protocol:** Model Context Protocol (MCP)
- **Build:** TypeScript compiler (tsc)

## Architecture

```
src/
  index.ts          # Server, tool definitions, response formatter functions
  frameworks.ts     # Quote collections, bias definitions, getRandomQuote()
```

## Development Commands

```bash
npm run build       # tsc
npm run dev         # tsc && node dist/index.js
npm start           # node dist/index.js
```

## Environment Variables

None required. No external APIs or configuration needed.

## Tools (9)

**Stoic:** `wisdom_stoic_dichotomy`, `wisdom_stoic_premeditation`, `wisdom_stoic_memento_mori`
**Cognitive:** `wisdom_cognitive_bias_scan`
**Mindfulness:** `wisdom_mindful_pause`
**Strategic:** `wisdom_strategic_timing`, `wisdom_strategic_five_rings`
**Meta:** `wisdom_clarify` (Socratic questioning), `wisdom_ground` (framework recommender)

## Key Patterns

- Uses `Server` class from MCP SDK (low-level API with `setRequestHandler`)
- Each tool has a dedicated `format*Response()` function returning structured markdown
- Quotes imported from `frameworks.ts` with `getRandomQuote()` for variety
- `biasDefinitions` object with judgment, decision, and social bias categories
- Purely local tools (no API calls) returning structured markdown frameworks

## Constraints

- No external APIs; all wisdom content and quotes are embedded in source files
