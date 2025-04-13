#!/usr/bin/env node

/**
 * Automated PRD Generation and Task Master Integration
 * 
 * This script automates the entire workflow:
 * 1. Generates a PRD using the AI Expert Workflow
 * 2. Saves it in Task Master compatible format
 * 
 * Usage: 
 *   - npm package: npx ai-expert-workflow-generate "Your detailed project description"
 *   - local: node generate-and-parse.js "Your detailed project description"
 */

const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Check if OpenRouter API key is set
if (!process.env.OPENROUTER_API_KEY) {
  console.error('❌ Error: OPENROUTER_API_KEY is not set in your environment variables');
  console.log('Please set this in your .env file or environment variables');
  process.exit(1);
}

// Get project description from command line arguments
const projectDescription = process.argv.slice(2).join(' ');
if (!projectDescription) {
  console.error('❌ Error: No project description provided');
  console.log('Usage:');
  console.log('  - npm package: npx ai-expert-workflow-generate "Your detailed project description"');
  console.log('  - local: node generate-and-parse.js "Your detailed project description"');
  process.exit(1);
}

// Import utilities
const { generateExpertDocument, saveForTaskMaster } = require('./dist/utils/aiUtils');
const { readTemplate } = require('./dist/utils/fileUtils');
const { experts } = require('./dist/experts');

// Function to check if Task Master AI is installed
function isTaskMasterInstalled() {
  try {
    const result = execSync('npm list -g task-master-ai', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
    return result.includes('task-master-ai');
  } catch (error) {
    return false;
  }
}

// Function to provide Task Master integration instructions
function provideTaskMasterInstructions(prdPath) {
  console.log('\n📋 Task Master Integration Options:');
  
  // Option 1: MCP integration (recommended)
  console.log('\n1️⃣ Option 1: MCP Integration (Recommended)');
  console.log('   Add the Task Master MCP to your editor configuration:');
  console.log('   ```json');
  console.log('   "mcpServers": {');
  console.log('     "taskmaster-ai": {');
  console.log('       "command": "npx",');
  console.log('       "args": ["-y", "task-master-ai"],');
  console.log('       "env": {');
  console.log('         "ANTHROPIC_API_KEY": "YOUR_ANTHROPIC_API_KEY_HERE",');
  console.log('         "MODEL": "claude-3-sonnet-20240229"');
  console.log('       }');
  console.log('     }');
  console.log('   }');
  console.log('   ```');
  console.log('   Then, ask your AI assistant:');
  console.log(`   "Can you parse the PRD at ${prdPath} and generate tasks?"`);
  
  // Option 2: CLI usage
  console.log('\n2️⃣ Option 2: Command Line Usage');
  console.log('   1. Install Task Master:');
  console.log('      npm install -g task-master-ai');
  console.log('   2. Parse the PRD:');
  console.log(`      task-master parse-prd ${prdPath}`);
}

async function main() {
  try {
    console.log('🚀 Starting automated PRD generation and task parsing workflow');
    console.log('\n📝 Step 1: Generating PRD document from your project description...');
    
    // Get the product manager template
    const templatePath = 'templates/prd-template.md';
    const template = await readTemplate(templatePath);
    
    // Generate the PRD document
    const document = await generateExpertDocument(
      'productManager', 
      template,
      projectDescription
    );
    
    console.log('✅ PRD generation complete');
    
    // Save the document in Task Master format
    console.log('\n💾 Step 2: Saving document in Task Master compatible format...');
    const tmPath = await saveForTaskMaster(document);
    console.log(`✅ Saved at ${tmPath}`);
    
    // Check if task-master-ai is installed
    console.log('\n🔍 Step 3: Checking for Task Master installation...');
    const taskMasterInstalled = isTaskMasterInstalled();
    
    try {
      // Save the document to a predictable location for Task Master
      const scriptDir = path.join(process.cwd(), 'scripts');
      const prdPath = path.join(scriptDir, 'prd.txt');
      
      // Ensure scripts directory exists
      if (!fs.existsSync(scriptDir)) {
        fs.mkdirSync(scriptDir, { recursive: true });
      }
      
      // Save the PRD
      fs.writeFileSync(prdPath, document, 'utf8');
      console.log('✅ PRD saved for Task Master parsing');
      
      if (taskMasterInstalled) {
        console.log('\n⚠️ Task Master AI found globally installed, but recommended usage is via MCP integration.');
        provideTaskMasterInstructions(prdPath);
      } else {
        console.log('\n⚠️ Task Master AI not found globally installed.');
        provideTaskMasterInstructions(prdPath);
      }
    } catch (error) {
      console.error('❌ Error during Task Master integration:', error.message);
    }
    
    console.log('\n✅ Workflow complete!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main(); 