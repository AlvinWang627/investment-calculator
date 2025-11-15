# shadcn/ui 安装完成

## 已安装的内容

1. **Tailwind CSS** - 已配置并集成到项目中
2. **shadcn/ui 核心依赖**:
   - `class-variance-authority` - 用于样式变体
   - `clsx` - 用于条件类名
   - `tailwind-merge` - 用于合并 Tailwind 类
   - `lucide-react` - 图标库
   - `tailwindcss-animate` - 动画插件

3. **配置文件**:
   - `tailwind.config.js` - Tailwind 配置（包含 shadcn/ui 主题）
   - `postcss.config.js` - PostCSS 配置
   - `components.json` - shadcn/ui 配置
   - `jsconfig.json` - 路径别名配置
   - `vite.config.js` - 更新了路径别名

4. **项目结构**:
   - `src/lib/utils.js` - cn() 工具函数
   - `src/components/ui/` - shadcn/ui 组件目录
   - `src/components/ui/button.jsx` - 示例 Button 组件

## 如何使用

### 1. 导入组件

\`\`\`jsx
import { Button } from "@/components/ui/button"
\`\`\`

### 2. 使用组件

\`\`\`jsx
function App() {
  return (
    <div>
      <Button>默认按钮</Button>
      <Button variant="secondary">次要按钮</Button>
      <Button variant="destructive">危险按钮</Button>
      <Button variant="outline">轮廓按钮</Button>
      <Button variant="ghost">幽灵按钮</Button>
      <Button size="sm">小按钮</Button>
      <Button size="lg">大按钮</Button>
    </div>
  )
}
\`\`\`

## 手动添加更多组件

由于 shadcn CLI 遇到网络问题，你可以从 [shadcn/ui 官网](https://ui.shadcn.com/docs/components) 手动复制组件代码到 `src/components/ui/` 目录。

### 常用组件示例：

- **Button** - 已添加
- **Input** - 输入框
- **Card** - 卡片
- **Dialog** - 对话框
- **Select** - 下拉选择
- **Table** - 表格

## 添加新组件的步骤

1. 访问 https://ui.shadcn.com/docs/components/[组件名]
2. 复制组件代码
3. 根据需要安装额外的 Radix UI 依赖（如 `@radix-ui/react-dialog`）
4. 将代码保存到 `src/components/ui/[组件名].jsx`
5. 调整为 JavaScript 语法（如果是 TypeScript）

## 示例：添加 Input 组件

### 1. 安装依赖
\`\`\`bash
npm install @radix-ui/react-slot
\`\`\`

### 2. 创建组件文件
在 `src/components/ui/input.jsx` 中：

\`\`\`jsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
\`\`\`

## 主题定制

你可以在 `src/index.css` 的 `:root` 和 `.dark` 部分修改 CSS 变量来定制主题颜色。

## 深色模式

shadcn/ui 支持深色模式。要启用：

1. 在根元素添加 `dark` 类名：
\`\`\`jsx
<div className="dark">
  {/* 你的应用 */}
</div>
\`\`\`

2. 或使用主题切换器动态切换。

## 资源

- [shadcn/ui 文档](https://ui.shadcn.com)
- [Tailwind CSS 文档](https://tailwindcss.com)
- [Radix UI 文档](https://www.radix-ui.com)
- [Lucide 图标](https://lucide.dev)
