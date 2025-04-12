import { createMCPServer } from './mcp';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function main() {
  let serverInfo;
  try {
    // Check if OPENROUTER_API_KEY is set
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('Error: OPENROUTER_API_KEY is required but not set in the environment');
      process.exit(1);
    }

    // Log which model we're using
    console.log(`Using OpenRouter API with model: ${process.env.OPENROUTER_MODEL || 'default model'}`);

    console.log('Starting AI Expert Workflow MCP Server...');

    // Try to create the server
    const server = createMCPServer();

    // If server creation failed, retry after a delay
    if (!server) {
      console.log('Waiting for MCP SDK to load...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      const retryServer = createMCPServer();
      if (!retryServer) {
        console.error('Failed to create MCP server after retry. Please check the MCP SDK installation.');
        process.exit(1);
      }
      console.log('Server created on retry, initializing transport...');

      try {
        const stdioModule = await import('@modelcontextprotocol/sdk/server/stdio.js');
        const transport = new stdioModule.StdioServerTransport();
        serverInfo = { server: retryServer, transport };

        console.log('Starting server...');
        await serverInfo.server.connect(serverInfo.transport);
        console.log('Server terminated.');
        return;
      } catch (error) {
        console.error('Error importing StdioServerTransport:', error);
        process.exit(1);
      }
    }

    console.log('Server created, initializing transport...');

    // Use MCP stdio transport
    try {
      const stdioModule = await import('@modelcontextprotocol/sdk/server/stdio.js');
      const transport = new stdioModule.StdioServerTransport();
      serverInfo = { server, transport };
    } catch (error) {
      console.error('Error importing StdioServerTransport:', error);
      process.exit(1);
    }

    // Connect the server to the transport
    if (serverInfo) {
      console.log('Starting server...');
      await serverInfo.server.connect(serverInfo.transport);
      console.log('Server terminated.');
    }
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
