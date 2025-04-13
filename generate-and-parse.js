#!/usr/bin/env node

/**
 * Automated PRD Generation and Task Master Integration
 * 
 * This script automates the entire workflow:
 * 1. Generates a PRD using the AI Expert Workflow
 * 2. Saves it in Task Master compatible format
 * 3. Automatically triggers Task Master to parse it and generate tasks
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

// Function to check if Task Master MCP is installed
function isTaskMasterInstalled() {
  try {
    const result = execSync('npm list -g task-master-mcp', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
    return result.includes('task-master-mcp');
  } catch (error) {
    return false;
  }
}

// Function to launch Task Master and parse the PRD
function launchTaskMaster(prdPath) {
  return new Promise((resolve, reject) => {
    console.log('\n🚀 Launching Task Master to parse your PRD...');
    
    // Check if we're in Cursor environment
    const isCursor = process.env.CURSOR_SESSION_ID || process.env.CURSOR_CONTEXT;
    
    if (isCursor) {
      console.log('✨ Detected Cursor environment. Please use the following command to parse your PRD:');
      console.log(`\n"Can you parse the PRD at ${prdPath} and generate tasks?"`);
      return resolve(false);
    }
    
    try {
      // Create a command to directly invoke task-master-mcp for CLI usage
      const taskMasterProcess = spawn('npx', ['task-master-mcp', '--parse-prd', prdPath], {
        stdio: 'inherit',
        shell: true
      });
      
      taskMasterProcess.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Task Master successfully parsed your PRD');
          resolve(true);
        } else {
          console.error(`❌ Task Master exited with code ${code}`);
          resolve(false);
        }
      });
      
      taskMasterProcess.on('error', (err) => {
        console.error('❌ Error launching Task Master:', err.message);
        resolve(false);
      });
    } catch (error) {
      console.error('❌ Error launching Task Master:', error.message);
      resolve(false);
    }
  });
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
    
    // Check if task-master-mcp is installed
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
        console.log('\n🔄 Step 4: Automatically parsing PRD with Task Master...');
        const success = await launchTaskMaster(prdPath);
        
        if (!success) {
          console.log('\nℹ️  You can manually parse the PRD with Task Master using:');
          console.log('   "Can you parse the PRD at scripts/prd.txt and generate tasks?"');
        }
      } else {
        console.log('\n⚠️  Task Master MCP not found globally installed.');
        console.log('\nTo complete the workflow:');
        console.log('\n1. Install Task Master if not already installed:');
        console.log('   npm install -g task-master-mcp');
        console.log('\n2. Ask Task Master to generate tasks:');
        console.log('   "Can you parse the PRD at scripts/prd.txt and generate tasks?"');
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