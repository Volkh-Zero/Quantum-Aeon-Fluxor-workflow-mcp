import { createMCPServer } from './mcp';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function main() {
  try {
    // Check if OPENROUTER_API_KEY is set
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('Error: OPENROUTER_API_KEY is required but not set in the environment');
      process.exit(1);
    }

    // Log which model we're using
    console.log(`Using OpenRouter API with model: ${process.env.OPENROUTER_MODEL || 'default model'}`);

    console.log('Starting AI Expert Workflow MCP Server...');

    const server = createMCPServer();

    console.log('Server created, initializing transport...');

    // Use MCP stdio transport
    const { StdioServerTransport } = require('@modelcontextprotocol/sdk/dist/cjs/server/stdio.js');
    const transport = new StdioServerTransport();

    console.log('Starting server...');

    await server.connect(transport);

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
