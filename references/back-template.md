# 背面海报模板规范（核心思想）

## 整体结构

```
┌─────────────────────────────────┐
│     HEADER（渐变条，同正面）      │
│     "N 句核心思想" + 课程名       │
├─────────────────────────────────┤
│  MODULE 1 — 模块标题             │
│  ┌──────────┐ ┌──────────┐     │
│  │ 01 概念名  │ │ 02 概念名  │     │
│  │ 金句正文   │ │ 金句正文   │     │
│  └──────────┘ └──────────┘     │
│  ┌──────────┐ ┌──────────┐     │
│  │ 03 概念名  │ │ 04 概念名  │     │
│  └──────────┘ └──────────┘     │
├─────────────────────────────────┤
│  ◆ ◇ ◆  分隔线  ◆ ◇ ◆         │
├─────────────────────────────────┤
│  MODULE 3 ... MODULE N          │
│  （同上结构）                     │
├─────────────────────────────────┤
│  BOTTOM SECTION（深色底栏）       │
│  模块色标pill + 总金句           │
├─────────────────────────────────┤
│  FOOTER                         │
│  课程信息 + BACK标识              │
└─────────────────────────────────┘
```

## CSS 关键规范

### Header
与正面同风格渐变条，标题改为「N 句核心思想」，副标题为课程全名。
底部加装饰线：
```css
.header {
  text-align: center;          /* 标题整体居中 */
  display: flex;
  flex-direction: column;
  align-items: center;         /* 子元素水平居中 */
}
.header-title {
  text-align: center;           /* 主标题居中 */
}
.header-sub {
  text-align: center;           /* 副标题（课程名）居中 */
}
.header-line {
  width: 40mm; height: 1px; margin: 1mm auto 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
}
```
**关键规则**：主标题和副标题必须居中对齐。

### 金句卡片
双列网格布局：
```css
.quotes-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2mm;
}
```

每张卡片结构：
```html
<div class="quote-card">
  <div class="quote-top">
    <span class="quote-num">01</span>
    <span class="quote-concept">概念名</span>
  </div>
  <div class="quote-text">
    金句正文，<em>关键词</em>加粗
  </div>
</div>
```

### 卡片样式
```css
.quote-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 4px;
  padding: 1.5mm 2mm 1mm;
  position: relative;
  overflow: hidden;
}
.quote-card::before {
  /* 左侧2.5px模块色条 */
  content: '';
  position: absolute; top: 0; left: 0; bottom: 0;
  width: 2.5px;
}
```

### 编号样式
大号水印编号，低透明度：
```css
.quote-num {
  font-size: 14pt; font-weight: 900; line-height: 1;
  opacity: 0.12;
  font-family: 'Noto Serif SC', serif;
}
```

### 金句正文
```css
.quote-text {
  font-size: 7.8pt; color: var(--text-body);
  line-height: 1.45;
  padding-left: 1mm;
  border-left: 1.5px solid var(--border-light);
}
.quote-text em {
  font-style: normal; font-weight: 700;
  color: var(--text-dark);
}
```

### 模块分隔线
```css
.divider {
  display: flex; align-items: center; gap: 2mm;
  margin: 1mm 0;
}
.divider-line {
  flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-light), transparent);
}
```

### Bottom Section
与正面同色深色底栏，内容改为：
- 模块色标 pill 标签（小圆角药丸形）
- 居中总金句（衬线、金色）
- 署名行

### 内容规则
- 金句数默认20句，每模块5句（4模块时）
- 若模块数≠4，均分金句至每模块
- 每句金句控制在15-35字
- 关键词用 `<em>` 强调（渲染为粗体深色）
- 概念名2-4字，使用模块色

### 暗色风格适配
Cyber/Luxe风格时：
- 卡片背景改为半透明暗色
- 边框改为发光边框
- 编号透明度提高到0.25
- 正文颜色改为浅色
