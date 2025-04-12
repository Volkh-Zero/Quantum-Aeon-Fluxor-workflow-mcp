import { McpClient } from '../src/mcpClient';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

describe('McpClient', () => {
  let client: McpClient;
  
  beforeEach(() => {
    client = new McpClient();
  });

  test('should initialize with configured API key', () => {
    expect(client).toBeDefined();
    expect(client.isConfigured()).toBe(true);
  });

  test('should throw error if API key is not set', () => {
    // Temporarily unset the API key
    const originalKey = process.env.MCP_API_KEY;
    process.env.MCP_API_KEY = '';
    
    expect(() => new McpClient()).toThrow('MCP API key is not configured');
    
    // Restore the original key
    process.env.MCP_API_KEY = originalKey;
  });

  test('should create a model context', async () => {
    const context = await client.createContext({
      name: 'Test context',
      description: 'A test context'
    });
    
    expect(context).toBeDefined();
    expect(context.id).toBeDefined();
    expect(context.name).toBe('Test context');
  });
}); 