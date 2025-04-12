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
    const fullPath = path.join(__dirname, templatePath);
    return await fs.readFile(fullPath, 'utf8');
  } catch (error) {
    console.error('Error reading template:', error);
    throw error;
  }
} 