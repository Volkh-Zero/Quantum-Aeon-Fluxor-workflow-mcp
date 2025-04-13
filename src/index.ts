#!/usr/bin/env node

import { createMCPServer, waitForMcpSdk } from './mcp';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
dotenv.config();

// Get package version
let packageVersion = '2.1.3'; // Default fallback version
try {
  const packageJsonPath = path.resolve(__dirname, '../package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageVersion = packageData.version || packageVersion;
  }
} catch (error) {
  // Silently fallback to default version
}

// Enable debug mode if DEBUG environment variable is set
const isDebugMode = process.env.DEBUG?.includes('mcp') || false;

// Helper functions for logging
function log(...args: any[]) {
  if (isDebugMode) {
    console.log('[AI-EXPERT-MCP]', ...args);
  }
}

function logError(...args: any[]) {
  console.error('[AI-EXPERT-MCP-ERROR]', ...args);
}

async function main() {
  let serverInfo;
  try {
    // Display version info
    console.log(`AI Expert Workflow MCP v${packageVersion}`);
    
    // Check if OPENROUTER_API_KEY is set
    if (!process.env.OPENROUTER_API_KEY) {
      logError('OPENROUTER_API_KEY is required but not set in the environment');
      console.log('\nPlease set your OpenRouter API key using one of these methods:');
      console.log('1. Create a .env file in your project root with:');
      console.log('   OPENROUTER_API_KEY=your_key_here');
      console.log('2. Set it as an environment variable:');
      console.log('   export OPENROUTER_API_KEY=your_key_here');
      console.log('\nYou can get an OpenRouter API key from: https://openrouter.ai/keys');
      process.exit(1);
    }

    // Log which model we're using
    console.log(`Using OpenRouter API with model: ${process.env.OPENROUTER_MODEL || 'default model'}`);
    console.log('Starting AI Expert Workflow MCP Server...');

    // Wait for MCP SDK to load before creating the server
    log('Waiting for MCP SDK to be available...');
    const isMcpSdkAvailable = await waitForMcpSdk();
    
    if (!isMcpSdkAvailable) {
      logError('Failed to load MCP SDK after multiple retries.');
      logError('This may be due to:');
      logError('1. Missing or incompatible MCP SDK installation');
      logError('2. Network issues preventing module loading');
      logError('3. Permissions issues in the node_modules directory');
      process.exit(1);
    }

    // Try to create the server
    log('Creating MCP server...');
    const server = createMCPServer();

    // If server creation failed
    if (!server) {
      logError('Failed to create MCP server. Please check the MCP SDK installation.');
      process.exit(1);
    }

    console.log('Server created, initializing transport...');

    // Use MCP stdio transport
    try {
      log('Importing StdioServerTransport...');
      const stdioModule = await import('@modelcontextprotocol/sdk/server/stdio.js');
      
      if (!stdioModule || !stdioModule.StdioServerTransport) {
        throw new Error('StdioServerTransport not found in MCP SDK');
      }
      
      log('Creating transport...');
      const transport = new stdioModule.StdioServerTransport();
      serverInfo = { server, transport };
    } catch (error) {
      logError('Error importing or initializing StdioServerTransport:', error);
      console.log('\nTroubleshooting steps:');
      console.log('1. Check that @modelcontextprotocol/sdk is installed correctly:');
      console.log('   npm install @modelcontextprotocol/sdk@latest');
      console.log('2. Make sure your Node.js version is compatible (v14 or higher)');
      console.log('3. If you installed globally, you may need to reinstall:');
      console.log('   npm uninstall -g ai-expert-workflow-mcp');
      console.log('   npm install -g ai-expert-workflow-mcp');
      process.exit(1);
    }

    // Connect the server to the transport
    if (serverInfo) {
      console.log('Starting server...');
      log('Connecting server to transport...');
      
      try {
        await serverInfo.server.connect(serverInfo.transport);
        console.log('Server terminated.');
      } catch (error) {
        logError('Error connecting server to transport:', error);
        process.exit(1);
      }
    }
  } catch (error) {
    logError('Unhandled error starting server:', error instanceof Error ? error.message : String(error));
    if (isDebugMode && error instanceof Error && error.stack) {
      logError('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

// Only run if called directly
if (require.main === module) {
  main().catch(error => {
    logError('Unhandled error in main:', error);
    process.exit(1);
  });
}
