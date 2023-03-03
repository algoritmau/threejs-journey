# 05. Transforming Objects

I've set up a custom Vite config to use TypeScript and Sass.

## Setup

Run this following commands to install the dependencies, start the development server, and build for production:

```bash
# Install dependencies (only the first time)
pnpm install

# Run the local server at localhost:5173
pnpm dev

# Build for production in the dist/ directory
pnpm build
```

## Lesson

There are four properties to transform objects: `position`, `scale`, `rotation`, and `quaternion`. All these properties are compiled to matrices.

All of the `Object3D` inheriting classes have those properties. For instance, `PerspectiveCamera` or `Mesh`.
