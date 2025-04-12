# Publishing the AI Expert Workflow MCP

This guide explains how to clone, build, and publish the AI Expert Workflow MCP from the GitHub repository.

## Prerequisites

- Node.js (v16+)
- npm (v7+)
- Anthropic API key
- GitHub account (for forking/publishing)
- npm account (for publishing to npm registry)

## Step 1: Clone the Repository

Clone the existing repository:

```bash
git clone https://github.com/bacoco/ai-expert-workflow-mcp.git
cd ai-expert-workflow-mcp
```

## Step 2: Install Dependencies

Install all required dependencies:

```bash
npm install
```

## Step 3: Configure Environment Variables

Create a `.env` file based on the example:

```bash
cp .env.example .env
```

Edit the `.env` file and add your Anthropic API key:

```
# Anthropic API Key (Required)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Model settings
MODEL=claude-3-sonnet-20240229
MAX_TOKENS=8000
TEMPERATURE=0.7
```

## Step 4: Build and Test Locally

Build the project:

```bash
npm run build
```

Test the MCP server locally:

```bash
npm start
```

You can also run the development server with auto-reloading:

```bash
npm run dev
```

## Step 5: Customize (Optional)

If you want to customize the MCP before publishing:

### Add New Expert Roles

1. Create a new expert file in `src/experts/` (follow existing patterns)
2. Add the new expert to `src/experts/index.ts`
3. Create a template file in `templates/`

### Modify Prompts

Edit the `systemPrompt` in the expert files to customize how each expert responds.

### Update Templates

Modify the template files in the `templates/` directory to change the output document structure.

## Step 6: Update Package Information

Before publishing, update the `package.json` file:

1. Change the package name if you're creating a fork:
   ```json
   "name": "your-custom-name-ai-expert-workflow-mcp",
   ```

2. Update the version number if making changes to an existing package:
   ```json
   "version": "1.0.1",
   ```

3. Update author and repository information:
   ```json
   "author": "Your Name",
   "repository": {
     "type": "git",
     "url": "git+https://github.com/yourusername/your-repo-name.git"
   },
   ```

## Step 7: Publish to npm

Make sure you're logged in to npm:

```bash
npm login
```

Build the package:

```bash
npm run build
```

Publish to the npm registry:

```bash
npm publish
```

If you're publishing a scoped package (e.g., @yourusername/ai-expert-workflow-mcp):

```bash
npm publish --access public
```

## Step 8: Use Your Published MCP

After publishing, users can install your MCP with:

```bash
npm install -g your-package-name
```

And configure it in their Cursor settings.

## Updating Your Published MCP

1. Make your changes to the codebase
2. Update the version in `package.json` (following semantic versioning)
3. Build the project: `npm run build`
4. Publish the update: `npm publish`

## Publishing to GitHub Packages (Alternative)

You can also publish to GitHub Packages instead of or in addition to npm:

1. Update the `package.json` to use your GitHub username:
   ```json
   "name": "@yourusername/ai-expert-workflow-mcp",
   ```

2. Create a `.npmrc` file:
   ```
   @yourusername:registry=https://npm.pkg.github.com
   ```

3. Generate a GitHub token with the appropriate permissions

4. Log in to GitHub Packages:
   ```bash
   npm login --registry=https://npm.pkg.github.com
   ```

5. Publish:
   ```bash
   npm publish
   ```

## Using Your MCP in Development

During development, you can link your local version:

```bash
# In the MCP project directory
npm link

# In a project where you want to use the MCP
npm link ai-expert-workflow-mcp
```

This allows you to test changes without publishing.