// Import the McpServer class using require instead of import
import { experts } from './experts';
import { consultWithExpert, generateExpertDocument, saveForTaskMaster } from './utils/aiUtils';
import { saveDocument, readTemplate, setupTaskMasterIntegration } from './utils/fileUtils';

// Import the MCP SDK using dynamic import
import('@modelcontextprotocol/sdk/server/mcp.js').then(module => {
  global.McpServer = module.McpServer;
}).catch(error => {
  console.error('Error importing MCP SDK:', error);
  process.exit(1);
});

// Define a global variable for TypeScript
declare global {
  var McpServer: any;
}

export function createMCPServer() {
  // Wait for the MCP SDK to be imported
  if (!global.McpServer) {
    console.error('MCP SDK not loaded yet. Please try again in a moment.');
    return null;
  }

  const server = new global.McpServer({
    name: 'ai-expert-workflow',
    version: '1.0.0'
  });

  // Register the consultExpert tool
  server.tool('consultExpert', {
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
  }, async (params: any) => {
    const { role, projectInfo } = params;

    if (!experts[role]) {
      return {
        error: `Unknown expert role: ${role}. Available roles: ${Object.keys(experts).join(', ')}`
      };
    }

    const expert = experts[role];

    if (!projectInfo) {
      let response = `# Consulting with ${expert.title}\n\n`;
      response += "Please provide a brief description of your project to get started.\n\n";
      response += "Initial questions to consider:\n";
      expert.initialQuestions.forEach((q: string, i: number) => {
        response += `${i+1}. ${q}\n`;
      });
      return { content: [{ type: 'text', text: response }] };
    }

    try {
      const aiResponse = await consultWithExpert(role, projectInfo);
      return {
        content: [{ type: 'text', text: `# Consultation with ${expert.title}\n\n${aiResponse}` }]
      };
    } catch (error) {
      return {
        error: `Error consulting with ${expert.title}: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  });

  // Register the generateDocument tool
  server.tool('generateDocument', {
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
  }, async (params: any) => {
    const { role, projectDetails, saveForTaskMaster: saveForTM = false } = params;

    if (!experts[role]) {
      return {
        error: `Unknown expert role: ${role}. Available roles: ${Object.keys(experts).join(', ')}`
      };
    }

    const expert = experts[role];

    try {
      const template = await readTemplate(expert.templatePath);
      const document = await generateExpertDocument(role, template, projectDetails);

      // Save the document to a file
      const filename = `${expert.outputFormat.replace(/\s+/g, '_').toLowerCase()}.md`;
      await saveDocument(document, filename);

      // If this is a PRD and saveForTaskMaster is true, also save in Task Master format
      let taskMasterMessage = '';
      if (role === 'productManager' && saveForTM) {
        const tmPath = await saveForTaskMaster(document);
        await setupTaskMasterIntegration();
        taskMasterMessage = `\n\nDocument also saved for Task Master at ${tmPath}. You can now use Task Master to parse this PRD with: "Can you parse the PRD at scripts/prd.txt and generate tasks?"`;
      }

      return {
        content: [{ type: 'text', text: `# ${expert.outputFormat}\n\n${document}\n\n(Document saved to ${filename})${taskMasterMessage}` }]
      };
    } catch (error) {
      return {
        error: `Error generating ${expert.outputFormat}: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  });

  // Register the expertWorkflow tool
  server.tool('expertWorkflow', {
    type: 'object',
    properties: {},
    required: []
  }, async () => {
    return {
      content: [{ type: 'text', text: `# AI Expert Workflow

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
   \`\`\`` }]
    };
  });

  return server;
}
