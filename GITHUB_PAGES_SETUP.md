# GitHub Pages 部署設置說明

此專案已配置好 Vite 以支援 GitHub Pages 部署。

## ✅ 已完成的配置

- **Vite 配置**: 已在 `vite.config.js` 中設置 `base: '/investment-calculator/'`
- **建置測試**: 已驗證專案可以成功建置

## 📋 完成部署的步驟

### 選項 1: 使用 GitHub Actions (推薦)

1. **啟用 GitHub Pages**
   - 進入 Repository Settings > Pages
   - Source 選擇 "GitHub Actions"

2. **創建 Workflow 文件**
   - 在 GitHub 網頁上，創建文件 `.github/workflows/deploy.yml`
   - 複製以下內容：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. **推送到 main 分支**
   - 將變更合併到 main 分支後，GitHub Actions 將自動部署

### 選項 2: 使用 gh-pages 套件

1. **安裝 gh-pages**
   ```bash
   npm install -D gh-pages
   ```

2. **更新 package.json**
   在 `scripts` 區段添加：
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

3. **部署**
   ```bash
   npm run deploy
   ```

4. **啟用 GitHub Pages**
   - 進入 Repository Settings > Pages
   - Source 選擇 "Deploy from a branch"
   - Branch 選擇 "gh-pages"

## 🌐 部署後的網址

完成後，您的應用程式將可在以下網址訪問：

**https://AlvinWang627.github.io/investment-calculator/**

## 🔍 驗證部署

部署完成後：
1. 檢查 Actions 標籤頁確認部署狀態
2. 訪問上述網址確認應用程式運行正常
3. 確認所有資源（圖片、CSS、JS）都正確載入

## 📝 注意事項

- Vite 配置中的 `base` 路徑必須與 repository 名稱一致
- 如果變更 repository 名稱，需要更新 `vite.config.js` 中的 `base` 設定
- 每次推送到 main 分支時，GitHub Actions 會自動重新部署
