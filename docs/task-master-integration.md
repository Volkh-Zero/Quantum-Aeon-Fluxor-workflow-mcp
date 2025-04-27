# Optional Integration with Task Master AI

This guide explains how to use AI Expert Workflow MCP alongside Task Master AI (optional).

> **Note**: Task Master integration is completely optional. AI Expert Workflow can be used on its own to generate comprehensive PRDs without Task Master.

## Configuration

To use both MCPs together, add both to your editor configuration:

```json
{
  "mcpServers": {
    "ai-expert-workflow": {
      "command": "npx",
      "args": ["-y", "ai-expert-workflow-mcp"],
      "env": {
        "OPENROUTER_API_KEY": "YOUR_OPENROUTER_API_KEY_HERE",
        "OPENROUTER_MODEL": "tngtech/deepseek-r1t-chimera:free",
        "MAX_TOKENS": 4000,
        "TEMPERATURE": 0.7
      }
    },
    "taskmaster-ai": {
      "command": "npx",
      "args": ["-y", "task-master-mcp"],
      "env": {
        "ANTHROPIC_API_KEY": "YOUR_ANTHROPIC_API_KEY_HERE",
        "PERPLEXITY_API_KEY": "YOUR_PERPLEXITY_API_KEY_HERE",
        "MODEL": "claude-3-sonnet-20240229",
        "PERPLEXITY_MODEL": "sonar-pro",
        "MAX_TOKENS": 64000,
        "TEMPERATURE": 0.2,
        "DEFAULT_SUBTASKS": 5,
        "DEFAULT_PRIORITY": "medium"
      }
    }
  }
}
```

### Model Options

**For AI Expert Workflow (using OpenRouter API):**
With OpenRouter API, you can choose from various AI models based on your needs:

- **High-performance models** for complex planning:
  - `openai/gpt-4o`
  - `anthropic/claude-3-opus-20240229`
  - `meta/llama-3-70b-instruct`

- **Balanced models** for everyday work:
  - `anthropic/claude-3-sonnet-20240229`
  - `mistral/mistral-large`
  - `google/gemini-pro`

- **Fast models** for quick iterations:
  - `openai/gpt-3.5-turbo`
  - `anthropic/claude-3-haiku-20240307`
  - `mistral/mistral-medium`

For the full list of available models, see [OpenRouter Models](https://openrouter.ai/models).

**For Task Master AI (using Anthropic API):**
Task Master AI currently supports Anthropic Claude models:
- `claude-3-opus-20240229`
- `claude-3-sonnet-20240229` (recommended)
- `claude-3-haiku-20240307`

Task Master AI also supports Perplexity API models (optional, for enhanced research):
- `sonar-small-online`
- `sonar-medium-online`
- `sonar-pro` (recommended)

## Workflow

### Step 1: Generate Your PRD with AI Expert Workflow (Required)

1. Use AI Expert Workflow to create your PRD:
   ```
   Can you consult with the AI Product Manager to create a PRD for my project?
   Can you generate a complete PRD document based on our consultation?
   ```

2. Review your PRD in `prd.md`

At this point, you have a complete PRD that you can use for your development planning. You can stop here if you don't need task management.

### Step 2: Use Task Master to Generate Tasks (Optional)

If you want to break down your PRD into development tasks:

1. Use Task Master to parse the PRD and generate tasks:
   ```
   Can you parse the PRD at prd.md and generate tasks?
   ```

2. Use Task Master to work on the generated tasks:
   ```
   What's the next task I should work on?
   Can you help me implement task 3?
   ```

## Full Workflow Example

### Required: Generate Your PRD

#### 1. Start with the Product Manager

User: "Can you consult with the AI Product Manager to create a PRD for my project? I want to build a task management app for developers."

AI Expert Workflow: [Provides detailed questions and guidance about the product]

User: [Provides more details about the product]

AI Expert Workflow: [Offers more specific guidance and recommendations]

#### 2. Generate the PRD Document

User: "Can you generate a complete PRD document based on our consultation?"

AI Expert Workflow: [Generates a comprehensive PRD and saves it to prd.md]

**At this point, you have a complete PRD that you can use for your development planning.**

### Optional: Use Task Master for Task Management

If you want to break down your PRD into development tasks:

#### 3. Generate Tasks with Task Master (Optional)

User: "Can you parse the PRD at prd.md and generate tasks?"

Task Master: [Analyzes the PRD and creates tasks]

#### 4. Work on Tasks with Task Master (Optional)

User: "What's the next task I should work on?"

Task Master: [Recommends the next task based on priority]

User: "Can you help me implement task 3?"

Task Master: [Provides guidance on implementing the specific task]

## Tips for Efficient Workflow

### For Standalone PRD Generation

1. **Complete the consultation process** before generating documents
2. **Review generated PRDs** carefully before using them for development planning
3. **Save your PRDs** in a version control system for future reference
4. **Iterate as needed** with the AI Product Manager to refine your PRD

### For Optional Task Master Integration

1. **Review generated documents** before using them with Task Master
2. **Be specific about file paths** when asking Task Master to parse documents
3. **Use Task Master's task tracking** to manage your implementation progress
4. **Remember that Task Master is optional** - you can use AI Expert Workflow on its own