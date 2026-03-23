---
name: "progress"
description: "用于展示任务当前的进度。"
url: "https://tdesign.tencent.com/uniapp/components/progress"
---




## 引入

### 引入组件

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TProgress from '@tdesign/uniapp/progress/progress.vue';
```

### 01 组件类型


```vue
<template>
  <view>
    <view class="demo-desc">
      基础进度条
    </view>
    <view class="demo-wrapper">
      <t-progress :percentage="80" />
    </view>

    <view class="demo-desc">
      百分比内显
    </view>
    <view class="demo-wrapper">
      <t-progress
        theme="plump"
        :percentage="80"
      />
    </view>

    <view class="demo-desc">
      环形进度条
    </view>
    <view
      class="demo-wrapper"
    >
      <t-progress
        theme="circle"
        :percentage="30"
      />
    </view>

    <view class="demo-desc">
      微型环形进度条
    </view>
    <view
      class="demo-wrapper"
    >
      <t-progress
        theme="circle"
        size="micro"
        :percentage="30"
        :label="false"
      />
    </view>
  </view>
</template>

<script>
import TProgress from '@tdesign/uniapp/progress/progress.vue';
export default {
  components: {
    TProgress,
  },
  data() {
    return {
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.demo-wrapper {
    padding: 0 32rpx;
}
</style>
```


### 02 组件状态

线性进度条


```vue
<template>
  <view>
    <t-progress :percentage="80" />
    <t-progress
      :percentage="88"
      status="warning"
    />
    <t-progress
      :percentage="88"
      status="error"
    />
    <t-progress
      :percentage="88"
      status="success"
    />
    <t-progress
      :percentage="88"
      color=""
      status="active"
    />
  </view>
</template>

<script>
import TProgress from '@tdesign/uniapp/progress/progress.vue';
export default {
  components: {
    TProgress,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
</style>
```


百分比内显进度条


```vue
<template>
  <view>
    <t-progress
      theme="plump"
      :percentage="80"
    />
    <t-progress
      theme="plump"
      :percentage="88"
      status="warning"
    />
    <t-progress
      theme="plump"
      :percentage="88"
      status="error"
    />
    <t-progress
      theme="plump"
      :percentage="88"
      status="success"
    />
    <t-progress
      theme="plump"
      :color="{ from: '#0052D9', to: '#00A870' }"
      :percentage="88"
      status="active"
    />
  </view>
</template>

<script>
import TProgress from '@tdesign/uniapp/progress/progress.vue';
export default {
  components: {
    TProgress,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
</style>
```


环形进度条


```vue
<template>
  <view>
    <t-demo
      desc="环形进度条"
      padding
    >
      <t-progress
        theme="circle"
        :percentage="80"
      />
      <t-progress
        theme="circle"
        :percentage="88"
        status="warning"
      />
      <t-progress
        theme="circle"
        :percentage="88"
        status="error"
      />
      <t-progress
        theme="circle"
        :percentage="88"
        status="success"
      />
    </t-demo>
  </view>
</template>

<script>
import TProgress from '@tdesign/uniapp/progress/progress.vue';

export default {
  components: {
    TProgress,
  },
  data() {
    return {
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
</style>
```


## API

### Progress Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
color | String / Object / Array | '' | 进度条颜色。示例：'#ED7B2F' 或 'orange' 或 `['#f00', '#0ff', '#f0f']` 或 `{ '0%': '#f00', '100%': '#0ff' }` 或  `{ from: '#000', to: '#000' }` 等。TS 类型：`string \| Array<string> \| Record<string, string>` | N
label | String / Boolean | true | 进度百分比，可自定义 | N
percentage | Number | 0 | 进度条百分比 | N
size | String / Number | 'default' | 进度条尺寸，仅对环形进度条有效。可选值：default/micro。default 值为 112； micro 值为 24 | N
status | String | - | 进度条状态。可选项：success/error/warning/active。TS 类型：`ProgressStatus` `type ProgressStatus = 'success' \| 'error' \| 'warning' \| 'active'`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/progress/type.ts) | N
stroke-width | String / Number | - | 进度条线宽，默认单位 `px` | N
theme | String | line | 进度条风格。值为 line，标签（label）显示在进度条右侧；值为 plump，标签（label）显示在进度条里面；值为 circle，标签（label）显示在进度条正中间。可选项：line/plump/circle。TS 类型：`ProgressTheme` `type ProgressTheme = 'line' \| 'plump' \| 'circle'`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/progress/type.ts) | N
track-color | String | '' | 进度条未完成部分颜色 | N

### Progress Slots

名称 | 描述
-- | --
label | 进度百分比

### Progress External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-bar | 进度文字样式类
t-class-label | 标签样式类

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-progress-info-dark-color | @text-color-primary | -
--td-progress-info-light-color | @text-color-anti | -
--td-progress-inner-bg-color-active | @bg-color-container | -
--td-progress-inner-bg-color-error | @error-color | -
--td-progress-inner-bg-color-success | @success-color | -
--td-progress-inner-bg-color-warning | @warning-color | -
--td-progress-circle-icon-size | 96rpx | -
--td-progress-circle-inner-bg-color | @bg-color-container | -
--td-progress-circle-label-font | @font-title-extraLarge | -
--td-progress-circle-width | 224rpx | -
--td-progress-inner-bg-color | @brand-color | -
--td-progress-line-stroke-width | 12rpx | -
--td-progress-stroke-circle-width | 12rpx | -
--td-progress-stroke-plump-width | 40rpx | -
--td-progress-track-bg-color | @bg-color-component | -
