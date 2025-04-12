#!/bin/bash

# Run TypeScript tests using the OpenRouter API
echo "Running TypeScript tests using OpenRouter..."
echo "Make sure your .env file has a valid OPENROUTER_API_KEY"

# Set environment variable to show console output during tests
export TEST_DEBUG=true

# Run the test with ts-node
npx ts-node ./tests/test-openrouter.ts

# Check if tests passed
if [ $? -eq 0 ]; then
  echo -e "\n✅ All TypeScript tests passed!"
else
  echo -e "\n❌ Some tests failed. Check the output above for details."
fi
