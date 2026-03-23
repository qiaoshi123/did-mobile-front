---
name: "divider"
description: "用于分割、组织、细化有一定逻辑的组织元素内容和页面结构。"
url: "https://tdesign.tencent.com/uniapp/components/divider"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TDivider from '@tdesign/uniapp/divider/divider.vue';
```

### 基础分割符

分割符主要是由直线和文字组成，通过`slot`传入分割线文案或者其他自定义内容，通过`layout`控制分隔符是垂直还是横向


```vue
<template>
  <view>
    <t-divider />

    <view class="divider-demo__title">
      带文字水平分割线
    </view>

    <t-divider
      content="文字信息"
      align="left"
    />
    <t-divider content="文字信息" />
    <t-divider
      content="文字信息"
      align="right"
    />

    <view class="divider-demo__title">
      垂直分割线
    </view>

    <view class="divider-wrapper">
      <text class="demo-6__text-color">
        文字信息
      </text>
      <t-divider layout="vertical" />
      <text class="demo-6__text-color">
        文字信息
      </text>
      <t-divider layout="vertical" />
      <text class="demo-6__text-color">
        文字信息
      </text>
    </view>
  </view>
</template>

<script>
import TDivider from '@tdesign/uniapp/divider/divider.vue';
import SkylineBehavior from '@tdesign/uniapp/mixins/skyline.js';

export default {
  components: {
    TDivider,
  },
  mixins: [SkylineBehavior],
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
.divider-demo__title {
    font-size: 28rpx;
    color: var(--bg-color-demo-desc);
    padding: 16rpx 32rpx;
    line-height: 40rpx;
}

.divider-wrapper {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    color: var(--td-text-color-primary);
    padding-left: 32rpx;
}
</style>
```


### 虚线样式


```vue
<template>
  <view>
    <t-divider
      :t-class="skylineRender ? 'skyline-dashed' : ''"
      dashed
    />
    <t-divider
      :t-class="skylineRender ? 'skyline-dashed' : ''"
      dashed
      content="文字信息"
      align="left"
    />
    <t-divider
      :t-class="skylineRender ? 'skyline-dashed' : ''"
      dashed
      content="文字信息"
    />
    <t-divider
      :t-class="skylineRender ? 'skyline-dashed' : ''"
      dashed
      content="文字信息"
      align="right"
    />
  </view>
</template>

<script>
import TDivider from '@tdesign/uniapp/divider/divider.vue';
import SkylineBehavior from '@tdesign/uniapp/mixins/skyline.js';

export default {
  components: {
    TDivider,
  },
  mixins: [SkylineBehavior],
  data() {
    return {
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.divider-demo__title {
    font-size: 24rpx;
    color: rgba(0, 0, 0, 0.4);
    padding: 0 32rpx 16rpx;
    line-height: 40rpx;
}

.demo-5 {
    margin: 0 32rpx;
}

/* 兼容skyline写法，后续skyline支持border-top后可删除 */
.skyline-dashed {
    border-style: unset !important;
    border-top-style: dashed !important;
    border-color: unset !important;
    border-top-color: #e7e7e7 !important;
}
</style>
```


## API

### Divider Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
align | String | center | 文本位置（仅在水平分割线有效）。可选项：left/right/center | N
content | String | - | 子元素 | N
dashed | Boolean | false | 是否虚线（仅在水平分割线有效） | N
layout | String | horizontal | 分隔线类型有两种：水平和垂直。可选项：horizontal/vertical | N

### Divider Slots

名称 | 描述
-- | --
content | 自定义 `content` 显示内容

### Divider External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-content | 内容样式类

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-divider-border-width | 2rpx | -
--td-divider-color | @bg-color-component | -
--td-divider-content-color | @text-color-placeholder | -
--td-divider-content-font | @font-body-small | -
--td-divider-content-line-style | solid | -
--td-divider-content-margin | @spacer-1 | -
--td-divider-horizontal-margin | 20rpx | -
--td-divider-vertical-margin | @spacer | -
