# Integrating with Task Master AI

This guide explains how to use AI Expert Workflow MCP alongside Task Master AI.

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
        "MODEL": "anthropic/claude-3-sonnet-20240229"
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

1. Use AI Expert Workflow to create your PRD:
   ```
   Can you consult with the AI Product Manager to create a PRD for my project?
   Can you generate a complete PRD document based on our consultation?
   ```

2. Use Task Master to parse the PRD and generate tasks:
   ```
   Can you parse the PRD at prd.md and generate tasks?
   ```

3. Use Task Master to work on the generated tasks:
   ```
   What's the next task I should work on?
   Can you help me implement task 3?
   ```

## Full Workflow Example

### 1. Start with the Product Manager

User: "Can you consult with the AI Product Manager to create a PRD for my project? I want to build a task management app for developers."

AI Expert Workflow: [Provides detailed questions and guidance about the product]

User: [Provides more details about the product]

AI Expert Workflow: [Offers more specific guidance and recommendations]

### 2. Generate the PRD Document

User: "Can you generate a complete PRD document based on our consultation?"

AI Expert Workflow: [Generates a comprehensive PRD and saves it to prd.md]

### 3. Generate Tasks with Task Master

User: "Can you parse the PRD at prd.md and generate tasks?"

Task Master: [Analyzes the PRD and creates tasks]

### 4. Work on Tasks with Task Master

User: "What's the next task I should work on?"

Task Master: [Recommends the next task based on priority]

User: "Can you help me implement task 3?"

Task Master: [Provides guidance on implementing the specific task]

## Tips for Efficient Integration

1. **Complete the consultation process** before generating documents
2. **Review generated documents** before using them with Task Master
3. **Be specific about file paths** when asking Task Master to parse documents
4. **Use Task Master's task tracking** to manage your implementation progress
5. **Iterate as needed** between experts as your project evolves 