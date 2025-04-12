#!/bin/bash

# Run comprehensive tests using the OpenRouter API
echo "Running comprehensive tests using OpenRouter..."
echo "Make sure your .env file has a valid OPENROUTER_API_KEY"

# Set environment variable to show console output during tests
export TEST_DEBUG=true

# Run the test with node
node test-openrouter.js

# Check if tests passed
if [ $? -eq 0 ]; then
  echo -e "\n✅ All comprehensive tests passed!"
else
  echo -e "\n❌ Some tests failed. Check the output above for details."
fi
