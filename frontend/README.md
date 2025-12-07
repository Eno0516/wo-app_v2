# frontendの説明
  
## リポジトリー構成
```text
.
├── .firebase/
├── .openapi/
├── dist/
├── node_modules/
├── public/
├── src/
├── .env.deployment
├── .env.production
├── Dockerfile.prod
├── .firebase
├── .gitignore
├── Dockerfile
├── eslint.config.js
├── firebase.json
├── index.html
├── .package-lock.json
├── .package.json
├── tscongig.app.json
├── tscongig.app.tsbuilinfo
├── tscongig.json
├── tscongig.node.json
├── tscongig.node.tsbuildinfo
├── vite.config.json
├── README.md
```

### src/user/components 
* UI表示に必要なコンポーネントを管理する
* 1機能を提供するコンポーネント（ボタンなど）に対し、1つのフォルダを作って管理する
  * 例
  ```text
  componetns
  ├── MemberPage/
      └── Button/
          └── Button.tsx
          └── Button.css
          └── composable.ts
          └── Funk~~.ts
  ```
  * 一つのコンポーネントに対しフォルダを1つ作成し、その中にtsxファイルとcssファイルを作成する
    * 初期に作ったものはこれに従っていないため、順次リファクタリング
  * tsxファイルのロジック部分が共通化出来る場合はuser/hooksに切り出す
  * 単純にファイルが長く可読性が落ちるなどの理由でロジックを切り出す場合は、  
    同じフォルダ内に関数名.tsファイルのように基本的には関数単位でロジックを切り出す
  * 小さな関数や、関数が密関係な場合はcomposable.tsファイルにまとめて切り出す

# 自動生成ReadMe React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
