# HOW TO START

## Initialize Project

> 1. Install dependencies
```
npm install
```

> 2. Copy and create file ```.env``` from ```.env.template``` and add **AUTH_TOKEN** & **BASE_URL** of the officeless apps. Example **BASE_URL=https://gateway.studio/v1/nocode/record**

> 3. Create test scripts from the provided templates in directory ```./scripts```

> 4. Run the test
```
npm run test
```

## Available Commands

> Run Test
```
npm test
```

> View Test Scripts
```
npm run scenario
npm run scenario units
npm run scenario integrations
```

> View Logs from recent test run
```
npm run logs
```