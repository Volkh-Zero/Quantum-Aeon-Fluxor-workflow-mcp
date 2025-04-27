// Direct test script for OpenRouter API using the API key from .env
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Get API key directly from .env file
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/OPENROUTER_API_KEY=(.+)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : '';

if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY is required but not found in .env file');
  process.exit(1);
}

// Log the API key (first few characters) for debugging
console.log(`Using API key: ${apiKey.substring(0, 10)}...`);

// Test function to call OpenRouter API
async function testOpenRouterAPI() {
  console.log('Testing OpenRouter API...');

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://github.com/bacoco/ai-expert-workflow-mcp',
        'X-Title': 'AI Expert Workflow MCP Test'
      },
      body: JSON.stringify({
        model: 'tngtech/deepseek-r1t-chimera:free',
        max_tokens: 100,
        temperature: 0.7,
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

    console.log('\n=== OpenRouter API Test Results ===');
    console.log('Status: SUCCESS');
    console.log('Response:');
    console.log(data.choices[0].message.content);
    console.log('\nModel used:', data.model);
    console.log('Tokens used:', data.usage.total_tokens);

    return true;
  } catch (error) {
    console.error('\n=== OpenRouter API Test Results ===');
    console.error('Status: FAILED');
    console.error('Error:', error.message);
    return false;
  }
}

// Run the test
testOpenRouterAPI().then(success => {
  if (success) {
    console.log('\nTest successful! Your OpenRouter API key is working correctly.');
    process.exit(0);
  } else {
    console.error('\nTest failed! Please check your API key and try again.');
    process.exit(1);
  }
});
