---
name: "link"
description: "文字超链接用于跳转一个新页面，如当前项目跳转，友情链接等。"
url: "https://tdesign.tencent.com/uniapp/components/link"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TLink from '@tdesign/uniapp/link/link.vue';
```

### 组件类型

基础文字链接


```vue
<template>
  <view class="link-example">
    <t-link
      size="small"
      theme="primary"
      content="跳转链接"
      hover
    />
    <t-link
      size="small"
      content="跳转链接"
      hover
    />
  </view>
</template>

<script>
import TLink from '@tdesign/uniapp/link/link.vue';
export default {
  components: {
    TLink,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
.link-example {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 96rpx;
    background-color: var(--bg-color-demo);
}
</style>
```


下划线文字链接


```vue
<template>
  <view class="link-example">
    <t-link
      size="small"
      theme="primary"
      content="跳转链接"
      underline
      hover
    />
    <t-link
      size="small"
      content="跳转链接"
      underline
      hover
    />
  </view>
</template>

<script>
import TLink from '@tdesign/uniapp/link/link.vue';
export default {
  components: {
    TLink,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
.link-example {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 96rpx;
    background-color: var(--bg-color-demo);
}
</style>
```


前置图标文字链接


```vue
<template>
  <view class="link-example">
    <t-link
      size="small"
      theme="primary"
      content="跳转链接"
      prefix-icon="link"
      hover
    />
    <t-link
      size="small"
      content="跳转链接"
      prefix-icon="link"
      hover
    />
  </view>
</template>

<script>
import TLink from '@tdesign/uniapp/link/link.vue';
export default {
  components: {
    TLink,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
.link-example {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 96rpx;
    background-color: var(--bg-color-demo);
}
</style>
```


后置图标文字链接


```vue
<template>
  <view class="link-example">
    <t-link
      size="small"
      theme="primary"
      content="跳转链接"
      suffix-icon="jump"
      hover
    />
    <t-link
      size="small"
      content="跳转链接"
      suffix-icon="jump"
      hover
    />
  </view>
</template>

<script>
import TLink from '@tdesign/uniapp/link/link.vue';
export default {
  components: {
    TLink,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
.link-example {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 96rpx;
    background-color: var(--bg-color-demo);
}
</style>
```


### 组件状态

不同主题


```vue
<template>
  <view>
    <view class="link-example">
      <t-link
        size="small"
        theme="primary"
        content="跳转链接"
        suffix-icon="jump"
        hover
      />
      <t-link
        size="small"
        content="跳转链接"
        suffix-icon="jump"
        hover
      />
      <t-link
        size="small"
        theme="danger"
        content="跳转链接"
        suffix-icon="jump"
        hover
      />
    </view>
    <view class="link-example">
      <t-link
        size="small"
        theme="warning"
        content="跳转链接"
        suffix-icon="jump"
        hover
      />
      <t-link
        size="small"
        theme="success"
        content="跳转链接"
        suffix-icon="jump"
        hover
      />
    </view>
  </view>
</template>

<script>
import TLink from '@tdesign/uniapp/link/link.vue';
export default {
  components: {
    TLink,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
.link-example {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 96rpx;
    background-color: var(--bg-color-demo);
}

.link-example:not(:last-child) {
    margin-bottom: 32rpx;
}
</style>
```


禁用状态


```vue
<template>
  <view>
    <view class="link-example">
      <t-link
        :navigator-props="navigatorProps"
        size="small"
        theme="primary"
        content="跳转链接"
        suffix-icon="jump"
        disabled
        hover
      />
      <t-link
        size="small"
        content="跳转链接"
        suffix-icon="jump"
        disabled
      />
      <t-link
        size="small"
        theme="danger"
        content="跳转链接"
        suffix-icon="jump"
        disabled
      />
    </view>
    <view class="link-example">
      <t-link
        size="small"
        theme="warning"
        content="跳转链接"
        suffix-icon="jump"
        disabled
      />
      <t-link
        size="small"
        theme="success"
        content="跳转链接"
        suffix-icon="jump"
        disabled
      />
    </view>
  </view>
</template>

<script>
import TLink from '@tdesign/uniapp/link/link.vue';
export default {
  components: {
    TLink,
  },
  data() {
    return {
      navigatorProps: {
        url: '/pages/home/home',
      },
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.link-example {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 96rpx;
    background-color: var(--bg-color-demo);
}

.link-example:not(:last-child) {
    margin-bottom: 32rpx;
}
</style>
```


### 组件样式

链接尺寸


```vue
<template>
  <view class="link-example">
    <t-link
      size="small"
      theme="primary"
      content="S号链接"
      suffix-icon="jump"
      hover
    />
    <t-link
      theme="primary"
      content="M号链接"
      suffix-icon="jump"
      hover
    />
    <t-link
      size="large"
      theme="primary"
      content="L号链接"
      suffix-icon="jump"
      hover
    />
  </view>
</template>

<script>
import TLink from '@tdesign/uniapp/link/link.vue';
export default {
  components: {
    TLink,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
.link-example {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 96rpx;
    background-color: var(--bg-color-demo);
}
</style>
```


## API

### Link Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
content | String | - | 链接内容 | N
disabled | Boolean | false | 是否为禁用态 | N
hover | Boolean | - | 是否开启点击反馈 | N
navigator-props | Object | {} | 与 navigator 原生组件属性保持一致，具体使用参考：[微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html)。使用时请将形如 `open-type` 风格的属性名改为 `openType` 风格 | N
prefix-icon | String / Object | - | 前置图标 | N
size | String | medium | 尺寸。可选项：small/medium/large。TS 类型：`SizeEnum`。[通用类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/common/common.ts) | N
status | String | normal | 已废弃。组件状态。可选项：normal/active/disabled | N
suffix-icon | String / Object | - | 后置图标 | N
theme | String | default | 组件风格，依次为默认色、品牌色、危险色、警告色、成功色。可选项：default/primary/danger/warning/success | N
underline | Boolean | - | 是否显示链接下划线 | N

### Link Events

名称 | 参数 | 描述
-- | -- | --
complete | \- | 页面链接执行完成后触发（失败或成功均会触发）
fail | \- | 页面链接跳转失败后触发
success | \- | 页面链接跳转成功后触发

### Link Slots

名称 | 描述
-- | --
\- | 默认插槽，作用同 `content` 插槽
content | 自定义 `content` 显示内容
prefix-icon | 自定义 `prefix-icon` 显示内容
suffix-icon | 自定义 `suffix-icon` 显示内容

### Link External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-content | 内容样式类
t-class-hover | 悬停样式类
t-class-prefix-icon | 前置图标样式类
t-class-suffix-icon | 后置图标样式类

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-link-danger-active-color | @error-color-active | -
--td-link-danger-color | @error-color | -
--td-link-danger-disabled-color | @error-color-disabled | -
--td-link-default-active-color | @brand-color-active | -
--td-link-default-color | @text-color-primary | -
--td-link-default-disabled-color | @text-color-disabled | -
--td-link-primary-active-color | @brand-color-active | -
--td-link-primary-color | @brand-color | -
--td-link-primary-disabled-color | @brand-color-disabled | -
--td-link-success-active-color | @success-color-active | -
--td-link-success-color | @success-color | -
--td-link-success-disabled-color | @success-color-disabled | -
--td-link-warning-active-color | @warning-color-active | -
--td-link-warning-color | @warning-color | -
--td-link-warning-disabled-color | @warning-color-disabled | -
