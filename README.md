# LLMFlow - frontend

LLMFlow - A programming language for LLM Apps

### Setting up the Project

1. Ensure Node.js and npm is installed ([NodeJS](https://nodejs.org/en))
   > Note: npm should install with Node automatically with default settings
2. In the project, run `npm install`
3. Start up the development server with `npm run start`

Application should start up on http://localhost:3000.  
For full frontend capabilities, back sure the [backend](https://github.com/DevArtech/llmflow-backend) is also running on http://localhost:8000

### Using environment variables

1. Create a .env file in the root directory
2. Add environment variables in the format `REACT_APP_<VARIABLE_NAME>="<VALUE>"` (Example: `REACT_APP_BASE_URL="http://localhost:11434"`)
3. Reload the development server, all node input fields with the same name as the environment variable will be prefilled with the value.

All nodes which use the above variables will be automatically prefilled with the environment variable.
