# OpenRouter for AI Expert Workflow

This project uses [OpenRouter](https://openrouter.ai/) as its AI provider, which allows you to access various AI models through a unified API.

## Setup

1. Sign up for an account at [OpenRouter](https://openrouter.ai/)
2. Create an API key at [https://openrouter.ai/keys](https://openrouter.ai/keys)
3. Add your API key to the `.env` file:

```
OPENROUTER_API_KEY=your_api_key_here
OPENROUTER_MODEL=tngtech/deepseek-r1t-chimera:free
```

This project uses the `tngtech/deepseek-r1t-chimera:free` model by default, which provides good performance while being cost-effective. You can change the model to any model supported by OpenRouter. See the [list of available models](https://openrouter.ai/models).

## Using OpenRouter in Your Code

The project uses OpenRouter for all AI capabilities through the `aiUtils.ts` module:

```typescript
import { consultWithExpert, generateExpertDocument } from './utils/aiUtils';

// Use the functions to interact with AI models via OpenRouter
const response = await consultWithExpert('productManager', 'My project description');
```

## Testing OpenRouter Integration

The project includes comprehensive tests for the OpenRouter integration:

```bash
# Run JavaScript tests
npm test

# Run TypeScript tests
npm run test:ts

# Or use the shell scripts
./tests/run-js-test.sh
./tests/run-ts-test.sh
```

Test results will be saved to `tests/results/result_test.md` and `tests/results/result_test_ts.md`. These files contain detailed information about the API requests and responses, making it easy to debug and understand how the OpenRouter API works.

These tests verify:
1. Consulting with all three experts (Product Manager, UX Designer, Software Architect)
2. Generating documents for each expert
3. Error handling for invalid inputs

## Benefits of Using OpenRouter

1. **Access to multiple models**: OpenRouter provides access to various AI models from different providers.
2. **Fallback options**: If one model is unavailable, OpenRouter can automatically route to another model.
3. **Unified API**: Use the same API for different models.
4. **Cost optimization**: OpenRouter can help optimize costs by routing to the most cost-effective model.

## Available Models

OpenRouter supports many models, including:

- `anthropic/claude-3-opus-20240229`
- `anthropic/claude-3-sonnet-20240229`
- `anthropic/claude-3-haiku-20240307`
- `openai/gpt-4o`
- `openai/gpt-4-turbo`
- `openai/gpt-3.5-turbo`
- And many more

For a complete list, see [https://openrouter.ai/models](https://openrouter.ai/models).

## API Reference

For more information about the OpenRouter API, see the [API Reference](https://openrouter.ai/docs/api-reference/overview).
