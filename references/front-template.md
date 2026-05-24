# 正面海报模板规范（知识图谱）

## 整体结构

```
┌─────────────────────────────────┐
│          HEADER（渐变条）         │
│   主标题 + 副标题 + 侧标签       │
├─────────────────────────────────┤
│  MODULE 1 — 模块标题             │
│  ┌──────┐ ┌──────┐ ┌──────┐    │
│  │卡片1  │ │卡片2  │ │卡片3  │    │
│  │概念列表│ │概念列表│ │概念列表│    │
│  └──────┘ └──────┘ └──────┘    │
│  ┌──────┐ ┌──────┐ ┌──────┐    │
│  │卡片4  │ │卡片5  │ │卡片6  │    │
│  └──────┘ └──────┘ └──────┘    │
├─────────────────────────────────┤
│  MODULE 2 ... MODULE N          │
│  （同上结构）                     │
├─────────────────────────────────┤
│  BOTTOM SECTION（深色底栏）       │
│  高频关键词标签 + 核心金句        │
├─────────────────────────────────┤
│  FOOTER                         │
│  课程信息 + 底部金句              │
└─────────────────────────────────┘
```

## CSS 关键规范

### 基础设置
```css
@page { size: A4; margin: 0; }
body {
  width: 210mm; height: 297mm;
  margin: 0 auto; overflow: hidden;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.poster {
  padding: 4mm 6mm 3mm 6mm;
  width: 210mm; height: 297mm;
  display: flex; flex-direction: column;
}
```

### 字号体系（学术雅致风格基准）
| 元素 | 字号 | 字重 |
|------|------|------|
| 主标题 | 22-24pt | 900 serif |
| 副标题 | 7.5-8pt | 400 |
| 侧标签 | 5.5pt | 600 竖排 |
| 模块编号 | 7.5-8pt | 900 |
| 模块标题 | 9.5-10pt | 700 |
| 模块副标题 | 6.5pt | italic |
| 章节卡片名 | 8.5-9pt | 700 |
| 概念正文 | 7.5-8pt | 400 |
| 概念名（strong） | 同正文 | 600 + 主题色 |
| 底部标题 | 9pt | 700 serif |
| 底部标签 | 6pt | 400 |
| 底部金句 | 6.5pt | 400 |
| Footer | 5.5pt | 400 |

### 模块色条
每模块卡片左侧2px色条，颜色对应模块序号（accent-1/2/3/4循环）。

### 卡片网格
- 3-4列：`grid-template-columns: repeat(N, 1fr)`
- gap: 1-1.5mm
- 卡片padding: 1.5mm 2mm 1mm
- 卡片背景：`var(--bg-card)` + `1px solid var(--border-light)`

### Header渐变
```css
background: linear-gradient(135deg, var(--accent-1) 0%, var(--accent-2) 100%);
```
内含低透明度SVG纹理（圆点/十字/菱形），z-index分层。

### Bottom Section
深色底栏：
```css
background: linear-gradient(135deg, #1A1A2E 0%, #2D2D4A 50%, #1A1A2E 100%);
```
暗色风格时调整为更深的底色。

### 溢出控制
- `margin-top: auto` 让底部栏始终贴底
- 真实高度测量用 cloneNode + `height: auto` + `overflow: visible`
- 调整顺序：先压缩 padding/margin/gap → 再缩小字号
- 字号下限：正文 6.5pt，标题 7pt
