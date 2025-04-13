// Import the McpServer class using require instead of import
import { experts } from './experts';
import { consultWithExpert, generateExpertDocument, saveForTaskMaster } from './utils/aiUtils';
import { saveDocument, readTemplate, setupTaskMasterIntegration } from './utils/fileUtils';

// Define a global variable for TypeScript
declare global {
  var McpServer: any;
  var isDebugMode: boolean;
}

// Enable debug logging if DEBUG env variable is set
global.isDebugMode = process.env.DEBUG?.includes('mcp') || false;

function log(...args: any[]) {
  if (global.isDebugMode) {
    console.log('[AI-EXPERT-MCP]', ...args);
  }
}

function logError(...args: any[]) {
  console.error('[AI-EXPERT-MCP-ERROR]', ...args);
}

// Load the MCP SDK synchronously
let mcpServerLoaded = false;
try {
  const mcpModule = require('@modelcontextprotocol/sdk/server/mcp.js');
  global.McpServer = mcpModule.McpServer;
  mcpServerLoaded = true;
  log('MCP SDK loaded successfully');
} catch (error) {
  logError('Failed to load MCP SDK synchronously:', error);
  
  // Fallback to async loading
  import('@modelcontextprotocol/sdk/server/mcp.js').then(module => {
    global.McpServer = module.McpServer;
    mcpServerLoaded = true;
    log('MCP SDK loaded asynchronously');
  }).catch(error => {
    logError('Error importing MCP SDK asynchronously:', error);
    process.exit(1);
  });
}

// Retry mechanism for server creation
export async function waitForMcpSdk(maxRetries = 5, delayMs = 1000): Promise<boolean> {
  let retries = 0;
  
  while (!mcpServerLoaded && retries < maxRetries) {
    log(`Waiting for MCP SDK to load... (attempt ${retries + 1}/${maxRetries})`);
    await new Promise(resolve => setTimeout(resolve, delayMs));
    retries++;
  }
  
  return mcpServerLoaded;
}

export function createMCPServer() {
  // Check if MCP SDK is loaded
  if (!global.McpServer) {
    logError('MCP SDK not loaded yet. Please try again in a moment.');
    return null;
  }

  try {
    log('Creating MCP server instance');
    const server = new global.McpServer({
      name: 'ai-expert-workflow',
      version: '1.0.0'
    });

    // Register the consultExpert tool
    try {
      log('Registering consultExpert tool');
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
        log('consultExpert tool called with params:', params);
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
          return { content: response };
        }

        try {
          const aiResponse = await consultWithExpert(role, projectInfo);
          return {
            content: `# Consultation with ${expert.title}\n\n${aiResponse}`
          };
        } catch (error) {
          logError('Error in consultExpert:', error);
          return {
            error: `Error consulting with ${expert.title}: ${error instanceof Error ? error.message : String(error)}`
          };
        }
      });
    } catch (error) {
      logError('Failed to register consultExpert tool:', error);
    }

    // Register the generateDocument tool
    try {
      log('Registering generateDocument tool');
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
        log('generateDocument tool called with params:', params);
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
            content: `# ${expert.outputFormat}\n\n${document}\n\n(Document saved to ${filename})${taskMasterMessage}`
          };
        } catch (error) {
          logError('Error in generateDocument:', error);
          return {
            error: `Error generating ${expert.outputFormat}: ${error instanceof Error ? error.message : String(error)}`
          };
        }
      });
    } catch (error) {
      logError('Failed to register generateDocument tool:', error);
    }

    // Register the expertWorkflow tool
    try {
      log('Registering expertWorkflow tool');
      server.tool('expertWorkflow', {
        type: 'object',
        properties: {
          random_string: {
            type: 'string',
            description: 'Dummy parameter for no-parameter tools'
          }
        },
        required: ['random_string']
      }, async (params: { random_string: string }) => {
        log('expertWorkflow tool called with params:', params);
        
        try {
          const { random_string } = params;
          log('Processing request with input:', random_string);
          
          // Use a simpler response format - just text string instead of array
          const responseText = `# AI Expert Workflow

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
   \`\`\``;

          // Try a different response format that might be more compatible
          return { content: responseText };
        } catch (error) {
          logError('Error in expertWorkflow:', error);
          return {
            error: `Error executing expertWorkflow: ${error instanceof Error ? error.message : String(error)}`
          };
        }
      });
    } catch (error) {
      logError('Failed to register expertWorkflow tool:', error);
    }

    log('All tools registered successfully');
    return server;
  } catch (error) {
    logError('Error creating MCP server:', error);
    return null;
  }
}