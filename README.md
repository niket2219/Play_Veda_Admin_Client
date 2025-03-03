# React App Setup and Running Instructions

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- Node.js (LTS version recommended) -> https://nodejs.org/
- npm (comes with Node.js) or yarn (alternative package manager)

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```sh
   npm start
   # or
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Common Issues and Fixes

### 1. `npm start` not working or showing errors
- Ensure Node.js is installed correctly: `node -v` and `npm -v`
- Delete `node_modules` and `package-lock.json` (or `yarn.lock`), then reinstall:
  ```sh
  rm -rf node_modules package-lock.json
  npm install
  ```

### 2. `EADDRINUSE: Address already in use`
- The default port (3000) might be in use. Try running:
  ```sh
  npm start -- --port=3001
  ```

### 3. `Module not found` or missing dependencies
- Ensure all dependencies are installed: `npm install`
- If using Yarn, try: `yarn install`

### 4. `CORS Policy` issue while calling APIs
- Ensure the backend allows CORS or use a proxy in `package.json`:
  ```json
  "proxy": "http://localhost:5000"
  ```

For further troubleshooting, refer to React documentation: https://reactjs.org/docs/getting-started.html
