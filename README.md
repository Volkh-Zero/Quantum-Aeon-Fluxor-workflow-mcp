# AI Expert Workflow MCP

An MCP (Model Control Plane) server that implements the AI Expert Workflow for integration with Task Master, using OpenRouter API for AI capabilities. This project allows you to consult with AI experts in product management, UX design, and software architecture to plan and develop your projects.

## 🚀 Quick Start for End Users

If you just want to use the AI Expert Workflow MCP with Task Master, follow these steps:

### Setup

1. Install both MCPs globally:
   ```bash
   npm install -g ai-expert-workflow-mcp task-master-mcp
   ```

2. Configure your Cursor settings with both MCPs:
   ```json
   {
     "mcpServers": {
       "ai-expert-workflow": {
         "command": "npx",
         "args": ["-y", "ai-expert-workflow-mcp"],
         "env": {
           "OPENROUTER_API_KEY": "YOUR_OPENROUTER_API_KEY_HERE",
           "OPENROUTER_MODEL": "openai/gpt-4-turbo",
           "MAX_TOKENS": 8000,
           "TEMPERATURE": 0.7
         }
       },
       "taskmaster-ai": {
         "command": "npx",
         "args": ["-y", "task-master-mcp"],
         "env": {
           "OPENROUTER_API_KEY": "YOUR_OPENROUTER_API_KEY_HERE",
           "OPENROUTER_MODEL": "openai/gpt-4-turbo",
           "MAX_TOKENS": 8000,
           "TEMPERATURE": 0.7
         }
       }
     }
   }
   ```

3. Enable the MCPs in your Cursor settings.

### Complete Workflow Example

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
- Seamless integration with Claude Task Master

## Benefits of Using AI Expert Workflow MCP

- **Complete Project Planning**: Get expert guidance through the entire product planning process
- **Lean Startup Approach**: Focus on MVP definition and validation plans
- **User-Centered Design**: Create user experiences based on solid UX principles
- **Technical Excellence**: Design scalable architectures that meet your requirements
- **Task Master Integration**: Convert your PRD directly into development tasks
- **Cursor Integration**: Seamless workflow within your development environment

## Installation

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

   # Run comprehensive tests (builds and runs both JS and TS tests)
   ./tests/run-comprehensive-test.sh
   ```

   Test results will be saved to `tests/results/result_test.md` and `tests/results/result_test_ts.md`.

   > **IMPORTANT**: The tests will fail with the default API key. To verify your OpenRouter API key without modifying the `.env` file, use one of these scripts:
   >
   > Verify and update in one step:
   > ```
   > npm run verify-and-update YOUR_API_KEY
   > ```
   >
   > Or run the steps separately:
   > ```
   > # Verify your API key
   > npm run verify-openrouter YOUR_API_KEY
   >
   > # Update the MCP configuration
   > npm run update-config YOUR_API_KEY
   > ```

### Global Installation

```
npm install -g ai-expert-workflow-mcp
```

## Usage with Cursor AI

1. Add the MCP configuration to your editor:

```json
{
  "mcpServers": {
    "ai-expert-workflow": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "${workspaceFolder}",
      "env": {
        "OPENROUTER_API_KEY": "${env:OPENROUTER_API_KEY}",
        "OPENROUTER_MODEL": "openai/gpt-4-turbo",
        "MAX_TOKENS": 4000,
        "TEMPERATURE": 0.7,
        "MCP_TIMEOUT": "120000",
        "DEBUG": "mcp"
      }
    },
    "taskmaster-ai": {
      "command": "npx",
      "args": ["-y", "task-master-mcp"],
      "env": {
        "OPENROUTER_API_KEY": "${env:OPENROUTER_API_KEY}",
        "OPENROUTER_MODEL": "openai/gpt-4-turbo",
        "MAX_TOKENS": 8000,
        "TEMPERATURE": 0.7,
        "DEFAULT_SUBTASKS": 5,
        "DEFAULT_PRIORITY": "medium"
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

The AI Expert Workflow seamlessly integrates with Task Master:

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

### Utility Scripts

The project includes utility scripts to demonstrate Task Master integration:

- `generate-task-master-files.js`: Creates sample PRD and Task Master integration files using the MCP implementation
- `generate-task-master-files-simple.js`: Creates sample PRD and Task Master integration files without using MCP

These scripts are useful for testing and understanding how the integration works.

## For More Information

See the [Create-MCP.md](Create-MCP.md) file for a complete guide on creating your own AI Expert Workflow MCP server from scratch.

## License

MIT

