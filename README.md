# AI Expert Workflow MCP

An MCP (Model Control Protocol) server that implements the AI Expert Workflow methodology for seamless integration with Claude Task Master. Transform your AI development process with a structured approach to project planning and execution.

AI Expert Workflow
MCP Compatible
Claude Powered

## 🚀 Overview

The AI Expert Workflow MCP enhances your development process by introducing specialized AI expert roles that help define your project before implementation begins:

1. **Product Definition** with an AI Product Manager
2. **UX Design** with an AI UX Designer
3. **Technical Architecture** with an AI Software Architect

This structured approach helps prevent "spaghetti code" and maintains focus throughout development by creating clear documentation before task implementation begins.

## ✨ Key Features

- **Expert Role Consultation**: Interact with specialized AI roles to refine your project vision
- **Document Generation**: Create comprehensive professional documentation:
    - Product Requirements Document (PRD)
    - UX Design Document
    - Software Architecture Specification
- **Seamless Integration**: Works alongside Claude Task Master for a complete development workflow
- **Conversational Interface**: Engage with experts using natural language in your editor


## 📋 Workflow

Workflow Diagram

1. **Define Your Product**: Consult with the AI Product Manager to establish clear requirements and project goals
2. **Design Your Experience**: Collaborate with the AI UX Designer to create intuitive user interfaces and workflows
3. **Plan Your Architecture**: Work with the AI Software Architect to define technical specifications and approaches
4. **Generate Tasks**: Use Claude Task Master to convert your PRD into actionable development tasks
5. **Implement**: Follow Task Master's guidance to efficiently implement your well-planned project

## 🔧 Installation

```bash
npm install -g ai-expert-workflow-mcp
```


## ⚙️ Configuration

Add the MCP configuration to your editor (Cursor is recommended):

```json
{
  "mcpServers": {
    "ai-expert-workflow": {
      "command": "npx",
      "args": ["-y", "ai-expert-workflow-mcp"],
      "env": {
        "ANTHROPIC_API_KEY": "YOUR_ANTHROPIC_API_KEY_HERE",
        "MODEL": "claude-3-7-sonnet-20250219",
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
        "MODEL": "claude-3-7-sonnet-20250219",
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


## 💬 Usage Examples

After enabling MCP in your editor settings, you can interact with the AI Expert Workflow using natural language:

### Starting the Workflow

```
Can you explain the AI Expert Workflow for my project?
```


### Product Manager Consultation

```
Can you consult with the AI Product Manager to create a PRD for my task management app?
```


### Document Generation

```
Can you generate a complete PRD document based on our consultation?
```


### Task Master Integration

After generating your PRD:

```
Can you parse the PRD at prd.md and generate tasks?
```


## 🔄 Complete End-to-End Example

Here's a complete workflow example you can follow:

1. **Initiate Expert Workflow**

```
Can you please explain how the AI Expert Workflow can help me plan my project?
```

2. **Consult with Product Manager**

```
Can you consult with the AI Product Manager to create a PRD for a developer task management app with AI assistance features?
```

3. **Generate PRD**

```
Based on our discussion, can you generate a comprehensive PRD document?
```

4. **Consult with UX Designer**

```
Now, can you consult with the AI UX Designer to create a UX document for this task management app?
```

5. **Generate UX Document**

```
Based on our UX discussion, can you generate a complete UX Design Document?
```

6. **Consult with Software Architect**

```
Finally, can you consult with the AI Software Architect to create a Software Specification for the app?
```

7. **Generate Architecture Specification**

```
Based on our architectural discussion, can you generate a complete Software Architecture Specification?
```

8. **Parse PRD with Task Master**

```
Can you please parse the PRD at prd.md and generate development tasks?
```

9. **Begin Implementation**

```
What's the next task I should work on?
```


## 🔍 Available Commands

The AI Expert Workflow MCP provides these tools that you can use in your conversations:

- `expertWorkflow` - Get an overview of the AI expert workflow
- `consultExpert &lt;role&gt; [projectInfo]` - Consult with an AI expert
    - Available roles: `productManager`, `uxDesigner`, `softwareArchitect`
- `generateDocument &lt;role&gt; &lt;projectDetails&gt;` - Generate a complete document with an AI expert


## ❓ Troubleshooting

### Common Issues

- **API Key Errors**: Ensure your Anthropic API key is correctly configured
- **MCP Connection Issues**: Verify MCP is enabled in your editor settings
- **Document Generation Failures**: Try breaking your project description into smaller sections
- **Task Master Integration Problems**: Make sure both MCPs are properly configured


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Inspired by the workflow presented in [Transform your AI development process](https://youtu.be/MbcYhCE7rjE)
- Built to complement [Claude Task Master](https://github.com/eyaltoledano/claude-task-master)
- Powered by Claude AI from Anthropic

