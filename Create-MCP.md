# Creating Your AI Expert Workflow MCP Server

This guide will walk you through the process of setting up your own AI Expert Workflow MCP server from scratch, which integrates with Task Master for a complete AI-powered development workflow.

## Prerequisites

- Node.js (v16+)
- npm (v7+)
- Anthropic API key
- Basic understanding of TypeScript

## Step 1: Set Up the Repository

1. Create a new directory and initialize it as a Git repository:
   ```bash
   mkdir ai-expert-workflow-mcp
   cd ai-expert-workflow-mcp
   git init
   ```

2. Initialize a new npm project:
   ```bash
   npm init -y
   ```

3. Install the necessary dependencies:
   ```bash
   npm install anthropic @modelcontextprotocol/sdk dotenv
   npm install --save-dev typescript @types/node ts-node nodemon jest @types/jest ts-jest
   ```

## Step 2: Configure TypeScript

Create a `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts", "dist"]
}
```

## Step 3: Create Project Directory Structure

```bash
mkdir -p src/experts src/utils src/interfaces templates scripts .cursor/rules
```

## Step 4: Create Interface Definitions

Create `src/interfaces/expertInterfaces.ts`:

```typescript
export interface ExpertRole {
  title: string;
  systemPrompt: string;
  outputFormat: string;
  initialQuestions: string[];
  templatePath: string;
}

export interface ConsultationResult {
  content: string;
  suggestedNextSteps: string[];
}
```

## Step 5: Create Expert Definitions

### Product Manager Expert

Create `src/experts/productManager.ts`:

```typescript
import { ExpertRole } from '../interfaces/expertInterfaces';

export const productManager: ExpertRole = {
  title: "AI Product Manager",
  systemPrompt: `You are an expert AI Product Manager with extensive experience creating clear, actionable PRDs.
  Your goal is to help the user define their product vision and requirements in a structured document.
  Ask clarifying questions to understand the product goals, target users, key features, and success metrics.
  Organize information into a comprehensive PRD with clear sections including:
  - Product Overview
  - Problem Statement
  - User Personas
  - User Stories/Jobs to be Done
  - Feature Requirements (with priority levels)
  - Success Metrics
  - Timeline and Milestones
  - MVP Summary (clearly defining the minimum viable product scope)
  - Business Model (outlining monetization strategy and pricing)
  - Lean Startup Validation Plan (hypotheses to test and metrics to track)
  
  Be thorough but concise. Focus on actionable requirements that developers can implement.`,
  outputFormat: "PRD",
  initialQuestions: [
    "What problem is your product trying to solve?",
    "Who are the target users for this product?",
    "What are the 3-5 most important features needed for an MVP?",
    "How do you plan to monetize this product?",
    "What would success look like for this product?",
    "What key hypotheses do you need to validate with your MVP?"
  ],
  templatePath: "templates/prd-template.md"
};
```

### UX Designer Expert

Create `src/experts/uxDesigner.ts`:

```typescript
import { ExpertRole } from '../interfaces/expertInterfaces';

export const uxDesigner: ExpertRole = {
  title: "AI UX Designer",
  systemPrompt: `You are an expert UX Designer who excels at creating user-centered designs.
  Your goal is to help the user define the user experience for their product.
  Ask questions to understand user needs, workflows, and interaction patterns.
  Create a UX Design Document that includes:
  - User Personas
  - User Journey Maps
  - Information Architecture
  - Wireframe Descriptions (in text form)
  - Interaction Patterns
  - Accessibility Considerations
  - Prototype Description (detailed explanation of how the prototype should function)
  - User Testing Plan (methods to validate the UX with real users)
  
  Focus on creating intuitive, efficient, and delightful user experiences.`,
  outputFormat: "UX Design Document",
  initialQuestions: [
    "What are the primary user workflows in your application?",
    "What are the key screens or interfaces needed?",
    "What similar products or design patterns do you like?",
    "Are there any specific brand guidelines or design constraints?",
    "How would you describe your ideal prototype for testing?"
  ],
  templatePath: "templates/ux-doc-template.md"
};
```

### Software Architect Expert

Create `src/experts/softwareArchitect.ts`:

```typescript
import { ExpertRole } from '../interfaces/expertInterfaces';

export const softwareArchitect: ExpertRole = {
  title: "AI Software Architect",
  systemPrompt: `You are an expert Software Architect who specializes in designing robust, scalable systems.
  Your goal is to help the user define the technical architecture for their product.
  Ask questions to understand technical requirements, constraints, and preferences.
  Create a Software Specification that includes:
  - System Architecture Overview
  - Technology Stack Recommendations
  - Data Models and Relationships
  - API Specifications
  - Component Breakdown
  - Security Considerations
  - Scalability Approach
  - Functional Specifications (detailed behavior of each feature)
  - Technical Design (detailed system architecture and implementation approach)
  - Integration Requirements
  
  Provide clear, implementable specifications that balance technical excellence with practical constraints.`,
  outputFormat: "Software Specification",
  initialQuestions: [
    "What technology stack are you planning to use or prefer?",
    "What are the key technical requirements (performance, scalability, etc.)?",
    "Are there existing systems this needs to integrate with?",
    "What are the most complex technical challenges you anticipate?",
    "What functional specifications are most critical for your MVP?"
  ],
  templatePath: "templates/software-spec-template.md"
};
```

### Expert Index

Create `src/experts/index.ts`:

```typescript
import { productManager } from './productManager';
import { uxDesigner } from './uxDesigner';
import { softwareArchitect } from './softwareArchitect';

export const experts = {
  productManager,
  uxDesigner,
  softwareArchitect
};
```

## Step 6: Create Template Files

### PRD Template

Create `templates/prd-template.md`:

```markdown
# Product Requirements Document

## Product Overview
[Overview goes here]

## Problem Statement
[Problem statement goes here]

## User Personas
[User personas go here]

## User Stories/Jobs to be Done
[User stories go here]

## Feature Requirements
[Feature requirements go here with priority levels]

## MVP Summary
[Clear definition of minimum viable product scope]

## Success Metrics
[Success metrics go here]

## Timeline and Milestones
[Timeline and milestones go here]

## Business Model
[Monetization strategy and pricing model]

## Lean Startup Validation Plan
[Hypotheses to test and metrics to track]

## Competitive Analysis
[Analysis of competitors and market positioning]

## Open Questions and Risks
[Any outstanding questions, dependencies, or risks]
```

### UX Design Template

Create `templates/ux-doc-template.md`:

```markdown
# UX Design Document

## User Personas
[User personas go here]

## User Journey Maps
[User journey maps go here]

## Information Architecture
[Information architecture go here]

## Wireframe Descriptions
[Wireframe descriptions go here]

## Interaction Patterns
[Interaction patterns go here]

## UI Components and Patterns
[Description of reusable UI components and design patterns]

## Accessibility Considerations
[Accessibility considerations go here]

## Responsive Design Strategy
[Approach for different screen sizes and devices]

## Prototype Description
[Detailed explanation of how the prototype should function]

## User Testing Plan
[Methods to validate the UX with real users]
```

### Software Specification Template

Create `templates/software-spec-template.md`:

```markdown
# Software Specification

## System Architecture Overview
[System architecture overview goes here]

## Technology Stack
[Technology stack recommendations go here]

## Data Models and Relationships
[Data models and relationships go here]

## API Specifications
[API specifications go here]

## Component Breakdown
[Component breakdown goes here]

## Functional Specifications
[Detailed behavior of each feature]

## Technical Design
[Detailed system architecture and implementation approach]

## Security Considerations
[Security considerations go here]

## Scalability Approach
[Scalability approach goes here]

## Integration Requirements
[Integration requirements go here]

## Monitoring and Logging
[Approach to monitoring, alerting, and logging]

## Disaster Recovery and Resilience
[Backup, recovery, and high availability strategies]

## Development Guidelines
[Coding standards, patterns, and development practices]
```

## Step 7: Create Utility Functions

### AI Utilities

Create `src/utils/aiUtils.ts`:

```typescript
import Anthropic from 'anthropic';
import dotenv from 'dotenv';
import { experts } from '../experts';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function consultWithExpert(role: string, userInput: string): Promise<string> {
  const expert = experts[role as keyof typeof experts];
  if (!expert) {
    throw new Error(`Unknown expert role: ${role}`);
  }
  
  try {
    const response = await anthropic.messages.create({
      model: process.env.MODEL || 'claude-3-sonnet-20240229',
      max_tokens: parseInt(process.env.MAX_TOKENS || '4000'),
      temperature: parseFloat(process.env.TEMPERATURE || '0.7'),
      system: expert.systemPrompt,
      messages: [
        { role: 'user', content: userInput }
      ]
    });
    
    return response.content[0].text;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

export async function generateExpertDocument(role: string, template: string, userInput: string): Promise<string> {
  const expert = experts[role as keyof typeof experts];
  if (!expert) {
    throw new Error(`Unknown expert role: ${role}`);
  }
  
  const enhancedPrompt = `${expert.systemPrompt}\n\nPlease use the following template structure for your response:\n\n${template}\n\nBased on the user's input, create a complete, well-structured document. Format your response using Markdown with clear sections and subsections.`;
  
  try {
    const response = await anthropic.messages.create({
      model: process.env.MODEL || 'claude-3-sonnet-20240229',
      max_tokens: parseInt(process.env.MAX_TOKENS || '8000'),
      temperature: parseFloat(process.env.TEMPERATURE || '0.5'),
      system: enhancedPrompt,
      messages: [
        { role: 'user', content: userInput }
      ]
    });
    
    return response.content[0].text;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

// Special function to save PRD in the format Task Master expects
export async function saveForTaskMaster(content: string): Promise<string> {
  try {
    // Create scripts directory if it doesn't exist
    const scriptsDir = path.join(process.cwd(), 'scripts');
    try {
      await fs.mkdir(scriptsDir, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }
    
    // Save to scripts/prd.txt for Task Master compatibility
    const filePath = path.join(scriptsDir, 'prd.txt');
    await fs.writeFile(filePath, content, 'utf8');
    
    return filePath;
  } catch (error) {
    console.error('Error saving for Task Master:', error);
    throw error;
  }
}
```

### File Utilities

Create `src/utils/fileUtils.ts`:

```typescript
import fs from 'fs/promises';
import path from 'path';

export async function saveDocument(content: string, filename: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), filename);
    await fs.writeFile(filePath, content, 'utf8');
    return filePath;
  } catch (error) {
    console.error('Error saving document:', error);
    throw error;
  }
}

export async function readTemplate(templatePath: string): Promise<string> {
  try {
    const fullPath = path.join(__dirname, '..', '..', templatePath);
    return await fs.readFile(fullPath, 'utf8');
  } catch (error) {
    console.error('Error reading template:', error);
    
    // Fallback to default templates if file not found
    if (templatePath.includes('prd-template.md')) {
      return `# Product Requirements Document\n\n## Product Overview\n[Overview goes here]\n\n## Problem Statement\n[Problem statement goes here]`;
    } else if (templatePath.includes('ux-doc-template.md')) {
      return `# UX Design Document\n\n## User Personas\n[User personas go here]`;
    } else if (templatePath.includes('software-spec-template.md')) {
      return `# Software Specification\n\n## System Architecture Overview\n[System architecture overview goes here]`;
    }
    
    throw error;
  }
}

// Create Task Master integration files
export async function setupTaskMasterIntegration(): Promise<void> {
  try {
    // Create .cursor directory and rules if it doesn't exist
    const cursorDir = path.join(process.cwd(), '.cursor', 'rules');
    await fs.mkdir(cursorDir, { recursive: true });
    
    // Create dev_workflow.mdc file for Cursor integration
    const devWorkflowContent = `# Task Master Development Workflow

## Overview
- Task Master is an AI-driven development tool that helps organize and manage tasks
- It integrates with Claude and Cursor to provide a seamless development experience
- This workflow explains how to use Task Master effectively

## Commands
- Use \`parse-prd\` to generate tasks from a PRD
- Use \`list\` to see all tasks
- Use \`next\` to get the next task to work on
- Use \`generate\` to generate code for a specific task

## Integration with AI Expert Workflow
- AI Expert Workflow generates comprehensive PRDs
- These PRDs can be parsed by Task Master to create tasks
- The workflow creates a seamless planning-to-implementation pipeline

## Examples
To parse a PRD:
\`\`\`
Can you parse the PRD at scripts/prd.txt and generate tasks?
\`\`\`

To get the next task:
\`\`\`
What's the next task I should work on?
\`\`\`
`;
    
    await fs.writeFile(path.join(cursorDir, 'dev_workflow.mdc'), devWorkflowContent, 'utf8');
    
    return;
  } catch (error) {
    console.error('Error setting up Task Master integration:', error);
    throw error;
  }
}
```

## Step 8: Create MCP Server Implementation

Create `src/mcp.ts`:

```typescript
import { Server, ServerInfo } from '@modelcontextprotocol/sdk/server';
import { experts } from './experts';
import { consultWithExpert, generateExpertDocument, saveForTaskMaster } from './utils/aiUtils';
import { saveDocument, readTemplate, setupTaskMasterIntegration } from './utils/fileUtils';

export function createMCPServer() {
  const serverInfo: ServerInfo = {
    name: 'ai-expert-workflow',
    version: '1.0.0'
  };
  
  const server = new Server(serverInfo);
  
  // Register the consultExpert tool
  server.registerTool({
    name: 'consultExpert',
    description: 'Consult with an AI expert',
    parameters: {
      type: 'object',
      properties: {
        role: {
          type: 'string',
          description: 'The expert role to consult with (productManager, uxDesigner, softwareArchitect)'
        },
        projectInfo: {
          type: 'string',
          description: 'Brief description of the project'
        }
      },
      required: ['role']
    },
    handler: async (params: any): Promise<any> => {
      const { role, projectInfo } = params as { role: string, projectInfo?: string };
      
      if (!experts[role as keyof typeof experts]) {
        return {
          error: `Unknown expert role: ${role}. Available roles: ${Object.keys(experts).join(', ')}`
        };
      }
      
      const expert = experts[role as keyof typeof experts];
      
      if (!projectInfo) {
        let response = `# Consulting with ${expert.title}\n\n`;
        response += "Please provide a brief description of your project to get started.\n\n";
        response += "Initial questions to consider:\n";
        expert.initialQuestions.forEach((q, i) => {
          response += `${i+1}. ${q}\n`;
        });
        return { result: response };
      }
      
      try {
        const aiResponse = await consultWithExpert(role, projectInfo);
        return { 
          result: `# Consultation with ${expert.title}\n\n${aiResponse}` 
        };
      } catch (error) {
        return {
          error: `Error consulting with ${expert.title}: ${error instanceof Error ? error.message : String(error)}`
        };
      }
    }
  });
  
  // Register the generateDocument tool
  server.registerTool({
    name: 'generateDocument',
    description: 'Generate a complete document with an AI expert',
    parameters: {
      type: 'object',
      properties: {
        role: {
          type: 'string',
          description: 'The expert role to use for document generation'
        },
        projectDetails: {
          type: 'string',
          description: 'Detailed project information'
        },
        saveForTaskMaster: {
          type: 'boolean',
          description: 'Whether to save the document in a format compatible with Task Master'
        }
      },
      required: ['role', 'projectDetails']
    },
    handler: async (params: any): Promise<any> => {
      const { role, projectDetails, saveForTaskMaster: saveForTM = false } = 
        params as { role: string, projectDetails: string, saveForTaskMaster?: boolean };
      
      if (!experts[role as keyof typeof experts]) {
        return {
          error: `Unknown expert role: ${role}. Available roles: ${Object.keys(experts).join(', ')}`
        };
      }
      
      const expert = experts[role as keyof typeof experts];
      
      try {
        const template = await readTemplate(expert.templatePath);
        const document = await generateExpertDocument(role, template, projectDetails);
        
        // Save the document to a file
        const filename = `${expert.outputFormat.replace(/\s+/g, '_').toLowerCase()}.md`;
        const filePath = await saveDocument(document, filename);
        
        // If this is a PRD and saveForTaskMaster is true, also save in Task Master format
        let taskMasterMessage = '';
        if (role === 'productManager' && saveForTM) {
          const tmPath = await saveForTaskMaster(document);
          await setupTaskMasterIntegration();
          taskMasterMessage = `\n\nDocument also saved for Task Master at ${tmPath}. You can now use Task Master to parse this PRD with: "Can you parse the PRD at scripts/prd.txt and generate tasks?"`;
        }
        
        return { 
          result: `# ${expert.outputFormat}\n\n${document}\n\n(Document saved to ${filename})${taskMasterMessage}` 
        };
      } catch (error) {
        return {
          error: `Error generating ${expert.outputFormat}: ${error instanceof Error ? error.message : String(error)}`
        };
      }
    }
  });
  
  // Register the expertWorkflow tool
  server.registerTool({
    name: 'expertWorkflow',
    description: 'Get an overview of the AI expert workflow',
    parameters: {
      type: 'object',
      properties: {},
      required: []
    },
    handler: async (): Promise<any> => {
      return {
        result: `# AI Expert Workflow

This workflow helps you develop your project through three expert consultations:

1. **Product Definition** - Work with an AI Product Manager to create a PRD with:
   - Product Overview and Problem Statement
   - User Personas and Stories
   - Feature Requirements
   - MVP Summary
   - Business Model
   - Lean Startup Validation Plan
   \`\`\`
   consultExpert productManager "Brief project description"
   \`\`\`

2. **UX Design** - Work with an AI UX Designer to create a UX Design Document with:
   - User Personas and Journey Maps
   - Information Architecture
   - Wireframe Descriptions
   - Prototype Description
   - User Testing Plan
   \`\`\`
   consultExpert uxDesigner "Brief project description"
   \`\`\`

3. **Technical Architecture** - Work with an AI Software Architect to create a Software Specification with:
   - System Architecture Overview
   - Technology Stack Recommendations
   - Functional Specifications
   - Technical Design
   - Integration Requirements
   \`\`\`
   consultExpert softwareArchitect "Brief project description"
   \`\`\`

After consulting with each expert, use \`generateDocument\` to create the full document:
   \`\`\`
   generateDocument productManager "Detailed project information from consultation" true
   \`\`\`
   
The \`true\` parameter at the end saves the PRD in a format that Task Master can parse.
Once you have your PRD saved, you can use Task Master to create tasks with:
   \`\`\`
   Can you parse the PRD at scripts/prd.txt and generate tasks?
   \`\`\``
      };
    }
  });
  
  return server;
}
```

## Step 9: Create Main Entry Point

Create `src/index.ts`:

```typescript
import { createMCPServer } from './mcp';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function main() {
  try {
    // Check if ANTHROPIC_API_KEY is set
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('Error: ANTHROPIC_API_KEY is required but not set in the environment');
      process.exit(1);
    }

    console.log('Starting AI Expert Workflow MCP Server...');
    
    const server = createMCPServer();
    
    console.log('Server created, initializing transport...');
    
    // Use MCP stdio transport
    const transport = await import('@modelcontextprotocol/sdk/server/stdio').then(
      module => new module.StdioServerTransport()
    );
    
    console.log('Starting server...');
    
    await server.listen(transport);
    
    console.log('Server terminated.');
  } catch (error) {
    console.error('Error starting server:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// Only run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}
```

## Step 10: Configure Environment Variables

Create `.env.example`:

```
# Anthropic API Key (Required)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Model settings
MODEL=claude-3-sonnet-20240229
MAX_TOKENS=8000
TEMPERATURE=0.7

# Optional Task Master Integration
TASK_MASTER_ENDPOINT=http://localhost:3000
```

Create `.env` (copy from .env.example and add your real API key).

## Step 11: Configure Package.json

Update the `package.json` file:

```json
{
  "name": "ai-expert-workflow-mcp",
  "version": "1.0.0",
  "description": "AI Expert Workflow MCP Server for Task Master integration",
  "main": "dist/index.js",
  "bin": {
    "ai-expert-workflow-mcp": "dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/index.ts",
    "test": "jest",
    "prepare": "npm run build"
  },
  "keywords": [
    "ai",
    "workflow",
    "mcp",
    "task-master",
    "claude"
  ],
  "author": "",
  "license": "MIT"
}
```

## Step 12: Build and Run the Server

1. Build the MCP server:
   ```bash
   npm run build
   ```

2. Start the MCP server:
   ```bash
   npm start
   ```

## Step 13: Configure Cursor AI to Use Your MCP

Add the following configuration to your Cursor AI settings:

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

## Step 14: Publish Your MCP (Optional)

If you want to make your MCP available to others:

1. Create a `.gitignore` file:
   ```
   node_modules/
   dist/
   .env
   *.log
   ```

2. Commit your changes:
   ```bash
   git add .
   git commit -m "Initial commit"
   ```

3. Create a GitHub repository and push your code:
   ```bash
   git remote add origin https://github.com/yourusername/ai-expert-workflow-mcp.git
   git push -u origin main
   ```

4. Publish to npm:
   ```bash
   npm login
   npm publish
   ```

## Using Your MCP

Once your MCP is set up, you can interact with it using Cursor AI:

1. Start the AI Expert Workflow:
   ```
   Can you start the AI Expert Workflow for my project?
   ```

2. Consult with an expert:
   ```
   Can you consult with the AI Product Manager about my task management app idea?
   ```

3. Generate a document:
   ```
   Can you generate a PRD for my task management app based on our consultation?
   ```

4. Integrate with Task Master:
   ```
   Can you parse the PRD at scripts/prd.txt and generate tasks?
   ```

Enjoy your AI-powered development workflow! 