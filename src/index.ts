#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import {
  stoicQuotes,
  cognitiveQuotes,
  mindfulQuotes,
  strategicQuotes,
  socraticQuotes,
  biasDefinitions,
  getRandomQuote,
} from "./frameworks.js";

const server = new Server(
  {
    name: "mcp-wisdom",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define all wisdom tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "wisdom_stoic_dichotomy",
        description:
          "Apply Epictetus's dichotomy of control to separate what's in your power from what isn't. Use when feeling anxious about outcomes or uncertain what to focus on.",
        inputSchema: {
          type: "object" as const,
          properties: {
            situation: {
              type: "string",
              description: "The situation, decision, or concern to analyze",
            },
          },
          required: ["situation"],
        },
      },
      {
        name: "wisdom_stoic_premeditation",
        description:
          "Practice premeditatio malorum - visualize worst case scenarios to reduce fear and prepare mentally. Use when worried about potential failures.",
        inputSchema: {
          type: "object" as const,
          properties: {
            fear: {
              type: "string",
              description: "What you're worried might happen or go wrong",
            },
          },
          required: ["fear"],
        },
      },
      {
        name: "wisdom_stoic_memento_mori",
        description:
          "Apply memento mori - use mortality awareness to gain perspective and clarify priorities. Use when needing perspective on what truly matters.",
        inputSchema: {
          type: "object" as const,
          properties: {
            situation: {
              type: "string",
              description: "The decision or concern to view through mortality lens",
            },
          },
          required: ["situation"],
        },
      },
      {
        name: "wisdom_cognitive_bias_scan",
        description:
          "Scan reasoning or decisions for cognitive biases using Kahneman's System 1/2 framework. Use before making important decisions.",
        inputSchema: {
          type: "object" as const,
          properties: {
            reasoning: {
              type: "string",
              description: "The reasoning, decision, or belief to check for biases",
            },
          },
          required: ["reasoning"],
        },
      },
      {
        name: "wisdom_mindful_pause",
        description:
          "Create space between stimulus and response using the STOP practice. Use when feeling reactive or rushed.",
        inputSchema: {
          type: "object" as const,
          properties: {
            situation: {
              type: "string",
              description: "What's prompting the need for pause",
            },
          },
          required: ["situation"],
        },
      },
      {
        name: "wisdom_strategic_timing",
        description:
          "Assess whether now is the right time for action using Musashi's timing principles. Use when deciding whether to act now or wait.",
        inputSchema: {
          type: "object" as const,
          properties: {
            action: {
              type: "string",
              description: "The action or decision you're considering timing",
            },
          },
          required: ["action"],
        },
      },
      {
        name: "wisdom_strategic_five_rings",
        description:
          "Apply Musashi's Five Rings framework (Earth, Water, Fire, Wind, Void) to analyze a strategic situation. Use for complex challenges.",
        inputSchema: {
          type: "object" as const,
          properties: {
            challenge: {
              type: "string",
              description: "The challenge or endeavor to analyze strategically",
            },
          },
          required: ["challenge"],
        },
      },
      {
        name: "wisdom_clarify",
        description:
          "Apply Socratic questioning to clarify terms, examine assumptions, and reach better understanding. Use when thinking feels unclear.",
        inputSchema: {
          type: "object" as const,
          properties: {
            statement: {
              type: "string",
              description: "The belief, position, or concept to examine",
            },
          },
          required: ["statement"],
        },
      },
      {
        name: "wisdom_ground",
        description:
          "Analyze a situation and recommend which philosophical framework(s) would be most helpful. Use when unsure which wisdom tool to apply.",
        inputSchema: {
          type: "object" as const,
          properties: {
            situation: {
              type: "string",
              description: "The situation, decision, or concern to analyze",
            },
          },
          required: ["situation"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "wisdom_stoic_dichotomy": {
      const situation = (args as { situation: string }).situation;
      return {
        content: [
          {
            type: "text" as const,
            text: formatDichotomyResponse(situation),
          },
        ],
      };
    }

    case "wisdom_stoic_premeditation": {
      const fear = (args as { fear: string }).fear;
      return {
        content: [
          {
            type: "text" as const,
            text: formatPremeditationResponse(fear),
          },
        ],
      };
    }

    case "wisdom_stoic_memento_mori": {
      const situation = (args as { situation: string }).situation;
      return {
        content: [
          {
            type: "text" as const,
            text: formatMementoMoriResponse(situation),
          },
        ],
      };
    }

    case "wisdom_cognitive_bias_scan": {
      const reasoning = (args as { reasoning: string }).reasoning;
      return {
        content: [
          {
            type: "text" as const,
            text: formatBiasScanResponse(reasoning),
          },
        ],
      };
    }

    case "wisdom_mindful_pause": {
      const situation = (args as { situation: string }).situation;
      return {
        content: [
          {
            type: "text" as const,
            text: formatMindfulPauseResponse(situation),
          },
        ],
      };
    }

    case "wisdom_strategic_timing": {
      const action = (args as { action: string }).action;
      return {
        content: [
          {
            type: "text" as const,
            text: formatTimingResponse(action),
          },
        ],
      };
    }

    case "wisdom_strategic_five_rings": {
      const challenge = (args as { challenge: string }).challenge;
      return {
        content: [
          {
            type: "text" as const,
            text: formatFiveRingsResponse(challenge),
          },
        ],
      };
    }

    case "wisdom_clarify": {
      const statement = (args as { statement: string }).statement;
      return {
        content: [
          {
            type: "text" as const,
            text: formatClarifyResponse(statement),
          },
        ],
      };
    }

    case "wisdom_ground": {
      const situation = (args as { situation: string }).situation;
      return {
        content: [
          {
            type: "text" as const,
            text: formatGroundResponse(situation),
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Response formatters

function formatDichotomyResponse(situation: string): string {
  return `# Dichotomy of Control Analysis

**Situation:** ${situation}

## The Stoic Framework

Epictetus taught that we must distinguish between what is "up to us" (ἐφ' ἡμῖν) and what is "not up to us" (οὐκ ἐφ' ἡμῖν).

### Within Your Control (ἐφ' ἡμῖν)
Things that are **entirely up to you**:
- Your judgments and interpretations of this situation
- Your intentions and motivations
- Your choices and actions in response
- Your effort and attention
- Your values and how you embody them

### Outside Your Control (οὐκ ἐφ' ἡμῖν)
Things that are **not up to you**:
- Other people's opinions, decisions, and reactions
- External outcomes and results
- The past and what has already happened
- Others' emotions and behaviors
- Your reputation and how others perceive you

## Guiding Questions
1. What aspects of this situation are truly up to you?
2. What are you trying to control that isn't yours to control?
3. If the outcome doesn't go your way, what would you still control?
4. What would a person of virtue do regardless of the outcome?

## From the Tradition
${getRandomQuote(stoicQuotes.dichotomy)}

## Next Step
Focus your energy exclusively on what's within your control. Accept what isn't with equanimity.`;
}

function formatPremeditationResponse(fear: string): string {
  return `# Premeditatio Malorum (Negative Visualization)

**The Fear:** ${fear}

## The Stoic Practice

The Stoics practiced deliberately imagining worst-case scenarios—not to create anxiety, but to:
1. Reduce the shock of adversity (you've already "experienced" it mentally)
2. Reveal that most feared outcomes are survivable
3. Increase gratitude for what you currently have
4. Prepare practical contingency plans

## Visualization Exercise

### Imagine the Worst Case Fully
- What exactly would happen in the first hour? Day? Week?
- What would you lose?
- How would you feel?
- Who would be affected?

### Assess Survivability
- Have others survived similar situations?
- What would still remain even in the worst case?
- What resources, skills, relationships would persist?
- What historical examples show recovery from this?

### Prepare Practically
- What concrete steps could mitigate this risk?
- What contingency plans make sense?
- What early warning signs should you watch for?

## Guiding Questions
1. If this happened, what would you do next?
2. What's the difference between this fear and reality?
3. What preparation would help you face this with equanimity?

## From the Tradition
${getRandomQuote(stoicQuotes.premeditation)}

## The Stoic Reframe
Having faced the worst in your mind, you can now act with clarity rather than fear. The goal is not to dwell in negativity, but to take away the power of the unknown.`;
}

function formatMementoMoriResponse(situation: string): string {
  return `# Memento Mori (Remember Death)

**Situation:** ${situation}

## The Practice

"Memento mori" is not morbid pessimism but a tool for living fully. The Stoics practiced daily reflection on mortality to:
- Clarify what truly matters
- Reduce attachment to trivial concerns
- Motivate action on what's important
- Cultivate gratitude for the present

## The Mortality Lens

### If you had limited time remaining:
- Would this situation still matter?
- What would rise in importance?
- What would fall away as trivial?
- What would you wish you had done differently?

### Questions from the Deathbed
- Will you regret this decision either way?
- What would you wish you had spent more time on?
- What would you wish you had spent less time on?
- What conversation should you have that you've been avoiding?

## Gratitude Check
What do you have NOW that deserves appreciation?
- What ordinary things would become precious with limited time?
- Who in your life would you want more time with?
- What experiences are you taking for granted?

## From the Tradition
${getRandomQuote(stoicQuotes.mementoMori)}

## Action Clarity
- **START:** What should you begin or prioritize?
- **STOP:** What should you release or deprioritize?
- **DON'T POSTPONE:** What should you do now, not later?`;
}

function formatBiasScanResponse(reasoning: string): string {
  const judgmentBiases = biasDefinitions.judgment
    .map((b) => `- **${b.name}**: ${b.description}`)
    .join("\n");
  const decisionBiases = biasDefinitions.decision
    .map((b) => `- **${b.name}**: ${b.description}`)
    .join("\n");
  const socialBiases = biasDefinitions.social
    .map((b) => `- **${b.name}**: ${b.description}`)
    .join("\n");

  return `# Cognitive Bias Scan

**Reasoning to Examine:** ${reasoning}

## The Framework

Daniel Kahneman's research reveals two thinking systems:
- **System 1 (Fast):** Automatic, intuitive, effortless—but prone to biases
- **System 2 (Slow):** Deliberate, analytical, effortful—but lazy and often defers to System 1

Most biases occur when System 1 makes quick judgments that System 2 fails to check.

## Biases to Check

### Judgment Biases
${judgmentBiases}

### Decision Biases
${decisionBiases}

### Social Biases
${socialBiases}

## Debiasing Questions

For each potential bias, ask:
- **Confirmation bias:** What would convince you you're wrong?
- **Availability:** Is this common, or just memorable?
- **Anchoring:** What would you think without that first number/impression?
- **Sunk cost:** If you hadn't already invested, would you start now?
- **Loss aversion:** Are you overweighting potential losses?
- **Overconfidence:** What's your track record on similar predictions?

## System 2 Engagement Techniques

To engage deliberate thinking:
1. Write out the reasoning explicitly
2. Consider the opposite conclusion
3. Look up base rates for this type of situation
4. Seek an outside view from someone uninvolved

## From the Research
${getRandomQuote(cognitiveQuotes.bias)}

## Key Question
"How would I know if I were wrong about this?"`;
}

function formatMindfulPauseResponse(situation: string): string {
  return `# Mindful Pause (STOP Practice)

**Situation:** ${situation}

## The Practice

Between stimulus and response lies a space—and in that space lies freedom. The STOP practice creates that space.

## S.T.O.P.

### S — Stop
Literally stop what you're doing. Pause all action. You don't need to respond immediately.

### T — Take a Breath
One conscious breath. Feel the inhale... notice the pause... feel the exhale.

This single breath shifts you from reactive to responsive.

### O — Observe
What's happening right now?

**In your body:**
- Where is there tension?
- What's your heart rate, breathing pattern?
- What physical sensations are present?

**In your mind:**
- What thoughts are racing?
- What story are you telling yourself?
- What judgments are arising?

**In your emotions:**
- What feelings are here? (fear, anger, excitement, anxiety?)
- Where do you feel them in your body?
- Are they proportionate to the situation?

**In the situation:**
- What's actually happening vs. your interpretation?
- What facts do you know for certain?

### P — Proceed
Now, with awareness, choose your response rather than reacting automatically.

## Questioning Urgency
- What's the ACTUAL deadline here?
- What happens if you wait an hour? A day?
- Whose urgency is this—yours or someone else's?
- Is this truly urgent, or just uncomfortable?

## Creating Space
You can say:
- "Let me get back to you on that."
- "I need to think about this."
- "I want to give this proper consideration."

## From the Tradition
${getRandomQuote(mindfulQuotes.pause)}

## Remember
The pause is not avoidance—it's the space where wisdom enters.`;
}

function formatTimingResponse(action: string): string {
  return `# Strategic Timing Assessment

**Action Being Considered:** ${action}

## Musashi's Timing Principles

"There is timing in everything. Timing in strategy cannot be mastered without a great deal of practice."

Timing (拍子, hyōshi) is not just "when" but the rhythm and flow of engagement.

## Timing Assessment

### Background Timing (Environment)
Consider the broader conditions:
- What's the current season/cycle for this domain?
- What trends are in motion?
- What external conditions favor or hinder this action?
- Is the tide coming in or going out?

### Foreground Timing (Immediate Situation)
Consider the specific moment:
- Is there a window of opportunity?
- Is the situation ripe or still developing?
- What must happen before this action makes sense?
- What signals indicate the moment is right?

### Personal Timing (Your Readiness)
Consider your own state:
- Are you prepared—skills, resources, energy?
- Is your mind clear or clouded?
- Are you acting from strength or desperation?
- Do you have reserves if this takes longer than expected?

### Rhythm Assessment
- What's the natural pace of this domain?
- Are you trying to force a faster rhythm than natural?
- What would "flowing with" rather than "pushing against" look like?

## Timing Verdicts

- **NOW:** Conditions align—act decisively
- **SOON:** Prepare and watch for the moment
- **WAIT:** Conditions not yet ripe—continue preparing
- **RECONSIDER:** The timing may never be right—question the action itself

## From the Tradition
${getRandomQuote(strategicQuotes.timing)}

## Key Question
"Am I acting because the time is right, or because I'm impatient?"`;
}

function formatFiveRingsResponse(challenge: string): string {
  return `# The Five Rings Analysis

**Challenge:** ${challenge}

## Musashi's Framework

Miyamoto Musashi's Book of Five Rings presents strategy through five elements, each representing a different aspect of mastery.

---

## 🜃 EARTH (Chi) — Foundation

**The Principle:** Build on solid ground. Master basics before complexity.

**Questions to Consider:**
- What are the basic requirements for success here?
- Is your foundation solid?
- What fundamentals are you neglecting?
- Have you mastered the basics before attempting the advanced?

**Assessment:** Is your groundwork complete?

---

## 💧 WATER (Sui) — Adaptability

**The Principle:** Adapt your shape to the situation. Be formless yet powerful.

**Questions to Consider:**
- Are you rigid in your approach?
- Can you adapt to changing conditions?
- What would it look like to "be like water"?
- Are you forcing or flowing?

**Assessment:** How flexible is your approach?

---

## 🔥 FIRE (Ka) — Decisive Action

**The Principle:** When the moment comes, act with total commitment.

**Questions to Consider:**
- When is aggressive, decisive action needed?
- Are you being too passive?
- What would bold action look like here?
- Is hesitation costing you?

**Assessment:** Are you acting with sufficient fire?

---

## 🌬️ WIND (Fū) — External Awareness

**The Principle:** Know others' ways to transcend them.

**Questions to Consider:**
- Do you understand your opponent/competition/obstacle?
- What are others' strategies in this domain?
- What do others know that you don't?
- Are you too inwardly focused?

**Assessment:** How well do you understand the external landscape?

---

## ☯️ VOID (Kū) — Transcendence

**The Principle:** True mastery transcends technique. Act from emptiness.

**Questions to Consider:**
- Can you let go of fixed strategies?
- What does your intuition say when you quiet the mind?
- Where is your ego getting in the way?
- What would acting from "no-mind" look like?

**Assessment:** Can you transcend your attachment to specific outcomes?

---

## From the Tradition
${getRandomQuote(strategicQuotes.fiveRings)}

## Strategic Synthesis
Which ring needs the most attention? Start there.`;
}

function formatClarifyResponse(statement: string): string {
  return `# Socratic Clarification

**Statement to Examine:** ${statement}

## The Socratic Method

Socrates claimed to know nothing, instead asking questions that revealed contradictions in others' beliefs. The goal isn't to win arguments but to reach clearer understanding.

## Types of Socratic Questions

### Clarifying Questions
- What do you mean by the key terms here?
- Can you give a specific example?
- Can you put that another way?

### Probing Assumptions
- What are you assuming here?
- Why do you think that's true?
- What would happen if that assumption were false?

### Probing Evidence
- What led you to that conclusion?
- How do you know this?
- What evidence supports this?
- Are there reasons to doubt this evidence?

### Examining Viewpoints
- What would someone who disagrees say?
- What's the strongest opposing argument?
- What are you not seeing?

### Probing Implications
- What follows from that?
- If that's true, what else must be true?
- What are the consequences of believing this?

### Questions About Questions
- Why is this question important?
- What question should we really be asking?
- Is this the right way to frame the problem?

## Key Terms to Define
What words in your statement need clearer definition?

## Hidden Assumptions
What unstated beliefs underlie this position?

## From the Tradition
${getRandomQuote(socraticQuotes.clarify)}

## The Core Question
"What would change your mind about this?"`;
}

function formatGroundResponse(situation: string): string {
  return `# Grounding in Philosophy

**Situation:** ${situation}

## Framework Selection Guide

Based on your situation, consider which tradition(s) might be most helpful:

### Use STOICISM when:
- Dealing with things outside your control
- Facing anxiety about outcomes
- Needing emotional resilience
- **Tools:** \`wisdom_stoic_dichotomy\`, \`wisdom_stoic_premeditation\`, \`wisdom_stoic_memento_mori\`

### Use COGNITIVE SCIENCE when:
- Making important decisions under uncertainty
- Suspecting your thinking might be biased
- Needing to slow down reactive thinking
- **Tool:** \`wisdom_cognitive_bias_scan\`

### Use MINDFULNESS when:
- Feeling overwhelmed or scattered
- Needing to be present before deciding
- Dealing with emotional reactivity
- **Tool:** \`wisdom_mindful_pause\`

### Use STRATEGIC THINKING when:
- Planning competitive moves
- Timing important actions
- Facing complex challenges
- **Tools:** \`wisdom_strategic_timing\`, \`wisdom_strategic_five_rings\`

### Use SOCRATIC METHOD when:
- Terms are unclear
- Assumptions need examination
- Beliefs feel unexamined
- **Tool:** \`wisdom_clarify\`

## Quick Recommendation

For most situations, a good sequence is:
1. **Clarify** — Make sure you understand what you're actually facing
2. **Bias scan** — Check your thinking for errors
3. **Dichotomy** — Focus on what's actually in your control
4. **Timing** — Assess whether now is the right time to act

## From Multiple Traditions

**Stoic:** "You have power over your mind—not outside events."
**Cognitive:** "Nothing is as important as you think it is when you're thinking about it."
**Mindful:** "Between stimulus and response there is a space."
**Strategic:** "There is timing in everything."

## Which resonates most with your current situation?`;
}

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("mcp-wisdom server started");
}

main().catch(console.error);
