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
2. Fill out the following environment variables if you wish to use them:

```
REACT_APP_API_KEY="[insert API key here]"
```

All nodes which use the above variables will be automatically prefilled with the environment variable.
