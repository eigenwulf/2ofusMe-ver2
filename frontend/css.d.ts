declare module '*.css';

// tells TypeScript to accept any .css import without complaining. 
// Since next-env.d.ts and all .ts/.tsx files are already in tsconfig.json's include, 
// it will be picked up automatically.