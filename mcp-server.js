// MCP server implementation with fixed imports
require('dotenv').config();
const path = require('path');

// Check if ANTHROPIC_API_KEY is set
if (!process.env.ANTHROPIC_API_KEY) {
  console.error('Error: ANTHROPIC_API_KEY is required but not set in the environment');
  process.exit(1);
}

// Import the MCP SDK using absolute paths
const mcpPath = path.resolve('./node_modules/@modelcontextprotocol/sdk/dist/cjs/server/mcp.js');
const stdioPath = path.resolve('./node_modules/@modelcontextprotocol/sdk/dist/cjs/server/stdio.js');

console.log('MCP path:', mcpPath);
console.log('StdioServerTransport path:', stdioPath);

const { McpServer } = require(mcpPath);
const { StdioServerTransport } = require(stdioPath);
const Anthropic = require('@anthropic-ai/sdk');

// Create Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Define expert roles
const experts = {
  productManager: {
    title: "AI Product Manager",
    systemPrompt: `You are an expert AI Product Manager with extensive experience creating clear, actionable PRDs.
    Your goal is to help the user define their product vision and requirements in a structured document.
    Ask clarifying questions to understand the product goals, target users, key features, and success metrics.
    Organize information into a comprehensive PRD with clear sections.`,
    initialQuestions: [
      "What problem is your product trying to solve?",
      "Who are the target users for this product?",
      "What are the 3-5 most important features needed for an MVP?"
    ]
  },
  uxDesigner: {
    title: "AI UX Designer",
    systemPrompt: `You are an expert AI UX Designer with extensive experience creating user-centered designs.
    Your goal is to help the user define their user experience vision in a structured document.
    Ask clarifying questions to understand the user needs, workflows, and interaction patterns.
    Organize information into a comprehensive UX document with clear sections.`,
    initialQuestions: [
      "Who are your target users?",
      "What are the key user journeys?",
      "What are the main pain points you're trying to solve?"
    ]
  },
  softwareArchitect: {
    title: "AI Software Architect",
    systemPrompt: `You are an expert AI Software Architect with extensive experience designing scalable systems.
    Your goal is to help the user define their technical architecture in a structured document.
    Ask clarifying questions to understand the technical requirements, constraints, and goals.
    Organize information into a comprehensive architecture document with clear sections.`,
    initialQuestions: [
      "What are the key technical requirements?",
      "What are the expected scale and performance needs?",
      "What existing systems does this need to integrate with?"
    ]
  }
};

// Helper function to consult with an expert
async function consultWithExpert(role, userInput) {
  const expert = experts[role];
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
    
    // Handle different content block types
    const content = response.content[0];
    if ('text' in content) {
      return content.text;
    } else {
      console.error('Unexpected content format:', content);
      return 'Error: Unexpected response format from Claude API';
    }
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

// Create the MCP server
function createMCPServer() {
  const server = new McpServer({
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
  }, async (params) => {
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

After consulting with each expert, you can ask follow-up questions to refine the details.` }]
    };
  });
  
  return server;
}

// Main function to start the server
async function main() {
  try {
    console.log('Starting AI Expert Workflow MCP Server...');
    
    const server = createMCPServer();
    
    console.log('Server created, initializing transport...');
    
    const transport = new StdioServerTransport();
    
    console.log('Starting server...');
    
    await server.connect(transport);
    
    console.log('Server terminated.');
  } catch (error) {
    console.error('Error starting server:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// Start the server
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
