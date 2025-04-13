# AI Expert Workflow MCP

[![npm version](https://badge.fury.io/js/ai-expert-workflow-mcp.svg)](https://badge.fury.io/js/ai-expert-workflow-mcp)

An MCP server that implements the AI Expert Workflow for integration with Task Master, using OpenRouter API for AI capabilities.

## 🚀 Quick Start for End Users

If you just want to use the AI Expert Workflow MCP with Task Master, follow these steps:

### Setup

1. Install both MCPs globally:
   ```bash
   npm install -g ai-expert-workflow-mcp task-master-mcp
   ```

2. Get the required API keys:
   - **OpenRouter API key** for AI Expert Workflow: [Get one here](https://openrouter.ai/keys)
   - **Anthropic API key** for Task Master: [Get one here](https://console.anthropic.com/)

3. Configure your Cursor settings with both MCPs:
   ```json
   {
     "mcpServers": {
       "ai-expert-workflow": {
         "command": "npx",
         "args": ["-y", "ai-expert-workflow-mcp"],
         "env": {
           "OPENROUTER_API_KEY": "YOUR_OPENROUTER_API_KEY_HERE",
           "MODEL": "anthropic/claude-3-sonnet-20240229",
           "MAX_TOKENS": 8000,
           "TEMPERATURE": 0.7
         }
       },
       "taskmaster-ai": {
         "command": "npx",
         "args": ["-y", "task-master-mcp"],
         "env": {
           "ANTHROPIC_API_KEY": "YOUR_ANTHROPIC_API_KEY_HERE",
           "MODEL": "claude-3-sonnet-20240229"
         }
       }
     }
   }
   ```

   Note on models: With OpenRouter, you can choose from many AI models beyond Claude:
   - For creative tasks: `openai/gpt-4o`, `anthropic/claude-3-opus-20240229`
   - For balanced performance: `anthropic/claude-3-sonnet-20240229`, `mistral/mistral-large`
   - For faster, cost-effective options: `openai/gpt-3.5-turbo`, `anthropic/claude-3-haiku-20240307`
   - Other options: `google/gemini-pro`, `meta/llama-3-70b`, `cohere/command-r`

   See the [complete list of OpenRouter models](https://openrouter.ai/models) for all available options.

3. Enable the MCPs in your Cursor settings.

### Complete Workflow Example

#### Option 1: Fully Automated Workflow (Recommended)
```bash
# Install the necessary packages globally
npm install -g ai-expert-workflow-mcp task-master-mcp

# Make sure to set your API keys in your environment or .env file:
# OPENROUTER_API_KEY=your_openrouter_key_here  (for AI Expert Workflow)
# ANTHROPIC_API_KEY=your_anthropic_key_here    (for Task Master)

# Generate PRD and automatically parse it into tasks with one command
# You can specify a different model with the MODEL environment variable
MODEL=openai/gpt-4o npx ai-expert-workflow-generate "I want to build a recipe app that helps users find recipes based on ingredients they already have at home. Target users are home cooks who want to reduce food waste and save money."
```

This single command will:
1. Generate a comprehensive PRD document based on your description
2. Save it in a format compatible with Task Master
3. Automatically launch Task Master to parse the PRD and create tasks
4. Display the tasks and next steps

#### Option 2: Interactive Conversation Workflow

#### Step 1: Plan your Product with the AI Product Manager
```
User: Can you start the AI Expert Workflow for my new mobile recipe app?

AI: I'll start the AI Expert Workflow to help you plan your mobile recipe app. What specific aspect would you like to begin with?

User: Let's create a PRD with the AI Product Manager. I want to build a recipe app that helps users find recipes based on ingredients they already have at home.

AI: [Asks clarifying questions about target users, key features, monetization, etc.]

User: [Provides detailed responses about the app vision]
```

#### Step 2: Generate the PRD with Task Master Integration
```
User: Can you generate a complete PRD document based on our consultation and save it for Task Master?

AI: [Generates comprehensive PRD with MVP focus and lean startup validation plan]

AI: Document saved to PRD.md and also saved for Task Master at scripts/prd.txt. You can now use Task Master to parse this PRD with: "Can you parse the PRD at scripts/prd.txt and generate tasks?"
```

#### Step 3: Create Tasks with Task Master
```
User: Can you parse the PRD at scripts/prd.txt and generate tasks?

AI: [Task Master parses the PRD and creates a structured list of tasks with priorities]

User: What's the next task I should work on?

AI: [Task Master suggests the highest priority task with implementation details]
```

#### Step 4: Implement Tasks
```
User: Help me implement the "Ingredient Search Feature" task.

AI: [Task Master provides guidance and code for implementing the specific feature]
```

This streamlined workflow transforms your idea into a well-planned product and organized development tasks, all through natural conversation with specialized AI experts.

## Features

- Consult with AI experts in three key roles:
  - AI Product Manager
  - AI UX Designer
  - AI Software Architect
- Generate comprehensive documents:
  - Product Requirements Document (PRD) with MVP focus and lean startup approach
  - UX Design Document with prototype descriptions and user testing plans
  - Software Architecture Specification with functional specifications and technical design
- Seamless integration with Task Master
- Powered by OpenRouter API for maximum flexibility across AI models:
  - Works with OpenAI models (GPT-4o, GPT-4-turbo, GPT-3.5-turbo)
  - Works with Anthropic models (Claude 3 Opus, Sonnet, Haiku)
  - Works with other models (Google Gemini, Mistral, Llama, Cohere, etc.)

## Benefits of Using AI Expert Workflow MCP

- **Complete Project Planning**: Get expert guidance through the entire product planning process
- **Lean Startup Approach**: Focus on MVP definition and validation plans
- **User-Centered Design**: Create user experiences based on solid UX principles
- **Technical Excellence**: Design scalable architectures that meet your requirements
- **Task Master Integration**: Convert your PRD directly into development tasks
- **Cursor Integration**: Seamless workflow within your development environment
- **Model Flexibility**: Choose from dozens of AI models through OpenRouter API
  - Use high-performance models (Claude Opus, GPT-4o) for complex planning
  - Use balanced models (Claude Sonnet, Mistral) for everyday work
  - Use fast models (Claude Haiku, GPT-3.5) for quick iterations

## Installation

### Global Installation (Recommended)

The easiest way to use AI Expert Workflow MCP is to install it directly from npm:

```bash
npm install -g ai-expert-workflow-mcp
```

This makes the `ai-expert-workflow-mcp` command globally available in your terminal.

### Local Development

1. Clone the repository:
   ```
   git clone https://github.com/bacoco/ai-expert-workflow-mcp.git
   cd ai-expert-workflow-mcp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Add your OpenRouter API key to the `.env` file (get one from https://openrouter.ai/keys)

4. Build the project:
   ```
   npm run build
   ```

5. Start the server:
   ```
   npm start
   ```

6. Run tests (optional):
   ```
   # Run JavaScript tests
   npm test

   # Run TypeScript tests
   npm run test:ts

   # Or use the shell scripts
   ./tests/run-js-test.sh
   ./tests/run-ts-test.sh
   ```

   Test results will be saved to `tests/results/result_test.md` and `tests/results/result_test_ts.md`.

## Usage with Cursor AI

1. Add the MCP configuration to your editor:

```json
{
  "mcpServers": {
    "ai-expert-workflow": {
      "command": "npx",
      "args": ["-y", "ai-expert-workflow-mcp"],
      "env": {
        "OPENROUTER_API_KEY": "YOUR_OPENROUTER_API_KEY_HERE",
        "MODEL": "anthropic/claude-3-sonnet-20240229",
        "MAX_TOKENS": 8000,
        "TEMPERATURE": 0.7
      }
    },
    "taskmaster-ai": {
      "command": "npx",
      "args": ["-y", "task-master-mcp"],
      "env": {
        "ANTHROPIC_API_KEY": "YOUR_ANTHROPIC_API_KEY_HERE",
        "MODEL": "claude-3-sonnet-20240229"
      }
    }
  }
}
```

2. Enable the MCP in your editor settings

3. Use natural language to interact with the AI Expert Workflow:

```
Can you start the AI Expert Workflow for my project?
Can you consult with the AI Product Manager to create a PRD for my project?
Can you generate a complete PRD document based on our consultation?
```

4. After generating your PRD, use Task Master to create tasks:

```
Can you parse the PRD at scripts/prd.txt and generate tasks?
```

## AI Expert Workflow

The workflow consists of three main phases:

### 1. Product Definition (AI Product Manager)

The Product Manager helps you create a PRD that includes:
- Product overview and problem statement
- User personas and user stories
- Feature requirements with priorities
- MVP scope definition
- Business model
- Lean startup validation plan

### 2. UX Design (AI UX Designer)

The UX Designer helps you create a UX document that includes:
- User personas and journey maps
- Information architecture
- Wireframe descriptions
- Prototype specifications
- User testing plans

### 3. Technical Architecture (AI Software Architect)

The Software Architect helps you create a specification that includes:
- System architecture
- Technology stack recommendations
- Functional specifications
- Technical design
- Integration requirements

## Task Master Integration

The AI Expert Workflow seamlessly integrates with Task Master in two ways:

> **Note:** You will need both API keys for the full workflow:
> - **OpenRouter API key** for AI Expert Workflow (get one from [OpenRouter](https://openrouter.ai/keys))
> - **Anthropic API key** for Task Master (get one from [Anthropic](https://console.anthropic.com/))

### Method 1: Fully Automated Integration (Recommended)

Use the provided script to automate the entire process:

```bash
# Install both MCPs globally
npm install -g ai-expert-workflow-mcp task-master-mcp

# Make sure to set your API keys in your environment:
# export OPENROUTER_API_KEY=your_openrouter_key_here  (for AI Expert Workflow)
# export ANTHROPIC_API_KEY=your_anthropic_key_here    (for Task Master)

# Run the automated script with your project details (default model)
npx ai-expert-workflow-generate "Your detailed project description"

# Or specify a different model for more creative or complex projects
MODEL=openai/gpt-4o npx ai-expert-workflow-generate "Your detailed project description"

# Or use a faster model for simpler projects
MODEL=anthropic/claude-3-haiku-20240307 npx ai-expert-workflow-generate "Your detailed project description"
```

This script:
1. Generates the PRD document based on your description
2. Automatically saves it in Task Master compatible format
3. Directly launches Task Master to parse the PRD and generate tasks
4. Handles different environments (CLI vs Cursor) appropriately

The process is completely automatic - you don't need to manually ask Task Master to parse the PRD. If you're using the script in Cursor, it will provide the exact command you should use next.

### Method 2: Manual Integration

For more control over the process:

1. When generating a PRD, use the `saveForTaskMaster` parameter:
   ```
   generateDocument productManager "Your project details" true
   ```

2. This saves your PRD in a format that Task Master can parse and creates Cursor workflow documentation

3. You can then use Task Master to create tasks:
   ```
   Can you parse the PRD at scripts/prd.txt and generate tasks?
   ```

4. Task Master will break down your PRD into actionable development tasks that you can track and implement

## For More Information

See the [Create-MCP.md](Create-MCP.md) file for a complete guide on creating your own AI Expert Workflow MCP server from scratch.

For details on OpenRouter API integration, see [OPENROUTER.md](OPENROUTER.md).

## License

MIT