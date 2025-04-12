#!/bin/bash

# Run JavaScript tests using the OpenRouter API
echo "Running JavaScript tests using OpenRouter..."
echo "Make sure your .env file has a valid OPENROUTER_API_KEY"

# Set environment variable to show console output during tests
export TEST_DEBUG=true

# Run the test with node
node tests/test-openrouter-updated.js

# Check if tests passed
if [ $? -eq 0 ]; then
  echo -e "\n✅ All JavaScript tests passed!"
  echo -e "📝 Test results saved to tests/results/result_test.md"
else
  echo -e "\n❌ Some tests failed. Check the output above for details."
  echo -e "📝 Test results saved to tests/results/result_test.md"
fi
