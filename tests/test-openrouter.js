// Comprehensive test script for OpenRouter API and MCP functionality
const fetch = require('node-fetch');
const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Import the MCP server creation function
const { createMCPServer } = require('../dist/mcp');

// Get OpenRouter API key directly from the .env file
// Note: fs and path are already imported at the top
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/OPENROUTER_API_KEY=(.+)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : '';

// Also get the model from the .env file
const modelMatch = envContent.match(/OPENROUTER_MODEL=(.+)/);
const model = modelMatch ? modelMatch[1].trim() : 'tngtech/deepseek-r1t-chimera:free';

if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY is required but not found in .env file');
  process.exit(1);
}

// Test function to call OpenRouter API
async function testOpenRouterAPI() {
  console.log('Testing OpenRouter API...');

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://github.com/yourusername/ai-expert-workflow-mcp',
        'X-Title': 'AI Expert Workflow MCP Test'
      },
      body: JSON.stringify({
        model: model, // Use the model from .env file
        max_tokens: parseInt(process.env.MAX_TOKENS || '1000', 10),
        temperature: parseFloat(process.env.TEMPERATURE || '0.7'),
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Say "OpenRouter API is working correctly with the deepseek-r1t-chimera model!" if you can read this message.' }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenRouter API error: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();

    // Create results directory if it doesn't exist
    const resultsDir = path.join(__dirname, 'results');
    await fsPromises.mkdir(resultsDir, { recursive: true });

    // Save test results
    const resultPath = path.join(resultsDir, 'result_test.md');
    const resultContent = `# OpenRouter API Test Results

## Request
- Model: ${model}
- Max Tokens: ${process.env.MAX_TOKENS || '1000'}
- Temperature: ${process.env.TEMPERATURE || '0.7'}
- Query: "Say 'OpenRouter API is working correctly with the deepseek-r1t-chimera model!' if you can read this message."

## Response
${data.choices[0].message.content}

## API Response Details
\`\`\`json
${JSON.stringify(data, null, 2)}
\`\`\`
`;

    await fsPromises.writeFile(resultPath, resultContent, 'utf8');

    console.log('Test completed successfully!');
    console.log(`Results saved to ${resultPath}`);
    console.log('\nAPI Response:');
    console.log(data.choices[0].message.content);

    return true;
  } catch (error) {
    console.error('Error testing OpenRouter API:', error.message);
    return false;
  }
}

// Test function to verify MCP server creation
async function testMCPServer() {
  console.log('\nTesting MCP server creation...');

  try {
    // Create the MCP server
    const server = createMCPServer();

    // Verify the server has the expected tools
    const tools = ['consultExpert', 'generateDocument', 'expertWorkflow'];
    let allToolsFound = true;

    for (const tool of tools) {
      if (!server.server.tools[tool]) {
        console.error(`Error: Tool '${tool}' not found in MCP server`);
        allToolsFound = false;
      }
    }

    if (allToolsFound) {
      console.log('MCP server created successfully with all expected tools!');
      return true;
    } else {
      console.error('Error: MCP server is missing some expected tools');
      return false;
    }
  } catch (error) {
    console.error('Error creating MCP server:', error.message);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('Running all tests...\n');

  // Test OpenRouter API
  const apiTestSuccess = await testOpenRouterAPI();

  // Test MCP server creation
  const mcpTestSuccess = await testMCPServer();

  // Report overall results
  console.log('\n=== Test Results ===');
  console.log(`OpenRouter API Test: ${apiTestSuccess ? 'PASSED' : 'FAILED'}`);
  console.log(`MCP Server Test: ${mcpTestSuccess ? 'PASSED' : 'FAILED'}`);

  // Exit with appropriate code
  if (apiTestSuccess && mcpTestSuccess) {
    console.log('\nAll tests passed successfully!');
    process.exit(0);
  } else {
    console.error('\nSome tests failed. Please check the logs above for details.');
    process.exit(1);
  }
}

// Run all tests
runAllTests();
