# 投資計算機 Investment Calculator

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

一個基於 React 構建的線上投資計算工具，幫助使用者預測投資收益成長趨勢。本專案旨在提供各式各樣的實用計算功能，讓使用者能夠輕鬆進行財務規劃與分析。

## 📋 目錄

- [專案簡介](#專案簡介)
- [功能特色](#功能特色)
- [線上展示](#線上展示)
- [技術棧](#技術棧)
- [快速開始](#快速開始)
- [使用說明](#使用說明)
- [專案結構](#專案結構)
- [開發指南](#開發指南)
- [建置部署](#建置部署)
- [貢獻指南](#貢獻指南)
- [授權協議](#授權協議)

## 專案簡介

投資計算機是一個現代化的 Web 應用程式，使用 React 18 和 Vite 構建，提供快速、準確的投資收益計算功能。本專案採用響應式設計，支援各種裝置訪問，讓使用者隨時隨地進行投資規劃。

### 核心功能

本計算機支援複利計算，幫助使用者了解長期投資的威力。透過輸入初始投資金額、年度投資額、預期報酬率和投資年限，系統會自動計算並展示：

- 每年投資價值變化
- 年度利息收益
- 累計利息總額
- 已投入本金總額

## 功能特色

### ✨ 主要特點

- **即時計算**：輸入參數後立即顯示計算結果，無需等待
- **複利模擬**：精確模擬複利效應，展示投資成長曲線
- **視覺化呈現**：清晰的表格展示每年詳細數據
- **輸入驗證**：智能驗證輸入數據，確保計算準確性
- **響應式設計**：完美支援桌面、平板和手機裝置
- **美觀介面**：現代化 UI 設計，提供優質使用者體驗

### 📊 計算參數

1. **初始投資金額**（Initial Investment）
   - 第一次投入的本金金額
   - 預設值：$10,000

2. **年度投資金額**（Annual Investment）
   - 每年額外投入的金額
   - 預設值：$1,200

3. **預期年報酬率**（Expected Return）
   - 預期的年化報酬率（百分比）
   - 預設值：6%

4. **投資期限**（Duration）
   - 投資持續的年數
   - 預設值：10 年
   - 最小值：1 年

### 📈 計算結果展示

結果表格包含以下欄位：

- **年份**（Year）：投資的第幾年
- **投資價值**（Investment Value）：該年度結束時的總資產價值
- **年度利息**（Interest Year）：該年度獲得的利息收益
- **累計利息**（Total Interest）：從投資開始至該年度的利息總和
- **已投入本金**（Invested Capital）：從投資開始至該年度投入的本金總額

## 線上展示

🔗 **Demo**：[點擊查看線上展示](#)（請替換為實際部署連結）

## 技術棧

### 前端框架

- **React 18.2.0** - 現代化的 UI 函式庫
- **React DOM 18.2.0** - React 渲染引擎

### 建置工具

- **Vite 4.4.5** - 新世代前端建置工具
  - 極快的冷啟動速度
  - 即時熱模組替換（HMR）
  - 優化的生產建置

### 開發工具

- **ESLint 8.45.0** - 程式碼品質檢查工具
- **@vitejs/plugin-react** - React 支援插件
- **eslint-plugin-react** - React 專用 ESLint 規則
- **eslint-plugin-react-hooks** - React Hooks 規則檢查
- **eslint-plugin-react-refresh** - React Fast Refresh 支援

### 樣式設計

- **原生 CSS** - 使用 CSS3 自訂樣式
- **Google Fonts** - Quicksand 和 Roboto Condensed 字體
- **漸層背景** - 精心設計的視覺效果
- **色彩主題** - 綠色/青色系配色方案

## 快速開始

### 環境要求

- **Node.js**：16.x 或更高版本（建議使用 LTS 版本）
- **npm**：7.x 或更高版本
- **現代瀏覽器**：支援 ES6+ 語法

### 安裝步驟

1. **克隆專案**

```bash
git clone https://github.com/AlvinWang627/investment-calculator.git
cd investment-calculator
```

2. **安裝依賴**

```bash
npm install
```

3. **啟動開發伺服器**

```bash
npm run dev
```

4. **訪問應用**

開啟瀏覽器訪問：`http://localhost:5173`

## 使用說明

### 基本操作

1. **輸入投資參數**
   - 在表單中填寫四個必要參數
   - 所有欄位均為必填項目
   - 系統會即時驗證輸入值

2. **查看計算結果**
   - 輸入有效參數後，結果表格自動顯示
   - 表格展示逐年詳細數據
   - 所有金額以美元格式顯示

3. **調整參數**
   - 修改任一參數，結果立即更新
   - 可嘗試不同情境進行比較

### 使用範例

**情境一：保守型投資**
- 初始投資：$50,000
- 年度投資：$5,000
- 預期報酬：4%
- 投資期限：20 年

**情境二：積極型投資**
- 初始投資：$10,000
- 年度投資：$10,000
- 預期報酬：8%
- 投資期限：30 年

## 專案結構

```
investment-calculator/
├── public/                                 # 靜態資源目錄
│   └── investment-calculator-logo.png     # 應用程式 Logo
├── src/                                    # 原始碼目錄
│   ├── assets/                            # 資源檔案
│   │   └── investment-calculator-logo.png # Logo 圖檔
│   ├── components/                        # React 元件
│   │   ├── Header.jsx                     # 頁首元件（含 Logo 和標題）
│   │   ├── UserInput.jsx                  # 使用者輸入表單元件
│   │   └── Results.jsx                    # 計算結果表格元件
│   ├── util/                              # 工具函式
│   │   └── investment.js                  # 投資計算核心邏輯
│   ├── App.jsx                            # 主應用程式元件
│   ├── index.jsx                          # React 入口檔案
│   └── index.css                          # 全域樣式表
├── index.html                             # HTML 入口檔案
├── package.json                           # 專案配置和依賴管理
├── vite.config.js                         # Vite 配置檔案
├── .gitignore                             # Git 忽略規則
├── CLAUDE.md                              # AI 助手專案指南
└── README.md                              # 專案說明文件（本檔案）
```

### 核心檔案說明

#### App.jsx
主應用程式元件，負責：
- 管理應用程式狀態（使用 useState Hook）
- 儲存使用者輸入的投資參數
- 處理輸入變更事件
- 驗證輸入數據
- 整合所有子元件

#### components/Header.jsx
頁首元件，展示：
- 應用程式 Logo
- 應用程式標題

#### components/UserInput.jsx
輸入表單元件，提供：
- 四個數字輸入欄位
- 受控輸入元件
- 即時數據綁定

#### components/Results.jsx
結果展示元件，功能：
- 調用計算函式獲取結果
- 格式化數據為貨幣格式
- 以表格形式呈現逐年數據
- 計算衍生指標（累計利息、已投入本金）

#### util/investment.js
核心計算模組，包含：
- `calculateInvestmentResults()` - 複利計算函式
- `formatter` - 貨幣格式化工具

## 開發指南

### 可用腳本

#### 啟動開發伺服器
```bash
npm run dev
```
- 啟動 Vite 開發伺服器
- 支援熱模組替換（HMR）
- 預設端口：5173

#### 建置生產版本
```bash
npm run build
```
- 建立優化的生產版本
- 輸出目錄：`dist/`
- 包含壓縮和優化的資源

#### 預覽生產建置
```bash
npm run preview
```
- 本地預覽生產建置結果
- 從 `dist/` 目錄提供服務

#### 程式碼檢查
```bash
npm run lint
```
- 執行 ESLint 檢查
- 檢查所有 .js 和 .jsx 檔案
- 嚴格模式（最大警告數：0）

### 程式碼規範

#### 檔案命名
- **元件**：使用 PascalCase，副檔名 `.jsx`（例如：`Header.jsx`）
- **工具函式**：使用 camelCase，副檔名 `.js`（例如：`investment.js`）
- **樣式**：使用 camelCase，副檔名 `.css`（例如：`index.css`）

#### 元件結構
- 統一使用函式元件（Functional Components）
- 使用 React Hooks 管理狀態
- 元件使用預設匯出（default export）
- 工具函式使用具名匯出（named export）

#### 狀態管理
- 使用 `useState` Hook 管理本地狀態
- 狀態提升至 `App.jsx`（頂層元件）
- 透過 Props 傳遞數據和處理函式

#### 樣式規範
- 主要區塊使用 ID 選擇器（`#header`, `#user-input`, `#result`）
- 可重用樣式使用 Class 選擇器（`.input-group`, `.center`）
- 採用全域 CSS（未使用 CSS Modules 或 CSS-in-JS）

### 新增功能

#### 新增輸入欄位
1. 在 `App.jsx` 更新初始狀態
2. 在 `UserInput.jsx` 新增輸入欄位
3. 更新事件處理函式
4. 必要時修改計算邏輯

#### 修改計算邏輯
1. 編輯 `/src/util/investment.js`
2. 更新 `calculateInvestmentResults` 函式
3. 如輸出結構改變，更新 `Results.jsx`
4. 進行充分測試

#### 新增元件
1. 在 `/src/components/` 建立新的 `.jsx` 檔案
2. 使用 PascalCase 命名
3. 在 `App.jsx` 或其他元件中匯入使用
4. 在 `index.css` 新增對應樣式

### 計算公式

**複利計算邏輯：**

```javascript
// 每年計算循環
for (let year = 1; year <= duration; year++) {
  // 計算該年度利息
  const interestEarnedInYear = investmentValue * (expectedReturn / 100);

  // 更新投資總值
  investmentValue += interestEarnedInYear + annualInvestment;

  // 記錄該年度數據
  annualData.push({
    year: year,
    interest: interestEarnedInYear,
    valueEndOfYear: investmentValue,
    annualInvestment: annualInvestment
  });
}
```

**衍生指標計算：**

```javascript
// 初始投資金額（從第一年數據反推）
initialInvestment = firstYearData.valueEndOfYear
                  - firstYearData.interest
                  - firstYearData.annualInvestment

// 累計利息
totalInterest = valueEndOfYear
              - (annualInvestment × year)
              - initialInvestment

// 已投入本金
totalAmountInvested = valueEndOfYear - totalInterest
```

## 建置部署

### 建置流程

1. **執行建置命令**
```bash
npm run build
```

2. **檢查建置輸出**
- 建置檔案位於 `dist/` 目錄
- 包含壓縮的 JS、CSS、HTML 和資源檔案

3. **測試建置結果**
```bash
npm run preview
```

### 部署選項

本專案建置後為靜態檔案，可部署至以下平台：

#### Vercel（推薦）
```bash
# 安裝 Vercel CLI
npm i -g vercel

# 部署
vercel
```

#### Netlify
```bash
# 安裝 Netlify CLI
npm i -g netlify-cli

# 部署
netlify deploy --prod --dir=dist
```

#### GitHub Pages
1. 修改 `vite.config.js` 設定 base path
2. 建置專案
3. 推送 `dist/` 目錄到 `gh-pages` 分支

#### 其他平台
- **Cloudflare Pages**
- **Firebase Hosting**
- **AWS S3 + CloudFront**
- 任何支援靜態網站託管的服務

### 環境變數

目前專案未使用環境變數。如需新增：

1. 建立 `.env` 檔案
2. 使用 `VITE_` 前綴定義變數
3. 在程式碼中使用 `import.meta.env.VITE_*` 訪問

## 貢獻指南

我們歡迎所有形式的貢獻！

### 如何貢獻

1. **Fork 本專案**
2. **建立特性分支** (`git checkout -b feature/AmazingFeature`)
3. **提交變更** (`git commit -m 'feat: add some amazing feature'`)
4. **推送至分支** (`git push origin feature/AmazingFeature`)
5. **開啟 Pull Request**

### Commit 訊息規範

採用 Conventional Commits 格式：

- `feat:` 新功能
- `fix:` 錯誤修復
- `docs:` 文件更新
- `style:` 程式碼格式調整
- `refactor:` 重構
- `test:` 測試相關
- `chore:` 建置流程或輔助工具變動

### 開發建議

- 遵循現有程式碼風格
- 新增功能請附上說明
- 重大變更請先開 Issue 討論
- 確保程式碼通過 ESLint 檢查

## 未來規劃

### 計劃新增功能

- [ ] 多種計算機類型
  - [ ] 退休金計算機
  - [ ] 貸款計算機
  - [ ] 儲蓄目標計算機
  - [ ] 通膨調整計算機
- [ ] 圖表視覺化（使用 Chart.js 或 Recharts）
- [ ] 資料匯出功能（CSV/PDF）
- [ ] 情境比較功能
- [ ] 深色模式支援
- [ ] 多語言支援（i18n）
- [ ] 單元測試覆蓋
- [ ] E2E 測試

### 技術改進

- [ ] 加入 TypeScript 支援
- [ ] 實作 PWA 功能
- [ ] 效能優化（useMemo/useCallback）
- [ ] 無障礙功能增強（ARIA）
- [ ] SEO 優化

## 常見問題

### Q: 計算結果不準確？
A: 請確認所有輸入參數都是有效數字，投資期限至少為 1 年。

### Q: 如何修改預設值？
A: 編輯 `src/App.jsx` 中的初始狀態物件。

### Q: 支援哪些瀏覽器？
A: 支援所有現代瀏覽器（Chrome、Firefox、Safari、Edge），需支援 ES6+ 語法。

### Q: 可以離線使用嗎？
A: 目前不支援，未來計劃加入 PWA 功能實現離線使用。

## 授權協議

本專案採用 MIT 授權協議 - 詳見 [LICENSE](LICENSE) 檔案

## 聯絡方式

**專案維護者**：AlvinWang627

**專案連結**：[https://github.com/AlvinWang627/investment-calculator](https://github.com/AlvinWang627/investment-calculator)

## 致謝

- 感謝 [React](https://reactjs.org/) 團隊提供優秀的框架
- 感謝 [Vite](https://vitejs.dev/) 提供快速的建置工具
- 感謝所有貢獻者的付出

---

**⭐ 如果這個專案對你有幫助，請給我們一個 Star！**

Made with ❤️ by [AlvinWang627](https://github.com/AlvinWang627)
