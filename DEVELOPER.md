```
npm init
```

```
npm i -D typescript
```

```
npx tsc --init
```

Changes to tsconfig.json

"module": "esnext"
"sourceMap": true
"moduleResolution": "node"
"outDir": "dist"

Add to build script to package.json

```
"scripts": {
    "build": "tsc"
}
```
