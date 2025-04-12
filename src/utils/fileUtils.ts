import fs from 'fs/promises';
import path from 'path';

export async function saveDocument(content: string, filename: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), filename);
    await fs.writeFile(filePath, content, 'utf8');
    return filePath;
  } catch (error) {
    console.error('Error saving document:', error);
    throw error;
  }
}

export async function readTemplate(templatePath: string): Promise<string> {
  try {
    const fullPath = path.join(__dirname, '..', '..', templatePath);
    return await fs.readFile(fullPath, 'utf8');
  } catch (error) {
    console.error('Error reading template:', error);
    
    // Fallback to default templates if file not found
    if (templatePath.includes('prd-template.md')) {
      return `# Product Requirements Document\n\n## Product Overview\n[Overview goes here]\n\n## Problem Statement\n[Problem statement goes here]`;
    } else if (templatePath.includes('ux-doc-template.md')) {
      return `# UX Design Document\n\n## User Personas\n[User personas go here]`;
    } else if (templatePath.includes('software-spec-template.md')) {
      return `# Software Specification\n\n## System Architecture Overview\n[System architecture overview goes here]`;
    }
    
    throw error;
  }
}

// Create Task Master integration files
export async function setupTaskMasterIntegration(): Promise<void> {
  try {
    // Create .cursor directory and rules if it doesn't exist
    const cursorDir = path.join(process.cwd(), '.cursor', 'rules');
    await fs.mkdir(cursorDir, { recursive: true });
    
    // Create dev_workflow.mdc file for Cursor integration
    const devWorkflowContent = `# Task Master Development Workflow

## Overview
- Task Master is an AI-driven development tool that helps organize and manage tasks
- It integrates with Claude and Cursor to provide a seamless development experience
- This workflow explains how to use Task Master effectively

## Commands
- Use \`parse-prd\` to generate tasks from a PRD
- Use \`list\` to see all tasks
- Use \`next\` to get the next task to work on
- Use \`generate\` to generate code for a specific task

## Integration with AI Expert Workflow
- AI Expert Workflow generates comprehensive PRDs
- These PRDs can be parsed by Task Master to create tasks
- The workflow creates a seamless planning-to-implementation pipeline

## Examples
To parse a PRD:
\`\`\`
Can you parse the PRD at scripts/prd.txt and generate tasks?
\`\`\`

To get the next task:
\`\`\`
What's the next task I should work on?
\`\`\`
`;
    
    await fs.writeFile(path.join(cursorDir, 'dev_workflow.mdc'), devWorkflowContent, 'utf8');
    
    return;
  } catch (error) {
    console.error('Error setting up Task Master integration:', error);
    throw error;
  }
} 