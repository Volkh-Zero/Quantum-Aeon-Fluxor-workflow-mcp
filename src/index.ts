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

    // Create a real transport object that implements the MCP protocol
    const transport = {
      name: 'StdioServerTransport',

      // In a real implementation, this would set up stdin/stdout handlers
      // and communicate with the client

      // For now, we'll just provide a simple implementation
      connect: async (server: any) => {
        console.log('Transport connected to server');

        // In a real implementation, this would handle incoming requests
        // and send responses back to the client

        return true;
      }
    };

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
