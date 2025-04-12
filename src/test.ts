import { createMCPServer } from './mcp';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testConsultExpert() {
  console.log('Testing consultExpert tool...');
  
  const server = createMCPServer();
  
  const result = await server.handleToolCall({
    name: 'consultExpert',
    arguments: {
      role: 'productManager',
      projectInfo: 'I want to build a task management app for developers'
    }
  });
  
  console.log('Result:');
  console.log(JSON.stringify(result, null, 2));
}

async function testExpertWorkflow() {
  console.log('Testing expertWorkflow tool...');
  
  const server = createMCPServer();
  
  const result = await server.handleToolCall({
    name: 'expertWorkflow',
    arguments: {}
  });
  
  console.log('Result:');
  console.log(JSON.stringify(result, null, 2));
}

async function main() {
  try {
    // Check if ANTHROPIC_API_KEY is set
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('Error: ANTHROPIC_API_KEY is required but not set in the environment');
      process.exit(1);
    }
    
    await testExpertWorkflow();
    console.log('\n-----------------------------------\n');
    await testConsultExpert();
  } catch (error) {
    console.error('Test error:', error);
  }
}

// Run the tests
main().catch(console.error); 