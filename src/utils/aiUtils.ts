import Anthropic from 'anthropic';
import dotenv from 'dotenv';
import { experts } from '../experts';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function consultWithExpert(role: string, userInput: string): Promise<string> {
  const expert = experts[role];
  if (!expert) {
    throw new Error(`Unknown expert role: ${role}`);
  }
  
  try {
    const response = await anthropic.messages.create({
      model: process.env.MODEL || 'claude-3-sonnet-20240229',
      max_tokens: parseInt(process.env.MAX_TOKENS || '4000'),
      temperature: parseFloat(process.env.TEMPERATURE || '0.7'),
      system: expert.systemPrompt,
      messages: [
        { role: 'user', content: userInput }
      ]
    });
    
    return response.content[0].text;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

export async function generateExpertDocument(role: string, template: string, userInput: string): Promise<string> {
  const expert = experts[role];
  if (!expert) {
    throw new Error(`Unknown expert role: ${role}`);
  }
  
  const enhancedPrompt = `${expert.systemPrompt}\n\nPlease use the following template structure for your response:\n\n${template}\n\nBased on the user's input, create a complete, well-structured document. Format your response using Markdown with clear sections and subsections.`;
  
  try {
    const response = await anthropic.messages.create({
      model: process.env.MODEL || 'claude-3-sonnet-20240229',
      max_tokens: parseInt(process.env.MAX_TOKENS || '8000'),
      temperature: parseFloat(process.env.TEMPERATURE || '0.5'),
      system: enhancedPrompt,
      messages: [
        { role: 'user', content: userInput }
      ]
    });
    
    return response.content[0].text;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

// Special function to save PRD in the format Task Master expects
export async function saveForTaskMaster(content: string): Promise<string> {
  try {
    // Create scripts directory if it doesn't exist
    const scriptsDir = path.join(process.cwd(), 'scripts');
    try {
      await fs.mkdir(scriptsDir, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }
    
    // Save to scripts/prd.txt for Task Master compatibility
    const filePath = path.join(scriptsDir, 'prd.txt');
    await fs.writeFile(filePath, content, 'utf8');
    
    return filePath;
  } catch (error) {
    console.error('Error saving for Task Master:', error);
    throw error;
  }
} 