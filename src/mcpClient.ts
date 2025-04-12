import { McpSDK } from '@modelcontextprotocol/sdk';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface ContextOptions {
  name: string;
  description?: string;
}

interface Context {
  id: string;
  name: string;
  description?: string;
}

export class McpClient {
  private sdk: McpSDK;
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.MCP_API_KEY || '';
    
    if (!this.apiKey) {
      throw new Error('MCP API key is not configured');
    }
    
    this.sdk = new McpSDK({
      apiKey: this.apiKey
    });
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  async createContext(options: ContextOptions): Promise<Context> {
    try {
      const result = await this.sdk.createContext({
        name: options.name,
        description: options.description
      });
      
      return {
        id: result.id,
        name: result.name,
        description: result.description
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to create context: ${errorMessage}`);
    }
  }
} 