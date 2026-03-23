---
name: design-analysis
description: 分析设计稿。当用户提供设计稿或需要从视觉设计转换为代码时使用此技能。
allowed-tools: []
disable: false
---

# 设计稿分析

## 功能说明

此技能帮助分析和转换 UI 设计稿，包括：

- **视觉元素识别**：颜色、字体、间距、圆角等
- **组件提取**：识别可复用的组件
- **布局分析**：栅格、Flexbox、响应式设计
- **代码转换**：将设计转换为 Vue 3 代码

## 分析流程

### 1. 视觉风格提取

分析设计稿的以下要素：

```
设计风格分析表
├─ 颜色体系
│  ├─ 主色: #1890ff
│  ├─ 辅助色: #722ed1
│  ├─ 成功: #52c41a
│  └─ 背景: #fafafa
├─ 字体系统
│  ├─ 标题字体: Roboto Bold 20px
│  ├─ 正文字体: Roboto Regular 14px
│  └─ 行高: 1.5
├─ 间距系统
│  ├─ 内边距: 16px
│  ├─ 外边距: 8px
│  └─ 间隙: 12px
└─ 效果
   ├─ 圆角: 8px
   ├─ 阴影: 0 2px 4px rgba(0,0,0,0.06)
   └─ 过渡: 0.3s ease
```

### 2. 组件识别

从设计稿中识别并命名组件：

- **原子组件**：Button、Input、Badge、Tag
- **分子组件**：SearchBar、UserCard、ProductCard
- **有机体组件**：Header、Navigation、Footer
- **模板组件**：PageLayout、GridLayout

### 3. 布局分析

```
布局分析
├─ 顶部导航 (Header)
│  ├─ 高度: 56px
│  ├─ 布局: Flex Row
│  └─ 位置固定
├─ 主内容区 (Main Content)
│  ├─ 类型: Grid / Flex
│  ├─ 列数: 2 / 3 / 1
│  └─ 间距: 16px
└─ 底部栏 (Footer)
   ├─ 高度: 56px
   └─ 粘性位置: bottom
```

## 转换指南

### 步骤 1：创建布局

```vue
<template>
  <view class="page-layout">
    <header class="header">
      <!-- 导航内容 -->
    </header>
    
    <main class="main-content">
      <!-- 页面内容 -->
    </main>

    <footer class="footer">
      <!-- 页脚内容 -->
    </footer>
  </view>
</template>
```

### 步骤 2：应用样式变量

```scss
.page-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  height: 56px;
  padding: 0 $uni-spacing-base;
  background-color: $uni-bg-color;
  box-shadow: $uni-shadow-sm;
}

.main-content {
  flex: 1;
  padding: $uni-spacing-lg;
  overflow-y: auto;
}

.footer {
  height: 56px;
  padding: 0 $uni-spacing-base;
  border-top: 1px solid $uni-border-color;
}
```

### 步骤 3：提取组件

```vue
<!-- 从设计稿识别的卡片组件 -->
<template>
  <view class="card">
    <view class="card-header">
      <text class="card-title">{{ title }}</text>
      <t-icon name="more" />
    </view>
    <view class="card-content">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
interface Props {
  title: string
}

withDefaults(defineProps<Props>(), {})
</script>

<style scoped lang="scss">
.card {
  padding: $uni-spacing-base;
  background-color: #fff;
  border-radius: $uni-border-radius-lg;
  box-shadow: $uni-shadow-base;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $uni-spacing-base;
}

.card-title {
  font-size: $uni-font-size-lg;
  font-weight: $uni-font-weight-bold;
  color: $uni-text-color;
}
</style>
```

## 设计转代码检查清单

- [ ] 所有颜色使用了 `uni.scss` 中的变量
- [ ] 字体大小、粗细符合设计规范
- [ ] 间距采用 8px 基准的倍数
- [ ] 圆角值与设计规范一致
- [ ] 响应式设计考虑多端适配
- [ ] 组件已提取为独立的 Vue 文件
- [ ] TypeScript 类型完整定义
- [ ] JSDoc 注释已添加

## 常见设计模式

### 卡片列表布局

```vue
<template>
  <view class="card-list">
    <view 
      v-for="item in items"
      :key="item.id"
      class="card-item"
    >
      <img :src="item.image" :alt="item.title" class="card-image" />
      <view class="card-info">
        <text class="card-title">{{ item.title }}</text>
        <text class="card-price">¥{{ item.price }}</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.card-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $uni-spacing-base;
  padding: $uni-spacing-lg;
}

.card-item {
  background-color: #fff;
  border-radius: $uni-border-radius-lg;
  overflow: hidden;
  box-shadow: $uni-shadow-sm;
}
</style>
```

## 规范约束

- 遵循 `09-样式规范.md` 设计系统
- 使用 TDesign 组件库的组件
- 支持多端适配（App、小程序、H5）
- 颜色、字体、间距 all use variables
