import { Server, ServerInfo, ToolCallParams, ToolCallResult } from '@modelcontextprotocol/sdk/server';
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
    handler: async (params: ToolCallParams): Promise<ToolCallResult> => {
      const { role, projectInfo } = params as { role: string, projectInfo?: string };
      
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
    handler: async (params: ToolCallParams): Promise<ToolCallResult> => {
      const { role, projectDetails, saveForTaskMaster: saveForTM = false } = 
        params as { role: string, projectDetails: string, saveForTaskMaster?: boolean };
      
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
    handler: async (): Promise<ToolCallResult> => {
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