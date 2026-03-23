---
name: "toast"
description: "用于轻量级反馈或提示，不会打断用户操作。"
url: "https://tdesign.tencent.com/uniapp/components/toast"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TToast from '@tdesign/uniapp/toast/toast.vue';
```

### 基础提示


```vue
<template>
  <view>
    <t-toast
      ref="t-toast"
    />
    <view class="box">
      <t-button
        size="large"
        variant="outline"
        theme="primary"
        block
        @click="showText"
      >
        纯文本
      </t-button>
      <t-button
        size="large"
        variant="outline"
        theme="primary"
        block
        @click="showMultiText"
      >
        多行文字
      </t-button>
      <t-button
        size="large"
        variant="outline"
        theme="primary"
        block
        @click="showHorizontalText"
      >
        带横向图标
      </t-button>
      <t-button
        size="large"
        variant="outline"
        theme="primary"
        block
        @click="showVerticalText"
      >
        带竖向图标
      </t-button>
      <t-button
        v-if="!skylineRender"
        size="large"
        variant="outline"
        theme="primary"
        block
        @click="showLoading"
      >
        加载状态
      </t-button>
    </view>
  </view>
</template>

<script>
import TToast from '@tdesign/uniapp/toast/toast.vue';
import TButton from '@tdesign/uniapp/button/button.vue';
import SkylineBehavior from '@tdesign/uniapp/mixins/skyline.js';
import { default as Toast } from '@tdesign/uniapp/toast/index';
export default {
  components: {
    TToast,
    TButton,
  },
  mixins: [SkylineBehavior],
  data() {
    return {
    };
  },
  created() {},
  methods: {
    showText() {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '轻提示文字内容',
      });
    },
    showMultiText() {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '最多一行展示十个汉字宽度限制最多不超过三行文字',
      });
    },
    showHorizontalText() {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '带横向图标',
        icon: 'check-circle',
      });
    },
    showVerticalText() {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '带竖向图标',
        icon: 'check-circle',
        direction: 'column',
      });
    },
    showLoading() {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '加载中...',
        theme: 'loading',
        direction: 'column',
      });
    },
  },
};
</script>
<style>
</style>
```


### 组件状态


```vue
<template>
  <view>
    <t-toast
      ref="t-toast"
    />

    <view class="box">
      <t-button
        theme="primary"
        size="large"
        variant="outline"
        block
        @click="showSuccessToast"
      >
        成功提示
      </t-button>
      <t-button
        theme="primary"
        size="large"
        variant="outline"
        block
        @click="showWarningToast"
      >
        警告提示
      </t-button>
      <t-button
        theme="primary"
        size="large"
        variant="outline"
        block
        @click="showErrorToast"
      >
        错误提示
      </t-button>
    </view>
  </view>
</template>

<script>
import TToast from '@tdesign/uniapp/toast/toast.vue';
import TButton from '@tdesign/uniapp/button/button.vue';
import Toast from '@tdesign/uniapp/toast/index';
export default {
  components: {
    TToast,
    TButton,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    showSuccessToast() {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '成功文案',
        theme: 'success',
        direction: 'column',
      });
    },
    showWarningToast() {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '警告文案',
        theme: 'warning',
        direction: 'column',
      });
    },
    showErrorToast() {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '错误文案',
        theme: 'error',
        direction: 'column',
      });
    },
  },
};
</script>
<style>
</style>
```


### 显示遮罩

```vue
<template>
  <view>
    <t-toast
      ref="t-toast"
    />

    <view class="box">
      <t-button
        theme="primary"
        size="large"
        variant="outline"
        block
        @click="handleToast"
      >
        禁止滑动和点击
      </t-button>
    </view>
  </view>
</template>

<script>
import TToast from '@tdesign/uniapp/toast/toast.vue';
import Toast from '@tdesign/uniapp/toast/index';
import TButton from '@tdesign/uniapp/button/button.vue';


export default {
  components: {
    TToast,
    TButton,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handleToast() {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '禁止滑动和点击',
        direction: 'column',
        duration: 3000,
        preventScrollThrough: true,
        icon: 'poweroff',
      });
    },
  },
};
</script>
<style>
</style>
```


### 手动关闭

```vue
<template>
  <view>
    <t-toast
      ref="t-toast"
    />

    <view class="box">
      <view class="toast-example">
        <t-button
          theme="primary"
          size="large"
          variant="outline"
          :style="buttonStyle"
          @click="handleShow"
        >
          显示提示
        </t-button>
        <t-button
          theme="primary"
          size="large"
          variant="outline"
          :style="buttonStyle"
          @click="handleHide"
        >
          关闭提示
        </t-button>
      </view>
    </view>
  </view>
</template>

<script>
import TToast from '@tdesign/uniapp/toast/toast.vue';
import Toast, { hideToast } from '@tdesign/uniapp/toast/index';
import TButton from '@tdesign/uniapp/button/button.vue';


export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TToast,
    TButton,
  },
  data() {
    return {
      // 兼容 抖音小程序、QQ 小程序等
      buttonStyle: 'margin-left: auto;margin-right: auto;',
    };
  },
  created() {},
  methods: {
    handleShow() {
      Toast({
        context: this,
        selector: '#t-toast',
        duration: -1,
        message: '轻提示文字内容',
      });
    },
    handleHide() {
      hideToast({
        context: this,
        selector: '#t-toast',
      });
    },
  },
};
</script>
<style>
.toast-example {
    text-align: center;
    display: flex;
}
</style>
```

## API

### Toast Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
direction | String | row | 图标排列方式。可选项：row/column | N
duration | Number | 2000 | 弹窗显示毫秒数 | N
icon | String / Object | - | 自定义图标。传入对象则透传至 Icon 组件 | N
message | String | - | 弹窗显示文字 | N
overlay-props | Object | - | 遮罩层属性，透传至 Overlay。TS 类型：`OverlayProps `，[Overlay API Documents](./overlay?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/toast/type.ts) | N
placement | String | middle | 弹窗展示位置。可选项： top/middle/bottom | N
prevent-scroll-through | Boolean | false | 防止滚动穿透，即不允许点击和滚动 | N
show-overlay | Boolean | false | 是否显示遮罩层 | N
theme | String | - | 提示类型。可选项：loading/success/warning/error | N
using-custom-navbar | Boolean | false | 是否使用了自定义导航栏 | N

### Toast Events

名称 | 参数 | 描述
-- | -- | --
close | \- | 轻提示隐藏的时候触发
destroy | \- | 轻提示销毁的时候触发

### Toast Slots

名称 | 描述
-- | --
icon | 自定义图标
message | 弹窗显示文字

### Toast External Classes

类名 | 描述
-- | --
t-class | 根节点样式类

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-toast-bg-color | @mask-active | -
--td-toast-color | @text-color-anti | -
--td-toast-column-icon-size | 64rpx | -
--td-toast-max-width | 370rpx | -
--td-toast-radius | @radius-default | -
--td-toast-row-icon-size | 48rpx | -
