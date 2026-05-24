---
name: course-poster
description: >
  课程知识海报生成器。根据任意课程名称，自动生成正反两面A4知识海报（正面：知识图谱/概念地图；背面：核心思想金句）。
  支持用户选择页面风格和主题配色。触发场景：用户要求为课程/书籍/培训内容制作知识海报、
  概念图谱、金句海报、A4打印海报、正反面海报等。关键词：课程海报、知识图谱、
  核心思想、金句、A4海报、正反面、打印、课程总结、读书海报。
---

# 课程知识海报生成器

为任意课程/书籍/培训内容生成正反两面A4知识海报。

## 工作流

### 1. 收集信息

向用户确认以下内容（缺失时主动追问）：

- **课程名称**（必需）：如"刘润5分钟商学院"、"得到·薛兆丰经济学讲义"
- **风格选择**：从 [references/style-presets.md](references/style-presets.md) 选择，或自定义
- **主题配色**：从预设色板选择，或用户自定义主色/辅色

若用户未指定风格/配色，展示选项让用户选择。

### 2. 内容规划

基于课程名称，生成以下内容结构：

**正面（知识图谱）**：
- 课程主标题 + 副标题
- 按模块/篇章分组（3-6个模块）
- 每模块3-6个核心章节卡片
- 每卡片列出3-5个关键概念（概念名+一句话解读）
- 底部：高频关键词标签 + 核心金句

**背面（核心思想）**：
- 20句核心思想，按模块均分
- 每句 = 编号 + 概念名 + 金句正文
- 底部：模块色标 + 总金句

### 3. 生成HTML

读取模板规范，生成两个HTML文件：
- `{name}-poster.html`（正面）
- `{name}-poster-back.html`（背面）

规范详见：
- 正面：[references/front-template.md](references/front-template.md)
- 背面：[references/back-template.md](references/back-template.md)
- 配色：[references/style-presets.md](references/style-presets.md)

### 4. 截图生成PNG

使用 Playwright 对HTML截图生成A4尺寸PNG：

```bash
node scripts/screenshot.js <html-path> <output-png-path>
```

- 视口：794×1123px（96dpi下A4）
- deviceScaleFactor: 2（2x高清，输出1588×2246px）
- 截取 `.poster` 元素，确保内容完整

### 5. 溢出检测与适配

截图后检查真实内容高度：
- 若超过1123px，压缩间距/字号直到适配
- 若余量>80px，适当增大字号提升可读性
- 反复迭代至 1050-1120px 之间

### 6. 交付

- 预览两张PNG图片
- 交付HTML+PNG文件（共4个）
- 附简要设计说明

## 注意事项

- 字号最小不低于6pt（打印可读性底线）
- 使用 `overflow: hidden` + 固定 `height: 297mm` 确保不溢出
- CSS单位用mm/pt，不依赖px绝对值
- Google Fonts 引入 `Noto Sans SC` + `Noto Serif SC`
- 打印适配：`-webkit-print-color-adjust: exact`
- 所有模块色条、标签色需与主题配色一致
