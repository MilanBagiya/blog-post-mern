# React + TypeScript + Vite + Node.js

This template provides a minimal setup to get React working with Vite, featuring Hot Module Replacement (HMR) and some ESLint rules.

Currently, two official plugins are available for integration:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) - Utilizes [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) - Employs [SWC](https://swc.rs/) for Fast Refresh

## Setting up the Frontend (Client)

1. **Clone the Repository**: Clone the repository and navigate to the `client` folder.
2. **Install Dependencies**: Run `npm install` to install the required packages.
3. **Start Development Server**: Execute `npm run dev` to start the Vite development server.
4. **Access the Application**: Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to view the app.

## Setting up the Backend (Server)

1. **Navigate to Server Folder**: Change directory to the `server` folder.
2. **Install Dependencies**: Run `npm install` to install server dependencies.
3. **Environment Configuration**: Create a `.env` file in the server directory containing your MongoDB connection string.
4. **Start the Server**: Execute `npm run dev` to launch the server.
5. **Server Access**: Open your browser and go to [http://localhost:3000](http://localhost:3000) to check the server status.

- **Node Server**: [https://blog-post-mern.onrender.com/](https://blog-post-mern.onrender.com/)

- **Frontend Application**: [https://blog-post-mern-git-main-milanbagiyas-projects.vercel.app/](https://blog-post-mern-git-main-milanbagiyas-projects.vercel.app/)

## Expanding the ESLint Configuration

For production-level applications, it is advisable to enhance the ESLint configuration to enable type-aware linting rules. This ensures better code quality and consistency.

To do this, consider integrating additional ESLint plugins and configurations that support TypeScript type-checking, such as:

- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`

Example configuration in `.eslintrc.js`:

```javascript
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    // Add your custom rules here
  },
};
```

Ensure that your `tsconfig.json` is correctly set up to work with ESLint for type-aware linting.
