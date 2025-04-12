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