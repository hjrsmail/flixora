<h1 align="center">🎬 Movie App — React + TypeScript + Vite</h1>

<p align="center">
  A minimalist movie browsing app powered by the <a href="https://www.themoviedb.org/">TMDB API</a>.<br />
  Built using <strong>React</strong>, <strong>TypeScript</strong>, and <strong>Vite</strong>, with clean code, fast refresh, and ESLint integration.
</p>

---

## 🌟 Fitur Utama

- 🎞️ Fetch data film dari [TMDB API](https://www.themoviedb.org/documentation/api)
- ⚛️ Dibangun dengan React, TypeScript, dan Vite
- 🔄 HMR (Hot Module Replacement) untuk development super cepat
- 🧹 Konfigurasi ESLint yang bisa diperluas (type-aware linting)
- 🧪 Siap digunakan untuk proyek produksi
- 🎨 Desain UI yang bersih dan responsif (bisa gunakan Tailwind CSS)

---

## 🚀 Cara Menjalankan Proyek

```bash
# Install dependensi
npm install

# Jalankan server development
npm run dev

# Buat build untuk produksi
npm run build


```

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
