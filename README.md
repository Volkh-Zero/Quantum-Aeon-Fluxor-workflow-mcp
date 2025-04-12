# AI Expert Workflow MCP

An MCP server that implements the AI Expert Workflow for integration with Claude Task Master.

## Features

- Consult with AI experts in three key roles:
  - AI Product Manager
  - AI UX Designer
  - AI Software Architect
- Generate comprehensive documents:
  - Product Requirements Document (PRD)
  - UX Design Document
  - Software Architecture Specification
- Seamless integration with Claude Task Master

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
   - Add your API keys to the `.env` file

4. Build the project:
   ```
   npm run build
   ```

5. Start the server:
   ```
   npm start
   ```

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
      "command": "npx",
      "args": ["-y", "ai-expert-workflow-mcp"],
      "env": {
        "ANTHROPIC_API_KEY": "YOUR_ANTHROPIC_API_KEY_HERE",
        "MODEL": "claude-3-sonnet-20240229",
        "MAX_TOKENS": 8000,
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

2. Enable the MCP in your editor settings

3. Use natural language to interact with the AI Expert Workflow:

```
Can you start the AI Expert Workflow for my project?
Can you consult with the AI Product Manager to create a PRD for my project?
Can you generate a complete PRD document based on our consultation?
```

4. After generating your PRD, use Task Master to create tasks:

```
Can you parse the PRD at prd.md and generate tasks?
```

## API Reference

The AI Expert Workflow MCP provides the following tools:

### consultExpert

Consult with an AI expert to get guidance on your project.

**Parameters:**
- `role` (required): The expert role to consult with (`productManager`, `uxDesigner`, `softwareArchitect`)
- `projectInfo`: Brief description of the project

**Example:**
```
consultExpert productManager "I want to build a task management app for developers"
```

### generateDocument

Generate a complete document with an AI expert based on project details.

**Parameters:**
- `role` (required): The expert role to use for document generation
- `projectDetails` (required): Detailed project information

**Example:**
```
generateDocument productManager "My project is a task management app for developers. It helps teams organize and track their work..."
```

### expertWorkflow

Get an overview of the AI expert workflow.

**Parameters:** None

**Example:**
```
expertWorkflow
```

## Workflow

1. **Product Definition**: Consult with the AI Product Manager to define your product requirements
2. **UX Design**: Work with the AI UX Designer to create a user experience document
3. **Technical Architecture**: Collaborate with the AI Software Architect to define your technical approach
4. **Task Generation**: Use Task Master to convert your PRD into actionable tasks
5. **Implementation**: Use Task Master to guide your implementation process

## Expert Roles

### AI Product Manager

The AI Product Manager helps you create a detailed Product Requirements Document (PRD) that outlines:
- Problem statement and solution
- Target users and user personas
- Feature requirements and prioritization
- Success metrics and KPIs
- Timeline and roadmap

### AI UX Designer

The AI UX Designer helps you create a UX Design Document that includes:
- User research and personas
- User journeys and flows
- Information architecture
- Wireframes and interaction design
- UI components and patterns

### AI Software Architect

The AI Software Architect helps you create a Software Architecture Specification that covers:
- System architecture and component structure
- Data models and API design
- Technology stack recommendations
- Security, scalability, and performance considerations
- Development guidelines and best practices

## Integration with Task Master

This MCP is designed to work seamlessly with the Claude Task Master MCP:

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

## License

MIT 