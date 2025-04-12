import { Server, ServerInfo } from '@modelcontextprotocol/sdk/server';
import { productManager } from './experts/productManager';
import { uxDesigner } from './experts/uxDesigner';
import { softwareArchitect } from './experts/softwareArchitect';
import { getExpertResponse, generateDocument } from './utils/promptUtils';
import { readTemplate, saveDocument } from './utils/fileUtils';
import fs from 'fs/promises';
import path from 'path';

const experts = {
  productManager,
  uxDesigner,
  softwareArchitect
};

export function createMCPServer() {
  const serverInfo: ServerInfo = {
    name: 'ai-expert-workflow',
    version: '1.0.0'
  };
  
  const server = new Server(serverInfo);
  
  // Register consultExpert tool
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
    handler: async (params) => {
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
        expert.initialQuestions.forEach((q, i) => {
          response += `${i+1}. ${q}\n`;
        });
        return { result: response };
      }
      
      try {
        const aiResponse = await getExpertResponse(expert.systemPrompt, projectInfo);
        return { 
          result: `# Consultation with ${expert.title}\n\n${aiResponse}` 
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          error: `Error consulting with ${expert.title}: ${errorMessage}`
        };
      }
    }
  });
  
  // Register generateDocument tool
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
        }
      },
      required: ['role', 'projectDetails']
    },
    handler: async (params) => {
      const { role, projectDetails } = params;
      
      if (!experts[role]) {
        return {
          error: `Unknown expert role: ${role}. Available roles: ${Object.keys(experts).join(', ')}`
        };
      }
      
      const expert = experts[role];
      
      try {
        const templatePath = path.join(__dirname, expert.templatePath);
        const template = await fs.readFile(templatePath, 'utf8');
        const document = await generateDocument(expert.systemPrompt, template, projectDetails);
        
        // Save the document to a file
        const filename = `${expert.outputFormat.replace(/\s+/g, '_').toLowerCase()}.md`;
        const filePath = await saveDocument(document, filename);
        
        return { 
          result: `# ${expert.outputFormat}\n\n${document}\n\n(Document saved to ${filename})` 
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          error: `Error generating ${expert.outputFormat}: ${errorMessage}`
        };
      }
    }
  });
  
  // Register expertWorkflow tool
  server.registerTool({
    name: 'expertWorkflow',
    description: 'Get an overview of the AI expert workflow',
    parameters: {
      type: 'object',
      properties: {},
      required: []
    },
    handler: async () => {
      return {
        result: `# AI Expert Workflow

This workflow helps you develop your project through three expert consultations:

1. **Product Definition** - Work with an AI Product Manager to create a PRD
   \`\`\`
   consultExpert productManager "Brief project description"
   \`\`\`

2. **UX Design** - Work with an AI UX Designer to create a UX Design Document
   \`\`\`
   consultExpert uxDesigner "Brief project description"
   \`\`\`

3. **Technical Architecture** - Work with an AI Software Architect to create a Software Specification
   \`\`\`
   consultExpert softwareArchitect "Brief project description"
   \`\`\`

After consulting with each expert, use \`generateDocument\` to create the full document:
   \`\`\`
   generateDocument productManager "Detailed project information from consultation"
   \`\`\`

Once you have your documents, use Task Master's \`parse-prd\` command to create tasks from your PRD.`
      };
    }
  });
  
  return server;
} 