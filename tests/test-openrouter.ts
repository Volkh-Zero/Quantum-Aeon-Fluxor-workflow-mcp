// Comprehensive TypeScript test file for OpenRouter integration
import dotenv from 'dotenv';
import path from 'path';
import fetch from 'node-fetch';
import fs from 'fs/promises';

// Create a results file
let testResults = '# OpenRouter API Test Results (TypeScript)\n\n';
testResults += `Test run on: ${new Date().toISOString()}\n\n`;

// Function to append to results file
async function appendToResults(content: string): Promise<void> {
  testResults += content + '\n\n';
  // Also log to console
  console.log(content);
}

// Load environment variables
dotenv.config();

appendToResults('🧪 Comprehensive Testing of AI Expert Workflow MCP with OpenRouter API (TypeScript)');

// Check API key
const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
  appendToResults('❌ No OPENROUTER_API_KEY found in .env file!');
  appendToResults('Please add your API key to the .env file in the project root.');
  process.exit(1);
}

appendToResults('✅ API key found in .env file');
appendToResults(`🔑 Using model: ${process.env.OPENROUTER_MODEL || 'default model'}`);

// Expert definitions
interface Expert {
  title: string;
  systemPrompt: string;
}

interface TestResult {
  success: boolean;
  response?: string;
  error?: string;
  filename?: string;
}

const experts: Record<string, Expert> = {
  productManager: {
    title: 'Product Manager',
    systemPrompt: 'You are an AI Product Manager expert. Help the user create a comprehensive product strategy and requirements document.'
  },
  uxDesigner: {
    title: 'UX Designer',
    systemPrompt: 'You are an AI UX Design expert. Help the user create intuitive and effective user experiences.'
  },
  softwareArchitect: {
    title: 'Software Architect',
    systemPrompt: 'You are an AI Software Architecture expert. Help the user design robust, scalable software systems.'
  }
};

// Test function: Consult with a specific expert
async function consultWithExpert(role: string, input: string): Promise<TestResult> {
  await appendToResults(`\n## Testing consultation with ${role}`);
  
  try {
    const expert = experts[role];
    if (!expert) {
      throw new Error(`Unknown expert role: ${role}`);
    }
    
    await appendToResults(`📤 Sending request to OpenRouter API for ${expert.title}...`);
    
    // Prepare the request body
    const requestBody = {
      model: process.env.OPENROUTER_MODEL || 'openai/gpt-3.5-turbo',
      max_tokens: parseInt(process.env.MAX_TOKENS || '1000', 10),
      temperature: parseFloat(process.env.TEMPERATURE || '0.7'),
      messages: [
        { role: 'system', content: expert.systemPrompt },
        { role: 'user', content: input }
      ]
    };
    
    // Log the request
    await appendToResults('### API Request');
    await appendToResults('```json\n' + JSON.stringify(requestBody, null, 2) + '\n```');
    
    // Make OpenRouter API call
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://github.com/yourusername/ai-expert-workflow-mcp',
        'X-Title': 'AI Expert Workflow MCP Test'
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      await appendToResults('### API Error Response');
      await appendToResults('```json\n' + JSON.stringify(errorData, null, 2) + '\n```');
      throw new Error(`OpenRouter API error: ${response.status} ${JSON.stringify(errorData)}`);
    }
    
    const data = await response.json();
    
    // Log the response
    await appendToResults('### API Response');
    await appendToResults('```json\n' + JSON.stringify(data, null, 2) + '\n```');
    
    // Get the response text
    const responseText = data.choices[0].message.content || '';
    
    // Check the response
    if (responseText && responseText.length > 100) {
      await appendToResults('✅ Received response from OpenRouter API');
      await appendToResults(`📝 Response preview: ${responseText.substring(0, 100)}...`);
      await appendToResults(`📊 Response length: ${responseText.length} characters`);
      await appendToResults(`✅ ${expert.title} consultation test passed!`);
      
      // Save the full response text
      await appendToResults('### Full Response Text');
      await appendToResults('```markdown\n' + responseText + '\n```');
      
      return { success: true, response: responseText };
    } else {
      await appendToResults('❌ Response too short or empty');
      return { success: false, error: 'Response too short or empty' };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    await appendToResults(`❌ ${role} consultation test failed: ${errorMessage}`);
    return { success: false, error: errorMessage };
  }
}

// Test function: Generate a document with a specific expert
async function generateExpertDocument(role: string, template: string, input: string): Promise<TestResult> {
  await appendToResults(`\n## Testing document generation with ${role}`);
  
  try {
    const expert = experts[role];
    if (!expert) {
      throw new Error(`Unknown expert role: ${role}`);
    }
    
    const enhancedPrompt = `${expert.systemPrompt}\n\nPlease use the following template structure for your response:\n\n${template}\n\nBased on the user's input, create a complete, well-structured document. Format your response using Markdown with clear sections and subsections.`;
    
    await appendToResults(`📤 Sending document generation request to OpenRouter API for ${expert.title}...`);
    
    // Prepare the request body
    const requestBody = {
      model: process.env.OPENROUTER_MODEL || 'openai/gpt-3.5-turbo',
      max_tokens: parseInt(process.env.MAX_TOKENS || '2000', 10),
      temperature: parseFloat(process.env.TEMPERATURE || '0.5'),
      messages: [
        { role: 'system', content: enhancedPrompt },
        { role: 'user', content: input }
      ]
    };
    
    // Log the request
    await appendToResults('### API Request');
    await appendToResults('```json\n' + JSON.stringify(requestBody, null, 2) + '\n```');
    
    // Make OpenRouter API call
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://github.com/yourusername/ai-expert-workflow-mcp',
        'X-Title': 'AI Expert Workflow MCP Test'
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      await appendToResults('### API Error Response');
      await appendToResults('```json\n' + JSON.stringify(errorData, null, 2) + '\n```');
      throw new Error(`OpenRouter API error: ${response.status} ${JSON.stringify(errorData)}`);
    }
    
    const data = await response.json();
    
    // Log the response
    await appendToResults('### API Response');
    await appendToResults('```json\n' + JSON.stringify(data, null, 2) + '\n```');
    
    // Get the response text
    const responseText = data.choices[0].message.content || '';
    
    // Check the response
    if (responseText && responseText.length > 500) {
      await appendToResults('✅ Received document from OpenRouter API');
      await appendToResults(`📝 Document preview: ${responseText.substring(0, 100)}...`);
      await appendToResults(`📊 Document length: ${responseText.length} characters`);
      await appendToResults(`✅ ${expert.title} document generation test passed!`);
      
      // Save the document to a test file
      const filename = `tests/results/test-${role}-document-ts.md`;
      
      // Make sure the directory exists
      await fs.mkdir('tests/results', { recursive: true });
      
      await fs.writeFile(filename, responseText, 'utf8');
      await appendToResults(`📄 Document saved to ${filename}`);
      
      // Save the full response text
      await appendToResults('### Document Preview');
      await appendToResults('```markdown\n' + responseText.substring(0, 1000) + '\n... (truncated) ...\n```');
      
      return { success: true, response: responseText, filename };
    } else {
      await appendToResults('❌ Document too short or empty');
      return { success: false, error: 'Document too short or empty' };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    await appendToResults(`❌ ${role} document generation test failed: ${errorMessage}`);
    return { success: false, error: errorMessage };
  }
}

// Test error handling
async function testErrorHandling(): Promise<boolean> {
  await appendToResults('\n## Testing error handling');
  
  try {
    // Test with invalid role
    await appendToResults('Testing with invalid role...');
    const invalidRoleResult = await consultWithExpert('invalidRole', 'Test input');
    if (!invalidRoleResult.success && invalidRoleResult.error?.includes('Unknown expert role')) {
      await appendToResults('✅ Invalid role error handling test passed!');
    } else {
      await appendToResults('❌ Invalid role error handling test failed!');
    }
    
    // Test with empty input
    await appendToResults('Testing with empty input...');
    const emptyInputResult = await consultWithExpert('productManager', '');
    // This should still work, but might return a message asking for more information
    await appendToResults(emptyInputResult.success ? '✅ Empty input handling test passed!' : '❌ Empty input handling test failed!');
    
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    await appendToResults(`❌ Error handling test failed: ${errorMessage}`);
    return false;
  }
}

// Run all tests
async function runTests(): Promise<void> {
  await appendToResults('\n# Running comprehensive tests with OpenRouter API');
  let passed = 0;
  let failed = 0;
  
  // Test consulting with all experts
  const expertRoles = ['productManager', 'uxDesigner', 'softwareArchitect'];
  const consultResults: Record<string, TestResult> = {};
  
  for (const role of expertRoles) {
    const projectInfo = 'I want to build a recipe app that helps users find recipes based on ingredients they have at home.';
    const result = await consultWithExpert(role, projectInfo);
    consultResults[role] = result;
    if (result.success) passed++; else failed++;
  }
  
  // Test document generation for all experts
  const documentResults: Record<string, TestResult> = {};
  
  // Only proceed with document generation if consultation was successful
  if (consultResults.productManager.success) {
    const prdTemplate = `# Product Requirements Document

## Product Overview
[Provide a brief description of the product]

## Problem Statement
[Describe the problem this product solves]

## User Personas
[Describe the target users]

## Feature Requirements
[List the key features]

## MVP Definition
[Define what constitutes the Minimum Viable Product]
`;
    
    const prdResult = await generateExpertDocument(
      'productManager',
      prdTemplate,
      'Recipe app that helps users find recipes based on ingredients they have at home. Target users are home cooks who want to reduce food waste and save money by using what they already have.'
    );
    
    documentResults.productManager = prdResult;
    if (prdResult.success) passed++; else failed++;
  }
  
  if (consultResults.uxDesigner.success) {
    const uxTemplate = `# UX Design Document

## User Personas
[Describe the user personas in detail]

## User Journey Maps
[Map out the key user journeys]

## Information Architecture
[Outline the information structure]

## Wireframe Descriptions
[Describe the key screens and interfaces]

## Prototype Plan
[Outline how the prototype should function]
`;
    
    const uxResult = await generateExpertDocument(
      'uxDesigner',
      uxTemplate,
      'Recipe app with ingredient-based search. Users need to easily input ingredients they have, get matching recipes, save favorites, and generate shopping lists for missing ingredients.'
    );
    
    documentResults.uxDesigner = uxResult;
    if (uxResult.success) passed++; else failed++;
  }
  
  if (consultResults.softwareArchitect.success) {
    const archTemplate = `# Software Architecture Document

## System Architecture Overview
[Provide a high-level overview of the system architecture]

## Technology Stack
[List and justify the technology choices]

## Data Models
[Describe the key data entities and relationships]

## API Specifications
[Outline the key APIs]

## Component Breakdown
[Break down the system into components]

## Security Considerations
[Address key security requirements]
`;
    
    const archResult = await generateExpertDocument(
      'softwareArchitect',
      archTemplate,
      'Recipe app that needs to handle ingredient search, user accounts, recipe database, and shopping list generation. Should be scalable to millions of users and support offline functionality.'
    );
    
    documentResults.softwareArchitect = archResult;
    if (archResult.success) passed++; else failed++;
  }
  
  // Test error handling
  const errorHandlingPassed = await testErrorHandling();
  if (errorHandlingPassed) passed++; else failed++;
  
  // Print summary
  await appendToResults(`\n## Test Summary\n\n🧭 Test Results: ${passed} passed, ${failed} failed`);
  
  // Save the test results to a file
  await fs.mkdir('tests/results', { recursive: true });
  await fs.writeFile('tests/results/result_test_ts.md', testResults, 'utf8');
  console.log(`\n📝 Test results saved to tests/results/result_test_ts.md`);
  
  if (failed > 0) {
    process.exit(1);
  }
}

// Run the tests
runTests().catch(error => {
  console.error('Error running tests:', error instanceof Error ? error.message : String(error));
  process.exit(1);
});
